'use server'
import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URL

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

export const dbConnection = async () => {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = await mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose
    }).catch((error)=>{
      throw new Error('error in connection')
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (error) {
    cached.promise = null
    console.log('error in connection')
    throw new Error("check network coonnectivity")
  }

  return cached.conn
}
