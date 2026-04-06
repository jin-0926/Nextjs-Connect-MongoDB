'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Plus } from 'lucide-react'

export default function AddGoodsPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [stock, setStock] = useState('')
  const [category, setCategory] = useState('의류')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/goods', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          price,
          description,
          imageUrl,
          stock,
          category,
        }),
      })

      const data = await response.json()
      if (data.success) {
        alert('상품이 성공적으로 등록되었습니다!')
        router.push('/seller')
      } else {
        alert(data.message || '등록에 실패했습니다.')
      }
    } catch (error) {
      console.error('Add goods error:', error)
      alert('서버와 통신 중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/seller"
          className="mb-8 flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-900"
        >
          <ArrowLeft size={16} />
          판매자 센터로 돌아가기
        </Link>

        <div className="rounded-3xl border bg-white p-8 shadow-sm sm:p-12">
          <div className="mb-10 text-center">
            <h1 className="text-2xl font-bold text-gray-900">새 상품 등록</h1>
            <p className="mt-2 text-sm text-gray-500">판매할 상품의 정보를 정확히 입력해주세요.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="ml-1 text-xs font-semibold uppercase tracking-wider text-gray-400">상품명</label>
              <input
                type="text"
                placeholder="상품을 입력하세요"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-gray-900 focus:ring-0"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="ml-1 text-xs font-semibold uppercase tracking-wider text-gray-400">가격 (원)</label>
                <input
                  type="number"
                  placeholder="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-gray-900 focus:ring-0"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="ml-1 text-xs font-semibold uppercase tracking-wider text-gray-400">물량 (재고)</label>
                <input
                  type="number"
                  placeholder="0"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-gray-900 focus:ring-0"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="ml-1 text-xs font-semibold uppercase tracking-wider text-gray-400">상품 설명</label>
              <textarea
                placeholder="상품에 대한 상세한 설명을 입력하세요"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-gray-900 focus:ring-0"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="ml-1 text-xs font-semibold uppercase tracking-wider text-gray-400">이미지 URL</label>
              <input
                type="text"
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-gray-900 focus:ring-0"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="ml-1 text-xs font-semibold uppercase tracking-wider text-gray-400">카테고리</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-gray-900 focus:ring-0"
              >
                <option value="의류">의류</option>
                <option value="전자제품">전자제품</option>
                <option value="식품">식품</option>
                <option value="액세서리">액세서리</option>
                <option value="기타">기타</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 py-4 font-medium text-white shadow-lg shadow-gray-200 transition hover:bg-gray-800 disabled:opacity-50"
            >
              {isLoading ? '등록 중...' : '상품 등록하기'}
              {!isLoading && <Plus size={18} />}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
