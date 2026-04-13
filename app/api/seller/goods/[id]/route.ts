import { NextResponse } from 'next/server'
import { GoodsRepository } from '@/db/GoodsRepository'
import { cookies } from 'next/headers'

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const cookieStore = cookies()
    const sessionCookie = cookieStore.get('user_session')

    if (!sessionCookie) {
      return NextResponse.json({ success: false, message: '로그인이 필요합니다.' }, { status: 401 })
    }

    const user = JSON.parse(sessionCookie.value)
    if (user.userType !== 'seller') {
      return NextResponse.json({ success: false, message: '판매자 권한이 필요합니다.' }, { status: 403 })
    }

    const { id } = params
    await GoodsRepository.deleteGoods(id, user.id)

    return NextResponse.json({ success: true, message: '상품이 삭제되었습니다.' })
  } catch (error: unknown) {
    console.error('API Seller Goods DELETE Error:', error)
    const errorMessage = error instanceof Error ? error.message : '상품 삭제 중 오류가 발생했습니다.'
    return NextResponse.json({ success: false, message: errorMessage }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const cookieStore = cookies()
    const sessionCookie = cookieStore.get('user_session')

    if (!sessionCookie) {
      return NextResponse.json({ success: false, message: '로그인이 필요합니다.' }, { status: 401 })
    }

    const user = JSON.parse(sessionCookie.value)
    if (user.userType !== 'seller') {
      return NextResponse.json({ success: false, message: '판매자 권한이 필요합니다.' }, { status: 403 })
    }

    const { id } = params
    const updateData = await request.json()

    // numeric fields conversion
    if (updateData.price) updateData.price = Number(updateData.price)
    if (updateData.stock) updateData.stock = Number(updateData.stock)

    const result = await GoodsRepository.updateGoods(id, user.id, updateData)

    return NextResponse.json({
      success: true,
      message: '상품 정보가 수정되었습니다.',
      goods: result.goods,
    })
  } catch (error: unknown) {
    console.error('API Seller Goods PUT Error:', error)
    const errorMessage = error instanceof Error ? error.message : '상품 수정 중 오류가 발생했습니다.'
    return NextResponse.json({ success: false, message: errorMessage }, { status: 500 })
  }
}
