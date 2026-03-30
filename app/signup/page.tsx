'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Mail, Lock, User as UserIcon, ArrowRight, LogIn } from 'lucide-react'

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다!')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()

      if (data.success) {
        alert('회원가입이 완료되었습니다!')
        router.push('/login')
      } else {
        alert(data.message || '회원가입에 실패했습니다.')
      }
    } catch (error) {
      console.error('Signup error:', error)
      alert('서버와 통신하는 중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fafafa] px-6 py-12">
      <div className="w-full max-w-md rounded-3xl border bg-white p-8 shadow-sm sm:p-12">
        <div className="mb-10 flex flex-col items-center text-center">
          <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">LUXE SHOP JOIN</h1>
          <p className="text-sm text-gray-500">새로운 여정을 저희와 함께 시작하세요</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-6">
          <div className="space-y-2">
            <label className="ml-1 text-xs font-semibold uppercase tracking-wider text-gray-400">사용자 이름</label>
            <div className="relative">
              <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              <input
                type="text"
                placeholder="홍길동"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 outline-none transition focus:border-gray-900 focus:ring-0"
                required
              />
            </div>
          </div>

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

          <div className="space-y-2">
            <label className="ml-1 text-xs font-semibold uppercase tracking-wider text-gray-400">비밀번호 확인</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              <input
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 outline-none transition focus:border-gray-900 focus:ring-0"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 py-3.5 font-medium text-white shadow-lg shadow-gray-200 transition hover:bg-gray-800 disabled:opacity-50"
          >
            {isLoading ? '가입 처리 중...' : '회원가입하기'}
            {!isLoading && <ArrowRight size={16} />}
          </button>
        </form>

        <div className="mt-12 border-t border-gray-100 pt-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-sm font-medium text-gray-500">이미 계정이 있으신가요?</p>
            <Link href="/login" className="group flex items-center gap-2 text-sm font-semibold text-gray-900">
              기존 계정으로 로그인하기
              <LogIn size={16} className="text-gray-400 transition-colors group-hover:text-gray-900" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
