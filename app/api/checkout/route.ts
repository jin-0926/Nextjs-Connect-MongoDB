import { NextResponse } from 'next/server'
import { CartRepository } from '@/db/CartRepository'
import { GoodsRepository } from '@/db/GoodsRepository'
import { OrderRepository } from '@/db/OrderRepository'
import { cookies } from 'next/headers'

interface ICartItem {
  _id: string
  productId: {
    _id: string
    name: string
    price: number
    sellerId: string
  } | null
  quantity: number
}

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
    const items = cartResult.items as unknown as ICartItem[]

    if (!items || items.length === 0) {
      return NextResponse.json({ success: false, message: '장바구니가 비어있습니다.' }, { status: 400 })
    }

    // 1.5 본인 상품 구매 제한 확인
    for (const item of items) {
      const product = item.productId
      if (!product) continue // 상품 정보가 없는 경우 무시하거나 필터링 필요

      if (product.sellerId && product.sellerId.toString() === user.id) {
        return NextResponse.json(
          { success: false, message: `본인이 등록한 상품(${product.name || '알 수 없는 상품'})은 구매할 수 없습니다.` },
          { status: 400 }
        )
      }
    }

    // 2. 재고 차감 처리 및 주문 아이템 준비
    const orderItems = []
    let totalAmount = 0

    try {
      for (const item of items) {
        const product = item.productId
        if (!product) {
          throw new Error('일부 상품 정보를 찾을 수 없습니다. 장바구니를 확인해주세요.')
        }

        const productId = product._id.toString()

        await GoodsRepository.decreaseStock(productId, item.quantity)

        orderItems.push({
          productId: productId,
          quantity: item.quantity,
          price: product.price,
        })
        totalAmount += product.price * item.quantity
      }
    } catch (stockError: unknown) {
      const errorMessage = stockError instanceof Error ? stockError.message : '재고 차감 중 오류가 발생했습니다.'
      return NextResponse.json({ success: false, message: errorMessage }, { status: 400 })
    }

    // 3. 주문 내역 생성
    await OrderRepository.createOrder({
      buyerId: user.id,
      orderItems,
      totalAmount,
      shippingAddress: '기본 배송지', // 추후 UI에서 입력받도록 고도화 가능
      contact: '010-0000-0000', // 추후 UI에서 입력받도록 고도화 가능
      receiver: user.nickname || '구매자', // 추후 UI에서 입력받도록 고도화 가능
    })

    // 4. 장바구니 비우기
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
