'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface ProductActionsProps {
  productId: string
  isLoggedIn: boolean
  stock: number
}

export default function ProductActions({ productId, isLoggedIn, stock }: ProductActionsProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [added, setAdded] = useState(false)

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      alert('로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.')
      router.push('/login')
      return
    }

    try {
      setLoading(true)
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      })
      const data = await response.json()
      if (data.success) {
        // 성공 시 확인창 없이 피드백만 제공
        setAdded(true)
        setTimeout(() => setAdded(false), 2000)
        router.refresh()
      } else {
        alert(data.message || '장바구니 담기에 실패했습니다.')
      }
    } catch (error) {
      console.error('Add to cart error:', error)
      alert('오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoToCart = () => {
    router.push('/cart')
  }

  return (
    <div className="mt-12 flex flex-col gap-4 sm:flex-row">
      <button
        onClick={handleAddToCart}
        className={`flex-1 rounded-2xl px-8 py-5 text-center text-sm font-bold transition-all active:scale-[0.98] disabled:bg-gray-400 ${
          added ? 'bg-green-600 text-white' : 'bg-black text-white hover:bg-gray-800'
        }`}
        disabled={stock === 0 || loading || added}
      >
        {loading ? '처리 중...' : added ? '장바구니에 담겼어요!' : '장바구니에 담기'}
      </button>
      <button
        onClick={handleGoToCart}
        className="rounded-2xl border border-gray-200 bg-white px-8 py-5 text-sm font-bold text-gray-900 transition-all hover:border-black hover:bg-black hover:text-white active:scale-[0.98]"
      >
        장바구니
      </button>
    </div>
  )
}
