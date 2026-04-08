'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface IGoods {
  _id: string
  name: string
  price: number
  description: string
  category: string
  imageUrl: string
  stock: number
}

export default function ProductList() {
  const [goodsList, setGoodsList] = useState<IGoods[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchGoods = async () => {
      try {
        const response = await fetch('/api/goods')
        const data = await response.json()
        if (data.success) {
          setGoodsList(data.goodsList)
        }
      } catch (error) {
        console.error('Fetch goods error:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchGoods()
  }, [])

  if (isLoading) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-20">
        <p className="text-center text-gray-500">상품을 불러오는 중입니다...</p>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12 flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">상품 목록</h2>
          <p className="mt-2 text-gray-500">최고의 명품 컬렉션을 만나보세요</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {goodsList.length > 0 ? (
          goodsList.map((goods) => (
            <Link key={goods._id} href={`/product/${goods._id}`} className="group relative flex flex-col pt-4">
              <div className="flex aspect-[3/4] w-full items-center justify-center overflow-hidden rounded-2xl bg-gray-100 transition-transform duration-300 group-hover:scale-[1.02]">
                {goods.imageUrl ? (
                  <Image
                    src={goods.imageUrl}
                    alt={goods.name}
                    width={500}
                    height={667}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-gray-300">No Image</div>
                )}
              </div>

              <div className="mt-6 flex flex-col gap-1 px-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">{goods.category}</p>
                <h3 className="text-lg font-medium text-gray-900 duration-300 group-hover:translate-x-1 group-hover:text-black">
                  {goods.name}
                </h3>
                <p className="mt-1 text-xl font-bold text-gray-900">₩{goods.price.toLocaleString()}</p>
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-sm text-gray-500 underline underline-offset-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    VIEW DETAILS
                  </p>
                  <p className="text-xs font-medium text-gray-400">Stock: {goods.stock}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <p className="text-gray-400">등록된 상품이 없습니다.</p>
          </div>
        )}
      </div>
    </section>
  )
}
