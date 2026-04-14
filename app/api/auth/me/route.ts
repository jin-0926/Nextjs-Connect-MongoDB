import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  try {
    const cookieStore = cookies()
    const sessionCookie = cookieStore.get('user_session')

    if (!sessionCookie) {
      return NextResponse.json({ loggedIn: false }, { status: 200 })
    }

    const userData = JSON.parse(sessionCookie.value)

    return NextResponse.json(
      {
        loggedIn: true,
        user: userData,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Auth me error:', error)
    return NextResponse.json({ loggedIn: false }, { status: 200 })
  }
}
