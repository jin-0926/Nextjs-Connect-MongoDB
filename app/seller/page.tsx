'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { LayoutDashboard, Package, ShoppingBag, Settings, LogOut, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface IGoods {
  _id: string
  name: string
  price: number
  description: string
  imageUrl: string
  stock: number
}

export default function SellerPage() {
  const router = useRouter()
  const [goodsList, setGoodsList] = useState<IGoods[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSellerGoods = async () => {
      try {
        const response = await fetch('/api/seller/goods')
        const data = await response.json()
        if (data.success) {
          setGoodsList(data.goodsList)
        }
      } catch (error) {
        console.error('Fetch seller goods error:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchSellerGoods()
  }, [])

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', { method: 'POST' })
      const data = await response.json()
      if (data.success) {
        router.push('/')
        router.refresh()
      }
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 사이드바 */}
      <aside className="fixed bottom-0 left-0 top-0 flex w-64 flex-col border-r bg-white px-6 py-8">
        <Link href="/" className="mb-8 text-xl font-bold tracking-tight text-gray-900 transition hover:opacity-70">
          SELLER CENTER
        </Link>
        <nav className="flex-1 space-y-4">
          <Link
            href="/seller"
            className="flex items-center gap-3 rounded-lg bg-gray-900 px-4 py-3 text-sm font-medium text-white shadow-sm transition"
          >
            <LayoutDashboard size={18} />
            대시보드
          </Link>
          <Link
            href="/seller/add"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-400 transition hover:bg-gray-100 hover:text-gray-900"
          >
            <Package size={18} />
            상품 등록
          </Link>
          <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-400 transition hover:bg-gray-100 hover:text-gray-900">
            <ShoppingBag size={18} />
            주문 관리
          </button>
          <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-400 transition hover:bg-gray-100 hover:text-gray-900">
            <Settings size={18} />
            설정
          </button>
        </nav>

        <div className="border-t border-gray-100 pt-8">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50"
          >
            <LogOut size={18} />
            로그아웃
          </button>
        </div>
      </aside>

      {/* 메인 콘텐츠 */}
      <main className="ml-64 flex-1 p-10">
        <header className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">반갑습니다, 판매자님!</h1>
            <p className="mt-1 text-gray-500">오늘의 판매 현황을 확인하세요.</p>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <p className="mb-2 text-sm font-medium text-gray-400">등록된 상품</p>
            <h3 className="text-2xl font-bold text-gray-900">{goodsList.length} 개</h3>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <p className="mb-2 text-sm font-medium text-gray-400">신규 주문</p>
            <h3 className="text-2xl font-bold text-gray-900">0 건</h3>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <p className="mb-2 text-sm font-medium text-gray-400">배송 준비 중</p>
            <h3 className="text-2xl font-bold text-gray-900">0 건</h3>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">나의 상품 목록</h2>
            <Link
              href="/seller/add"
              className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 hover:underline"
            >
              <Plus size={16} /> 새 상품 추가
            </Link>
          </div>

          {isLoading ? (
            <div className="py-20 text-center text-gray-400">상품 정보를 불러오고 있습니다...</div>
          ) : goodsList.length > 0 ? (
            <div className="overflow-x-auto text-left">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    <th className="pb-4 pr-6">이미지</th>
                    <th className="pb-4 pr-6">상품명</th>
                    <th className="pb-4 pr-6">가격</th>
                    <th className="pb-4">재고</th>
                    <th className="pb-4">상태</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {goodsList.map((goods) => (
                    <tr key={goods._id} className="group">
                      <td className="py-4 pr-6">
                        <div className="h-12 w-12 overflow-hidden rounded-lg bg-gray-100">
                          {goods.imageUrl && (
                            <Image
                              src={goods.imageUrl}
                              alt={goods.name}
                              width={48}
                              height={48}
                              className="h-full w-full object-cover"
                            />
                          )}
                        </div>
                      </td>
                      <td className="py-4 pr-6">
                        <p className="font-medium text-gray-900">{goods.name}</p>
                      </td>
                      <td className="py-4 pr-6">
                        <p className="text-sm font-medium text-gray-700">₩{goods.price.toLocaleString()}</p>
                      </td>
                      <td className="py-4 font-medium text-gray-700">{goods.stock}</td>
                      <td className="py-4">
                        <span className="inline-flex rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-600">
                          판매 중
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="text-center">
                <Package size={48} className="mx-auto mb-4 text-gray-200" />
                <p className="font-medium text-gray-400">아직 등록된 상품이 없습니다.</p>
                <Link
                  href="/seller/add"
                  className="mt-4 inline-flex items-center justify-center rounded-xl bg-gray-900 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                  새 상품 등록하기
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
