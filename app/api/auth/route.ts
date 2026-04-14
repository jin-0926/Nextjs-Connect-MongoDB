import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { username, role } = body
    console.log('Login attempt:', { username, role })

    // 현재는 로그인 되었다는 성공 응답만 반환
    return NextResponse.json({ message: '로그인되었습니다.', user: { username, role } }, { status: 200 })
  } catch {
    return NextResponse.json({ message: '로그인 처리 중 오류가 발생했습니다.' }, { status: 500 })
  }
}
