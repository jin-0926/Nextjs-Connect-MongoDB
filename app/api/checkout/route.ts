import { NextResponse } from 'next/server'
import { CartRepository } from '@/db/CartRepository'
import { GoodsRepository } from '@/db/GoodsRepository'
import { cookies } from 'next/headers'

export async function POST() {
  try {
    const cookieStore = cookies()
    const sessionCookie = cookieStore.get('user_session')

    if (!sessionCookie) {
      return NextResponse.json({ success: false, message: '로그인이 필요합니다.' }, { status: 401 })
    }

    const user = JSON.parse(sessionCookie.value)

    // 1. 장바구니 아이템 가져오기
    const cartResult = await CartRepository.getCartItems(user.id)
    const items = cartResult.items

    if (!items || items.length === 0) {
      return NextResponse.json({ success: false, message: '장바구니가 비어있습니다.' }, { status: 400 })
    }

    // 2. 재고 차감 처리
    try {
      for (const item of items) {
        // item.productId가 객체인 경우 _id를 사용
        const product = item.productId as { _id: string } | string
        const productId = typeof product === 'object' ? product._id : product

        await GoodsRepository.decreaseStock(productId, item.quantity)
      }
    } catch (stockError: unknown) {
      const errorMessage = stockError instanceof Error ? stockError.message : '재고 차감 중 오류가 발생했습니다.'
      return NextResponse.json({ success: false, message: errorMessage }, { status: 400 })
    }

    // 3. 장바구니 비우기
    await CartRepository.clearCart(user.id)

    return NextResponse.json(
      {
        success: true,
        message: '결제가 완료되었습니다. 주문해주셔서 감사합니다!',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('API Checkout POST Error:', error)
    return NextResponse.json({ success: false, message: '결제 처리 중 서버 오류가 발생했습니다.' }, { status: 500 })
  }
}
