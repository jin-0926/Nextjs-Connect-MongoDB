import dbConnect from './dbConnect'
import User from './models/user'
import bcrypt from 'bcryptjs'

interface UserData {
  name: string
  email: string
  password: string
  userType?: string
}

export class UserRepository {
  /**
   * 이메일로 유저를 찾아서 비밀번호가 일치하는지 확인합니다.
   */
  static async authenticateUser(email: string, password: string) {
    try {
      await dbConnect()

      const user = await User.findOne({ email })
      if (!user) {
        return { success: false, message: '가입되지 않은 이메일입니다.' }
      }

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return { success: false, message: '비밀번호가 일치하지 않습니다.' }
      }

      return {
        success: true,
        user: {
          id: user._id,
          email: user.email,
          nickname: user.nickname,
          userType: user.user_type,
        },
      }
    } catch (error: unknown) {
      console.error('UserRepository Error:', error)
      throw new Error('데이터베이스 처리 중 오류가 발생했습니다.')
    }
  }

  /**
   * 새로운 유저를 등록합니다. (비밀번호 암호화 포함)
   */
  static async createUser(userData: UserData) {
    try {
      await dbConnect()

      const existingUser = await User.findOne({ email: userData.email })
      if (existingUser) {
        return { success: false, message: '이미 가입된 이메일입니다.' }
      }

      const hashedPassword = await bcrypt.hash(userData.password, 12)

      const newUser = new User({
        nickname: userData.name,
        email: userData.email,
        password: hashedPassword,
        user_type: userData.userType || 'user',
      })

      await newUser.save()
      return { success: true, message: '회원가입이 완료되었습니다.' }
    } catch (error: unknown) {
      console.error('UserRepository Create Error:', error)
      throw new Error('회원가입 처리 중 오류가 발생했습니다.')
    }
  }
}
