import { NextRequest, NextResponse } from 'next/server'
import { CartRepository } from '@/db/CartRepository'
import { cookies } from 'next/headers'

/**
 * 장바구니에 아이템을 추가함 (POST)
 */
export async function POST(req: NextRequest) {
  try {
    const cookieStore = cookies()
    const sessionCookie = cookieStore.get('user_session')

    if (!sessionCookie) {
      return NextResponse.json({ success: false, message: '로그인이 필요합니다.' }, { status: 401 })
    }

    const user = JSON.parse(sessionCookie.value)
    const { productId } = await req.json()

    if (!productId) {
      return NextResponse.json({ success: false, message: '상품 ID가 없습니다.' }, { status: 400 })
    }

    const result = await CartRepository.addCartItem(user.id, productId)
    return NextResponse.json({ success: true, item: result.item }, { status: 200 })
  } catch (error) {
    console.error('API Cart POST Error:', error)
    return NextResponse.json({ success: false, message: '장바구니 담기에 실패했습니다.' }, { status: 500 })
  }
}

/**
 * 장바구니 목록을 가져옴 (GET)
 */
export async function GET() {
  try {
    const cookieStore = cookies()
    const sessionCookie = cookieStore.get('user_session')

    if (!sessionCookie) {
      return NextResponse.json({ success: false, message: '로그인이 필요합니다.' }, { status: 401 })
    }

    const user = JSON.parse(sessionCookie.value)
    const result = await CartRepository.getCartItems(user.id)

    return NextResponse.json({ success: true, items: result.items }, { status: 200 })
  } catch (error) {
    console.error('API Cart GET Error:', error)
    return NextResponse.json({ success: false, message: '장바구니 목록을 불러오지 못했습니다.' }, { status: 500 })
  }
}

/**
 * 장바구니 아이템 수량 변경 (PUT)
 */
export async function PUT(req: NextRequest) {
  try {
    const cookieStore = cookies()
    const sessionCookie = cookieStore.get('user_session')

    if (!sessionCookie) {
      return NextResponse.json({ success: false, message: '로그인이 필요합니다.' }, { status: 401 })
    }

    const user = JSON.parse(sessionCookie.value)
    const { cartId, quantity } = await req.json()

    if (!cartId || quantity === undefined) {
      return NextResponse.json({ success: false, message: '정보가 누락되었습니다.' }, { status: 400 })
    }

    const result = await CartRepository.updateCartItemQuantity(user.id, cartId, quantity)
    return NextResponse.json({ success: true, item: result.item }, { status: 200 })
  } catch (error) {
    console.error('API Cart PUT Error:', error)
    return NextResponse.json({ success: false, message: '수량 변경에 실패했습니다.' }, { status: 500 })
  }
}

/**
 * 장바구니 아이템 삭제 (DELETE)
 */
export async function DELETE(req: NextRequest) {
  try {
    const cookieStore = cookies()
    const sessionCookie = cookieStore.get('user_session')

    if (!sessionCookie) {
      return NextResponse.json({ success: false, message: '로그인이 필요합니다.' }, { status: 401 })
    }

    const user = JSON.parse(sessionCookie.value)
    const { cartId } = await req.json()

    if (!cartId) {
      return NextResponse.json({ success: false, message: '장바구니 ID가 없습니다.' }, { status: 400 })
    }

    await CartRepository.removeCartItem(user.id, cartId)
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('API Cart DELETE Error:', error)
    return NextResponse.json({ success: false, message: '장바구니 삭제에 실패했습니다.' }, { status: 500 })
  }
}
