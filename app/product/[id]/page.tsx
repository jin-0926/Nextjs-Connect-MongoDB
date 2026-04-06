import { GoodsRepository } from '@/db/GoodsRepository'
import Navbar from '@/components/Navbar'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    id: string
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = params

  let goods
  try {
    const result = await GoodsRepository.getGoodsById(id)
    if (!result.success || !result.goods) {
      return notFound()
    }
    goods = JSON.parse(JSON.stringify(result.goods))
  } catch (error) {
    console.error('Error fetching goods:', error)
    return notFound()
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 pb-20 pt-32">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="transition-colors hover:text-black">
            Home
          </Link>
          <span>/</span>
          <span className="capitalize text-gray-400">{goods.category}</span>
          <span>/</span>
          <span className="font-medium text-black">{goods.name}</span>
        </nav>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Product Image Section */}
          <div className="group relative aspect-square overflow-hidden rounded-3xl bg-white shadow-xl shadow-gray-200/50 transition-all duration-700 hover:shadow-2xl hover:shadow-gray-300/50">
            {goods.imageUrl ? (
              <Image
                src={goods.imageUrl}
                alt={goods.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                priority
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-gray-300">No Image</div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>

          {/* Product Info Section */}
          <div className="flex flex-col justify-center">
            <div className="mb-6 inline-flex w-fit items-center rounded-full bg-black px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
              {goods.category}
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">{goods.name}</h1>

            <div className="mt-8 flex items-baseline gap-4">
              <span className="text-3xl font-black text-gray-900">₩{goods.price.toLocaleString()}</span>
              <span className="text-sm font-medium text-gray-400">VAT Included</span>
            </div>

            <div className="mt-10 border-t border-gray-100 pt-10">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900">상품설명</h3>
              <p className="mt-4 text-lg leading-8 text-gray-600">{goods.description}</p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 border-t border-gray-100 pt-10">
              <div>
                <dt className="text-xs font-bold uppercase tracking-widest text-gray-400">재고</dt>
                <dd className="mt-1 text-lg font-semibold text-gray-900">
                  {goods.stock > 0 ? (
                    <span className="text-emerald-500">{goods.stock}</span>
                  ) : (
                    <span className="text-rose-500">품절</span>
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-widest text-gray-400">회원</dt>
                <dd className="mt-1 text-lg font-semibold text-gray-900">무료배송</dd>
              </div>
            </div>

            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <button
                className="flex-1 rounded-2xl bg-black px-8 py-5 text-center text-sm font-bold text-white transition-all hover:bg-gray-800 active:scale-[0.98] disabled:bg-gray-400"
                disabled={goods.stock === 0}
              >
                장바구니에 담기
              </button>
              <button className="rounded-2xl border border-gray-200 bg-white px-8 py-5 text-sm font-bold text-gray-900 transition-all hover:border-black hover:bg-black hover:text-white active:scale-[0.98]">
                장바구니
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
