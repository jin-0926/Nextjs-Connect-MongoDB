import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/db/dbConnect'
import User from '@/db/models/user'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    // 1. DB 연결
    await dbConnect()

    // 2. 사용자 찾기
    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json({ success: false, message: '가입되지 않은 이메일입니다.' }, { status: 401 })
    }

    // 3. 비밀번호 확인
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return NextResponse.json({ success: false, message: '비밀번호가 일치하지 않습니다.' }, { status: 401 })
    }

    // 4. 성공 시 유저 정보 반환 (user_type 포함)
    return NextResponse.json({
      success: true,
      message: '로그인 성공!',
      user: {
        email: user.email,
        nickname: user.nickname,
        userType: user.user_type,
      },
    })
  } catch (error: unknown) {
    console.error('Login Error:', error)
    return NextResponse.json({ success: false, message: '서버 오류가 발생했습니다.' }, { status: 500 })
  }
}
