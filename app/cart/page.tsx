'use client'

import React, { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface CartItem {
  _id: string
  productId: {
    _id: string
    name: string
    price: number
    imageUrl: string
    category: string
  }
  quantity: number
}

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)

  const fetchCartItems = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/cart')
      const data = await response.json()
      if (data.success) {
        setItems(data.items)
      }
    } catch (error) {
      console.error('Fetch cart error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCartItems()
  }, [])

  const updateQuantity = async (cartId: string, newQuantity: number) => {
    if (newQuantity < 1) return

    try {
      const response = await fetch('/api/cart', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartId, quantity: newQuantity }),
      })
      const data = await response.json()
      if (data.success) {
        setItems(items.map((item) => (item._id === cartId ? { ...item, quantity: newQuantity } : item)))
      }
    } catch (error) {
      console.error('Update quantity error:', error)
    }
  }

  const removeItem = async (cartId: string) => {
    if (!confirm('장바구니에서 삭제하시겠습니까?')) return

    try {
      const response = await fetch('/api/cart', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartId }),
      })
      const data = await response.json()
      if (data.success) {
        setItems(items.filter((item) => item._id !== cartId))
      }
    } catch (error) {
      console.error('Remove item error:', error)
    }
  }

  const totalPrice = items.reduce((acc, item) => acc + item.productId.price * item.quantity, 0)
  const shippingFee: number = 0 // 무료 배송 설정 시
  const [isFinishing, setIsFinishing] = useState(false)

  const handleCheckout = async () => {
    if (items.length === 0) return
    if (!confirm('정말로 결제하시겠습니까?')) return

    try {
      setIsFinishing(true)
      const response = await fetch('/api/checkout', {
        method: 'POST',
      })
      const data = await response.json()

      if (data.success) {
        alert(data.message)
        setItems([]) // 장바구니 비우기
      } else {
        alert(data.message || '결제 중 오류가 발생했습니다.')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('결제 처리 중 서버 오류가 발생했습니다.')
    } finally {
      setIsFinishing(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafafa]">
        <Navbar />
        <div className="flex h-[80vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-black border-t-transparent"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 pb-24 pt-32">
        <div className="mb-12 flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">장바구니</h1>
          <span className="text-sm font-medium text-gray-500">상품 {items.length}개</span>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl bg-white py-24 text-center shadow-sm">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-50">
              <ShoppingBag size={40} className="text-gray-300" />
            </div>
            <h2 className="mb-2 text-xl font-bold text-gray-900">장바구니가 비어있어요</h2>
            <p className="mb-8 text-gray-500">멋진 상품들을 장바구니에 담아보세요!</p>
            <Link
              href="/"
              className="rounded-full bg-black px-8 py-3 text-sm font-bold text-white transition hover:bg-gray-800"
            >
              쇼핑하러 가기
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-10 lg:flex-row">
            {/* Cart List */}
            <div className="flex-1 space-y-4">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="group relative flex gap-6 rounded-3xl border border-gray-100 bg-white p-6 transition-all hover:shadow-md"
                >
                  <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-2xl bg-gray-50">
                    <Image
                      src={item.productId.imageUrl}
                      alt={item.productId.name}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-110"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between py-1">
                    <div>
                      <div className="mb-1 flex items-start justify-between">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                            {item.productId.category}
                          </p>
                          <h3 className="text-lg font-bold text-gray-900">{item.productId.name}</h3>
                        </div>
                        <p className="text-lg font-bold text-gray-900">₩{item.productId.price.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 overflow-hidden rounded-full border border-gray-100 bg-gray-50 p-1">
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-white hover:text-black active:scale-90"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-bold text-black">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-white hover:text-black active:scale-90"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item._id)}
                        className="flex items-center gap-2 text-sm font-medium text-gray-400 transition hover:text-red-500"
                      >
                        <Trash2 size={16} />
                        <span className="hidden sm:inline">목록 제거하기</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="w-full lg:w-[400px]">
              <div className="sticky top-32 rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
                <h2 className="mb-6 text-xl font-bold text-gray-900">주문서</h2>

                <div className="space-y-4">
                  <div className="flex justify-between text-sm font-medium text-gray-500">
                    <span>가격 합계</span>
                    <span className="text-gray-900">₩{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium text-gray-500">
                    <span>배송비</span>
                    <span className={shippingFee === 0 ? 'font-bold text-green-600' : 'text-gray-900'}>
                      {shippingFee === 0 ? '무료배송' : `₩${shippingFee.toLocaleString()}`}
                    </span>
                  </div>
                  <div className="my-6 flex justify-between border-t border-dashed pt-6">
                    <span className="text-lg font-bold text-gray-900">총 결제 금액</span>
                    <span className="text-2xl font-black tracking-tighter text-gray-900">
                      ₩{(totalPrice + shippingFee).toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isFinishing}
                  className="group mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-black py-5 font-bold text-white transition-all hover:bg-gray-800 active:scale-[0.98] disabled:bg-gray-400"
                >
                  {isFinishing ? '처리 중...' : '결제하기'}
                  {!isFinishing && <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
