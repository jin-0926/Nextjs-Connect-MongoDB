'use client'

import React from 'react'
import Link from 'next/link'
import { LayoutDashboard, Package, ShoppingBag, Settings, LogOut } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

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

  // 메뉴 활성화 여부를 체크하는 함수
  const isActive = (path: string) => pathname === path

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
            className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
              isActive('/seller')
                ? 'bg-gray-900 text-white shadow-sm'
                : 'text-gray-400 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <LayoutDashboard size={18} />
            대시보드
          </Link>
          <Link
            href="/seller/add"
            className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
              isActive('/seller/add')
                ? 'bg-gray-900 text-white shadow-sm'
                : 'text-gray-400 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <Package size={18} />
            상품 등록
          </Link>
          <Link
            href="/seller/orders"
            className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
              isActive('/seller/orders')
                ? 'bg-gray-900 text-white shadow-sm'
                : 'text-gray-400 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <ShoppingBag size={18} />
            주문 관리
          </Link>
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

      {/* 메인 콘텐츠 영역 */}
      <main className="ml-64 flex-1">{children}</main>
    </div>
  )
}
