'use client'

import React from 'react'
import Image from 'next/image'
import { Plus } from 'lucide-react'

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'Luxury Sapphire Watch',
    price: '₩1,200,000',
    image: '/images/watch.png',
    category: 'Watch',
  },
  {
    id: 2,
    name: 'Minimalist Urban Backpack',
    price: '₩180,000',
    image: '/images/hero.png',
    category: 'Accessory',
  },
  {
    id: 3,
    name: 'Wireless Noise-Canceling Headphones',
    price: '₩450,000',
    image: '/images/watch.png',
    category: 'Audio',
  },
  {
    id: 4,
    name: 'Premium Leather Wallet',
    price: '₩120,000',
    image: '/images/hero.png',
    category: 'Accessory',
  },
]

export default function ProductList() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12 flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">상품 목록</h2>
          <p className="mt-2 text-gray-500">최고의 명품 컬렉션을 만나보세요</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {MOCK_PRODUCTS.map((product) => (
          <div key={product.id} className="group relative flex flex-col">
            <div className="flex aspect-[3/4] w-full items-center justify-center overflow-hidden rounded-2xl bg-gray-100 transition-transform duration-300 group-hover:scale-[1.02]">
              <Image
                src={product.image}
                alt={product.name}
                width={500}
                height={667}
                className="h-full w-full object-cover"
              />
              <button className="translate-y-4 rounded-full bg-white p-3 text-gray-900 opacity-0 shadow-lg transition-opacity duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <Plus size={20} />
              </button>
            </div>

            <div className="mt-6 flex flex-col gap-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">{product.category}</p>
              <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
              <p className="mt-1 text-xl font-bold text-gray-900">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
