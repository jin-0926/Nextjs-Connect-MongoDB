'use client'

import { useEffect, useState } from 'react'

interface OrderItem {
  productId: {
    _id: string
    name: string
    price: number
    imageUrl: string
  }
  quantity: number
  price: number
}

interface Order {
  _id: string
  buyerId: {
    name: string
    email: string
  }
  orderItems: OrderItem[]
  totalAmount: number
  status: string
  createdAt: string
  shippingAddress: string
  receiver: string
}

export default function SellerOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/seller/orders')
      if (res.ok) {
        const data = await res.json()
        setOrders(data)
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case '결제완료':
        return 'bg-blue-100 text-blue-800'
      case '배송준비':
        return 'bg-yellow-100 text-yellow-800'
      case '배송중':
        return 'bg-purple-100 text-purple-800'
      case '배송완료':
        return 'bg-green-100 text-green-800'
      case '취소됨':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-500" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl p-6">
      <header className="mb-8">
        <h1 className="font-outfit text-3xl font-bold text-gray-800">주문 관리</h1>
        <p className="mt-2 text-gray-500">판매 중인 상품의 주문 현황을 확인하고 관리하세요.</p>
      </header>

      {orders.length === 0 ? (
        <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center shadow-sm">
          <div className="mb-4 text-gray-400">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <p className="text-xl text-gray-600">아직 접수된 주문이 없습니다.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">주문일 / 번호</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">구매자</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">상품 정보</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">결제 금액</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">상태</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.map((order) => (
                  <tr key={order._id} className="transition-colors hover:bg-blue-50/30">
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{new Date(order.createdAt).toLocaleDateString()}</div>
                      <div className="mt-1 font-mono text-xs text-gray-400">{order._id.substring(0, 8)}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{order.buyerId?.name || '익명'}</div>
                      <div className="text-xs text-gray-500">{order.buyerId?.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        {order.orderItems.map((item, idx) => (
                          <div key={idx} className="flex items-center text-sm text-gray-600">
                            <span className="max-w-[200px] truncate">{item.productId?.name}</span>
                            <span className="ml-2 font-semibold text-blue-500">x{item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-gray-900">{order.totalAmount.toLocaleString()}원</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
