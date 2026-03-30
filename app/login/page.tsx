'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Mail, Lock, ArrowRight, UserPlus } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    alert('로그인 시도: ' + email)
    // 실제 API 연결은 추후 진행합니다
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fafafa] px-6 py-12">
      <div className="w-full max-w-md rounded-3xl border bg-white p-8 shadow-sm sm:p-12">
        <div className="mb-10 flex flex-col items-center text-center">
          <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">LUXE SHOP LOGIN</h1>
          <p className="text-sm text-gray-500">당신만의 특별한 경험을 다시 시작하세요</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="ml-1 text-xs font-semibold uppercase tracking-wider text-gray-400">이메일 주소</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 outline-none transition focus:border-gray-900 focus:ring-0"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="ml-1 text-xs font-semibold uppercase tracking-wider text-gray-400">비밀번호</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 outline-none transition focus:border-gray-900 focus:ring-0"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 py-3.5 font-medium text-white shadow-lg shadow-gray-200 transition hover:bg-gray-800"
          >
            로그인하기
            <ArrowRight size={16} />
          </button>
        </form>

        <div className="mt-12 border-t border-gray-100 pt-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-sm font-medium text-gray-500">아직 계정이 없으신가요?</p>
            <Link href="/signup" className="group flex items-center gap-2 text-sm font-semibold text-gray-900">
              커뮤니티에 가입하기
              <UserPlus size={16} className="text-gray-400 transition-colors group-hover:text-gray-900" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
