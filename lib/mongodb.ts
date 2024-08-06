// 'use server'
import mongoose from 'mongoose'
import { MongoClient,ServerApiVersion } from 'mongodb';


const MONGODB_URI = process.env.MONGODB_URL


if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

const options = {
  serverApi: {
    version:ServerApiVersion.v1,
    strict:true,
    deprecationErrors:true
  }
}

let client:MongoClient;

if(process.env.NODE_ENV === "development"){

  let globalWithMongo = global as typeof globalThis & {
    _mongoClient?:MongoClient
  };
  if(!globalWithMongo._mongoClient){
    globalWithMongo._mongoClient = new MongoClient(MONGODB_URI,options);
    }
    client = globalWithMongo._mongoClient
}else{
  client =  new MongoClient(MONGODB_URI,options);
}
export default client;

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
// let cached = global.mongoose

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null }
// }

// export const dbConnection = async () => {
//   if (cached.conn) {
//     return cached.conn
//   }

//   if (!cached.promise) {
//     const opts = {
//       bufferCommands: false,
//     }

//     cached.promise = await mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
//       return mongoose
//     }).catch((error)=>{
//       throw new Error('error in connection')
//     })
//   }

//   try {
//     cached.conn = await cached.promise
//   } catch (error) {
//     cached.promise = null
//     console.log('error in connection')
//     throw new Error("check network coonnectivity")
//   }

//   return cached.conn
// }
