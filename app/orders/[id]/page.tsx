'use client'

import React, { useEffect, useState, useCallback } from 'react'
import Navbar from '@/components/Navbar'
import { CheckCircle, Clock, Package, MapPin, Phone, User, CreditCard, ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface OrderDetail {
  _id: string
  buyerId: {
    nickname: string
    email: string
  }
  orderItems: Array<{
    productId: {
      name: string
      price: number
      imageUrl: string
      category: string
    }
    quantity: number
    price: number
  }>
  totalAmount: number
  status: string
  shippingAddress: string
  contact: string
  receiver: string
  createdAt: string
}

export default function OrderReceiptPage({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<OrderDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchOrderDetails = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/orders/${params.id}`)
      const data = await response.json()
      if (data.success) {
        setOrder(data.order)
      } else {
        setError(data.message || '주문 정보를 불러오는데 실패했습니다.')
      }
    } catch (err) {
      console.error('Fetch order error:', err)
      setError('서버 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }, [params.id])

  useEffect(() => {
    fetchOrderDetails()
  }, [fetchOrderDetails])

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

  if (error || !order) {
    return (
      <div className="min-h-screen bg-[#fafafa]">
        <Navbar />
        <div className="flex h-[80vh] flex-col items-center justify-center px-6 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
            <Package size={40} className="text-red-400" />
          </div>
          <h2 className="mb-2 text-xl font-bold text-gray-900">{error || '주문을 찾을 수 없습니다'}</h2>
          <p className="mb-8 text-gray-500">요청하신 주문 정보를 확인할 수 없습니다. 주문 번호를 다시 확인해주세요.</p>
          <Link
            href="/"
            className="rounded-full bg-black px-8 py-3 text-sm font-bold text-white transition hover:bg-gray-800"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    )
  }

  const getStatusInfo = (status: string) => {
    switch (status) {
      case '결제완료':
        return { label: '결제 완료', color: 'bg-green-100 text-green-700', icon: <CheckCircle size={16} /> }
      case '배송준비':
        return { label: '배송 준비 중', color: 'bg-blue-100 text-blue-700', icon: <Clock size={16} /> }
      case '배송중':
        return { label: '배송 중', color: 'bg-purple-100 text-purple-700', icon: <Package size={16} /> }
      case '배송완료':
        return { label: '배송 완료', color: 'bg-gray-100 text-gray-700', icon: <CheckCircle size={16} /> }
      case '취소됨':
        return { label: '주문 취소됨', color: 'bg-red-100 text-red-700', icon: <Clock size={16} /> }
      default:
        return { label: status, color: 'bg-gray-100 text-gray-700', icon: <Clock size={16} /> }
    }
  }

  const statusInfo = getStatusInfo(order.status)

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar />

      <main className="mx-auto max-w-3xl px-6 pb-24 pt-32">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-gray-500 transition hover:text-black"
        >
          <ChevronLeft size={16} />
          계속 쇼핑하기
        </Link>

        {/* Receipt Header */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-green-100 bg-green-50 text-green-500 shadow-sm">
            <CheckCircle size={40} />
          </div>
          <h1 className="mb-2 text-3xl font-black tracking-tight text-gray-900">주문이 완료되었습니다!</h1>
          <p className="text-gray-500">주문해주셔서 감사합니다. 안전하게 배송해 드릴게요.</p>
        </div>

        <div className="overflow-hidden rounded-[32px] border border-gray-100 bg-white shadow-xl shadow-gray-200/50">
          {/* Order Info Bar */}
          <div className="flex flex-wrap items-center justify-between border-b border-gray-50 bg-gray-50/50 px-8 py-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">주문 번호</p>
              <p className="font-mono text-sm font-bold text-gray-900">{order._id}</p>
            </div>
            <div
              className={`mt-2 flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold sm:mt-0 ${statusInfo.color}`}
            >
              {statusInfo.icon}
              {statusInfo.label}
            </div>
          </div>

          <div className="grid gap-0 md:grid-cols-2">
            {/* Left Column: Items */}
            <div className="border-b border-gray-50 p-8 md:border-b-0 md:border-r">
              <h2 className="mb-6 flex items-center gap-2 text-lg font-bold text-gray-900">
                <ShoppingBag size={20} className="text-gray-400" />
                주문 상품
              </h2>
              <div className="space-y-6">
                {order.orderItems.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
                      <Image src={item.productId.imageUrl} alt={item.productId.name} fill className="object-cover" />
                    </div>
                    <div className="flex flex-1 flex-col justify-center">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        {item.productId.category}
                      </p>
                      <h3 className="line-clamp-1 text-sm font-bold text-gray-900">{item.productId.name}</h3>
                      <div className="mt-1 flex items-center justify-between">
                        <p className="text-xs font-medium text-gray-500">수량 {item.quantity}개</p>
                        <p className="text-sm font-bold text-gray-900">
                          ₩{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 border-t border-dashed border-gray-100 pt-6">
                <div className="flex justify-between text-sm font-medium text-gray-500">
                  <span>상품 합계</span>
                  <span className="text-gray-900">₩{order.totalAmount.toLocaleString()}</span>
                </div>
                <div className="mt-2 flex justify-between text-sm font-medium text-gray-500">
                  <span>배송비</span>
                  <span className="font-bold text-green-600">무료배송</span>
                </div>
                <div className="mt-6 flex justify-between">
                  <span className="text-lg font-bold text-gray-900">최종 결제 금액</span>
                  <span className="text-2xl font-black tracking-tighter text-gray-900">
                    ₩{order.totalAmount.toLocaleString()}
                  </span>
                </div>
                <div className="mt-4 flex items-center gap-2 rounded-2xl bg-gray-50 px-4 py-3">
                  <CreditCard size={16} className="text-gray-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500">신용카드 결제 완료</span>
                </div>
              </div>
            </div>

            {/* Right Column: Shipping & Customer */}
            <div className="bg-gray-50/30 p-8">
              <h2 className="mb-6 flex items-center gap-2 text-lg font-bold text-gray-900">
                <MapPin size={20} className="text-gray-400" />
                배송 정보
              </h2>
              <div className="space-y-6">
                <div>
                  <div className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400">
                    <User size={12} />
                    받는 사람
                  </div>
                  <p className="text-sm font-bold text-gray-900">{order.receiver}</p>
                </div>

                <div>
                  <div className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400">
                    <Phone size={12} />
                    연락처
                  </div>
                  <p className="text-sm font-bold text-gray-900">{order.contact}</p>
                </div>

                <div>
                  <div className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400">
                    <MapPin size={12} />
                    배송 주소
                  </div>
                  <p className="text-sm font-bold leading-relaxed text-gray-900">{order.shippingAddress}</p>
                </div>

                <div className="mt-4 border-t border-gray-100 pt-4">
                  <div className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400">
                    <Clock size={12} />
                    주문 일시
                  </div>
                  <p className="text-sm font-bold text-gray-900">
                    {new Date(order.createdAt).toLocaleString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>

              <div className="mt-12 rounded-2xl border border-gray-100 bg-white p-5">
                <h4 className="mb-2 text-xs font-black uppercase tracking-widest text-gray-400">안내 사항</h4>
                <p className="text-[11px] leading-relaxed text-gray-500">
                  주문 취소는 준비 중 상태 전까지만 가능합니다. <br />
                  관련 문의는 고객센터로 연락 부탁드립니다.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="max-w-[200px] flex-1 rounded-2xl bg-black px-8 py-4 text-center text-sm font-bold text-white shadow-lg shadow-black/10 transition hover:bg-gray-800 active:scale-[0.98]"
          >
            홈으로
          </Link>
          <button
            onClick={() => window.print()}
            className="max-w-[200px] flex-1 rounded-2xl border border-gray-200 bg-white px-8 py-4 text-center text-sm font-bold text-gray-900 transition hover:bg-gray-50 active:scale-[0.98]"
          >
            영수증 출력하기
          </button>
        </div>
      </main>
    </div>
  )
}

// Icons for the page
const ShoppingBag = ({ size, className }: { size: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
)
