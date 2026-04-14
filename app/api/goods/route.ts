import { NextRequest, NextResponse } from 'next/server'
import { GoodsRepository } from '@/db/GoodsRepository'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
  try {
    const cookieStore = cookies()
    const sessionCookie = cookieStore.get('user_session')

    if (!sessionCookie) {
      return NextResponse.json({ success: false, message: '로그인이 필요합니다.' }, { status: 401 })
    }

    const user = JSON.parse(sessionCookie.value)

    // 판매자 권한 확인
    if (user.userType !== 'seller') {
      return NextResponse.json({ success: false, message: '판매자만 상품을 등록할 수 있습니다.' }, { status: 403 })
    }

    const { name, price, description, category, imageUrl, stock } = await req.json()

    const result = await GoodsRepository.createGoods({
      name,
      price: Number(price),
      description,
      imageUrl,
      stock: Number(stock),
      category: category || '기타',
      sellerId: user.id,
    })

    return NextResponse.json(
      {
        success: true,
        message: '상품이 성공적으로 등록되었습니다!',
        goods: result.goods,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('API Goods POST Error:', error)
    return NextResponse.json({ success: false, message: '서버 오류가 발생했습니다.' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const result = await GoodsRepository.getAllGoods()
    return NextResponse.json(
      {
        success: true,
        goodsList: result.goodsList,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('API Goods GET Error:', error)
    return NextResponse.json({ success: false, message: '상품 정보를 불러오지 못했습니다.' }, { status: 500 })
  }
}
