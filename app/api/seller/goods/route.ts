import { NextResponse } from 'next/server'
import { GoodsRepository } from '@/db/GoodsRepository'
import { cookies } from 'next/headers'

export async function GET() {
  try {
    const cookieStore = cookies()
    const sessionCookie = cookieStore.get('user_session')

    if (!sessionCookie) {
      return NextResponse.json({ success: false, message: '로그인이 필요합니다.' }, { status: 401 })
    }

    const user = JSON.parse(sessionCookie.value)

    if (user.userType !== 'seller') {
      return NextResponse.json({ success: false, message: '판매자 권한이 없습니다.' }, { status: 403 })
    }

    const { goodsList } = await GoodsRepository.getGoodsBySellerId(user.id)

    return NextResponse.json(
      {
        success: true,
        goodsList,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('API Seller Goods GET Error:', error)
    return NextResponse.json({ success: false, message: '판매자 상품 정보를 불러오지 못했습니다.' }, { status: 500 })
  }
}
