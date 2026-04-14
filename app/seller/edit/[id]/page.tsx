'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Image from 'next/image'
import { Save, Loader2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function EditGoodsPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [stock, setStock] = useState('')
  const [category, setCategory] = useState('의류')
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 1. 기존 상품 정보 불러오기
  useEffect(() => {
    const fetchGoods = async () => {
      try {
        const response = await fetch(`/api/goods/detail?id=${id}`)
        const data = await response.json()
        if (data.success && data.goods) {
          const g = data.goods
          setName(g.name)
          setPrice(g.price.toString())
          setDescription(g.description)
          setImageUrl(g.imageUrl)
          setStock(g.stock.toString())
          setCategory(g.category)
        } else {
          alert('상품 정보를 불러오는데 실패했습니다.')
          router.push('/seller')
        }
      } catch (error) {
        console.error('Fetch goods error:', error)
        alert('오류가 발생했습니다.')
      } finally {
        setIsLoading(false)
      }
    }
    if (id) fetchGoods()
  }, [id, router])

  // 2. 수정 데이터 제출하기
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/seller/goods/${id}`, {
        method: 'PUT',
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
        alert('상품 정보가 수정되었습니다!')
        router.push('/seller')
      } else {
        alert(data.message || '수정에 실패했습니다.')
      }
    } catch (error) {
      console.error('Update goods error:', error)
      alert('서버와 통신 중 오류가 발생했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-gray-400" size={40} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6">
          <Link
            href="/seller"
            className="flex items-center gap-2 text-sm font-medium text-gray-400 transition-colors hover:text-gray-900"
          >
            <ArrowLeft size={16} /> 돌아가기
          </Link>
        </div>

        <div className="rounded-3xl border bg-white p-8 shadow-sm sm:p-12">
          <div className="mb-10 text-center">
            <h1 className="text-2xl font-bold text-gray-900">상품 정보 수정</h1>
            <p className="mt-2 text-sm text-gray-500">수정할 내용을 입력하고 저장 버튼을 눌러주세요.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="ml-1 text-xs font-semibold uppercase tracking-wider text-gray-400">상품명</label>
              <input
                type="text"
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
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-gray-900 focus:ring-0"
                required
              />
              {imageUrl && (
                <div className="relative mt-2 h-40 w-full overflow-hidden rounded-xl border border-gray-50 bg-gray-100">
                  <Image src={imageUrl} alt="preview" fill className="object-contain" />
                </div>
              )}
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
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 py-4 font-medium text-white shadow-lg shadow-gray-200 transition hover:bg-gray-800 disabled:opacity-50"
            >
              {isSubmitting ? '저장 중...' : '변경사항 저장하기'}
              {!isSubmitting && <Save size={18} />}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
