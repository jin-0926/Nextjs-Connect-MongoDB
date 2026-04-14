import { NextResponse } from 'next/server'
import { OrderRepository } from '@/db/OrderRepository'
import { cookies } from 'next/headers'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const cookieStore = cookies()
    const sessionCookie = cookieStore.get('user_session')

    if (!sessionCookie) {
      return NextResponse.json({ success: false, message: '로그인이 필요합니다.' }, { status: 401 })
    }

    const orderId = params.id
    const order = await OrderRepository.getOrderById(orderId)

    if (!order) {
      return NextResponse.json({ success: false, message: '주문 정보를 찾을 수 없습니다.' }, { status: 404 })
    }

    // 보안 검사: 주문자 본인이거나 관리자/판매자인지 확인 (여기선 단순화하여 주문자 본인만 확인)
    const user = JSON.parse(sessionCookie.value)
    if (order.buyerId._id.toString() !== user.id) {
      // 만약 판매자 페이지에서도 이 API를 쓴다면 조건 추가 필요
      // 현재는 영수증 용도이므로 주문자만 허용
      return NextResponse.json({ success: false, message: '권한이 없습니다.' }, { status: 403 })
    }

    return NextResponse.json({ success: true, order }, { status: 200 })
  } catch (error) {
    console.error('API Order GET Error:', error)
    return NextResponse.json({ success: false, message: '주문 조회 중 서버 오류가 발생했습니다.' }, { status: 500 })
  }
}
