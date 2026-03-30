'use client'

import React from 'react'
import { User, ShoppingCart } from 'lucide-react'
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b bg-white/70 px-6 py-4 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold tracking-tight text-gray-900">LUXE SHOP</h1>
      </div>

      <div className="flex items-center gap-4">
        <button className="rounded-full p-2 transition hover:bg-gray-100">
          <ShoppingCart size={20} className="text-gray-600" />
        </button>
        <Link
          href="/login"
          className="flex items-center gap-2 rounded-lg border bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-100"
        >
          <User size={14} />
          로그인
        </Link>
      </div>
    </nav>
  )
}
