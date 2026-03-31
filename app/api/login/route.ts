import { NextRequest, NextResponse } from 'next/server'
import { UserRepository } from '@/db/UserRepository'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    // 1. 리포지토리를 통해 사용자 인증
    const result = await UserRepository.authenticateUser(email, password)

    if (result.success) {
      // 2. 인증 성공 시 결과 반환
      return NextResponse.json(
        {
          success: true,
          message: '로그인 성공!',
          user: result.user,
        },
        { status: 200 }
      )
    }

    // 3. 인증 실패 시 오류 메시지 반환
    return NextResponse.json(
      {
        success: false,
        message: result.message,
      },
      { status: 401 }
    )
  } catch (error: unknown) {
    console.error('API Login Error:', error)
    return NextResponse.json(
      {
        success: false,
        message: '서버 내부 오류가 발생했습니다.',
      },
      { status: 500 }
    )
  }
}
