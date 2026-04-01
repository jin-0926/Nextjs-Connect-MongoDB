'use client'

import React, { useEffect, useState } from 'react'
import { User, ShoppingCart, LogOut, LayoutDashboard } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface UserInfo {
  id: string // id 추가
  nickname: string
  email: string
  userType: string
}

export default function Navbar() {
  const router = useRouter()
  const [user, setUser] = useState<UserInfo | null>(null)

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('/api/auth/me')
        const data = await response.json()
        if (data.loggedIn) {
          setUser(data.user)
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error('Session check error:', error)
      }
    }
    checkSession()
  }, [])

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', { method: 'POST' })
      const data = await response.json()
      if (data.success) {
        setUser(null)
        router.push('/')
        router.refresh()
      }
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b bg-white/70 px-6 py-4 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <Link href="/" className="text-xl font-bold tracking-tight text-gray-900">
          LUXE SHOP
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <button className="rounded-full p-2 transition hover:bg-gray-100">
          <ShoppingCart size={20} className="text-gray-600" />
        </button>

        {user ? (
          <div className="flex items-center gap-4">
            {user.userType === 'seller' && (
              <Link
                href="/seller"
                className="flex items-center gap-2 rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-gray-800"
              >
                <LayoutDashboard size={14} />
                판매자 센터
              </Link>
            )}
            <span className="text-sm font-medium text-gray-700">{user.nickname}님</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg border bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-100"
            >
              <LogOut size={14} />
              로그아웃
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="flex items-center gap-2 rounded-lg border bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-100"
          >
            <User size={14} />
            로그인
          </Link>
        )}
      </div>
    </nav>
  )
}
