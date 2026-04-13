/* eslint-disable no-var */
// db\dbConnect.ts
import mongoose from 'mongoose'

declare global {
  var mongoose: {
    conn: mongoose.Connection | null
    promise: Promise<mongoose.Connection> | null
  }
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect(): Promise<mongoose.Connection> {
  if (cached.conn) {
    return cached.conn
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }
    console.log('MongoDB 연결 시도 중...')
    cached.promise = mongoose.connect(process.env.MONGODB_URI as string, opts).then((mongoose) => {
      console.log('MongoDB 연결 성공!')
      return mongoose.connection
    })
  }
  try {
    cached.conn = await cached.promise
  } catch (e) {
    console.error('MongoDB 연결 실패:', e)
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default dbConnect
