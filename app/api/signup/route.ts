import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/db/dbConnect'
import User from '@/db/models/user'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, userType } = await req.json()

    // 1. DB 연결
    await dbConnect()

    // 2. 이미 존재하는 사용자가 있는지 확인
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json({ success: false, message: '이미 가입된 이메일입니다.' }, { status: 400 })
    }

    // 3. 비밀번호 해싱(암호화)
    const hashedPassword = await bcrypt.hash(password, 12)

    // 4. 새로운 사용자 저장
    const newUser = new User({
      nickname: name,
      email,
      password: hashedPassword,
      user_type: userType || 'user',
    })

    await newUser.save()

    return NextResponse.json({ success: true, message: '회원가입이 완료되었습니다.' }, { status: 201 })
  } catch (error: unknown) {
    console.error('Signup Error:', error)
    return NextResponse.json({ success: false, message: '서버 오류가 발생했습니다.' }, { status: 500 })
  }
}
