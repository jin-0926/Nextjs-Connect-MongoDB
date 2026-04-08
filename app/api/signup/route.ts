import { NextRequest, NextResponse } from 'next/server'
import { UserRepository } from '@/db/UserRepository'

export async function POST(req: NextRequest) {
  try {
    const userData = await req.json()

    // 리포지토리를 통해 유저 생성 (중복 체크 및 암호화 포함)
    const result = await UserRepository.createUser(userData)

    if (result.success) {
      return NextResponse.json({ success: true, message: result.message }, { status: 201 })
    } else {
      return NextResponse.json({ success: false, message: result.message }, { status: 400 })
    }
  } catch (error: unknown) {
    console.error('API Signup Error:', error)
    return NextResponse.json({ success: false, message: '서버 내부 오류가 발생했습니다.' }, { status: 500 })
  }
}
