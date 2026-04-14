import { NextRequest, NextResponse } from 'next/server'
import { GoodsRepository } from '@/db/GoodsRepository'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ success: false, message: '상품 ID가 필요합니다.' }, { status: 400 })
    }

    const result = await GoodsRepository.getGoodsById(id)
    if (!result.success || !result.goods) {
      return NextResponse.json({ success: false, message: '상품을 찾을 수 없습니다.' }, { status: 404 })
    }

    return NextResponse.json({ success: true, goods: result.goods })
  } catch (error) {
    console.error('API Goods Detail GET Error:', error)
    return NextResponse.json({ success: false, message: '서버 오류가 발생했습니다.' }, { status: 500 })
  }
}
