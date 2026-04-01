'use client'

import React from 'react'
import Link from 'next/link'
import { LayoutDashboard, Package, ShoppingBag, Settings, LogOut } from 'lucide-react'

export default function SellerPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 사이드바 */}
      <aside className="flex w-64 flex-col border-r bg-white px-6 py-8">
        <h2 className="mb-8 text-xl font-bold tracking-tight text-gray-900">SELLER CENTER</h2>
        <nav className="flex-1 space-y-4">
          <Link
            href="/seller"
            className="flex items-center gap-3 rounded-lg bg-gray-900 px-4 py-3 text-sm font-medium text-white shadow-sm transition"
          >
            <LayoutDashboard size={18} />
            대시보드
          </Link>
          <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-400 transition hover:bg-gray-100 hover:text-gray-900">
            <Package size={18} />
            상품 등록
          </button>
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
          <Link
            href="/login"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50"
          >
            <LogOut size={18} />
            로그아웃
          </Link>
        </div>
      </aside>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 p-10">
        <header className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">반갑습니다, 판매자님!</h1>
            <p className="mt-1 text-gray-500">오늘의 판매 현황을 확인하세요.</p>
          </div>
          <div className="h-10 w-10 rounded-full border-2 border-white bg-gray-200 shadow-sm"></div>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <p className="mb-2 text-sm font-medium text-gray-400">오늘의 매출</p>
            <h3 className="text-2xl font-bold text-gray-900">₩ 1,240,000</h3>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <p className="mb-2 text-sm font-medium text-gray-400">신규 주문</p>
            <h3 className="text-2xl font-bold text-gray-900">12 건</h3>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <p className="mb-2 text-sm font-medium text-gray-400">배송 준비 중</p>
            <h3 className="text-2xl font-bold text-gray-900">8 건</h3>
          </div>
        </div>

        <div className="mt-10 flex min-h-[400px] items-center justify-center rounded-3xl border border-gray-100 bg-white p-10 shadow-sm">
          <div className="text-center">
            <Package size={48} className="mx-auto mb-4 text-gray-200" />
            <p className="font-medium text-gray-400">아직 등록된 상품이 없습니다.</p>
            <Link
              href="/seller/add"
              className="mt-4 inline-flex items-center justify-center rounded-xl bg-gray-900 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 focus:outline-none"
            >
              새 상품 등록하기
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
