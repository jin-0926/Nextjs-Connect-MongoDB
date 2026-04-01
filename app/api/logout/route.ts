import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  try {
    // 세션 쿠키 삭제
    cookies().delete('user_session')

    return NextResponse.json({ success: true, message: '로그아웃 성공' }, { status: 200 })
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json({ success: false, message: '로그아웃 도중 오류가 발생했습니다.' }, { status: 500 })
  }
}
