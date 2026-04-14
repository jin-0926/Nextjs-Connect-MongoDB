import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { OrderRepository } from '@/db/OrderRepository'

export async function GET() {
  try {
    const cookieStore = cookies()
    const sessionCookie = cookieStore.get('user_session')

    if (!sessionCookie) {
      return NextResponse.json({ error: '인증되지 않은 사용자입니다.' }, { status: 401 })
    }

    const userData = JSON.parse(sessionCookie.value)
    // 판매자 권한 확인 (필요시)
    // if (userData.role !== 'seller') { ... }

    const orders = await OrderRepository.getOrdersBySellerId(userData.id)
    return NextResponse.json(orders, { status: 200 })
  } catch (error) {
    const err = error as Error
    console.error('Seller orders API error details:', {
      message: err.message,
      stack: err.stack,
      error: err,
    })
    return NextResponse.json({ error: '주문 목록을 가져오는데 실패했습니다.' }, { status: 500 })
  }
}
