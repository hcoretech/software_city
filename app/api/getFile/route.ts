'use server'
import { NextRequest,NextResponse } from "next/server";
import { GridFSBucket } from "mongodb";
import { MongoClient } from 'mongodb';
import { ReadPreference } from "mongodb";
import { existsSync } from "fs";
import fs from "node:fs/promises"
import mongoose from "mongoose";
import { createReadStream, createWriteStream } from "fs";
import { Post } from "../../../lib/postModel";
// export const dynamic ='force-dynamic'
import client from "../../../lib/mongodb";
import { isUtf8 } from "buffer";
// import { useSearchParams } from "next/navigation";
// import { useSearchParams } from 'next/navigation'



// const conn = mongoose.createConnection(process.env.MONGODB_URL)

// let bucket;
//   conn.on("connected", () => {
//       bucket = new GridFSBucket(mongoose.connection.db, {
//         bucketName: 'upload',
//         chunkSizeBytes : 256 *1024,
//       })
//   })
//   conn.on("open", () => {
//     bucket = new GridFSBucket(mongoose.connection[0].db, {
//       bucketName: 'upload',
//     })
// })
// let bucket ;
//  ()=>{
//     mongoose.connection.on("connected", () => {
//   bucket = new GridFSBucket(mongoose.connection[0].db, {
//     bucketName: 'upload',
//   });
// });


// }
// const clients = new MongoClient(process.env.MONGODB_URL);
const db = client.db()
  
// let bucket ;
//   async function run (){
//     mongoose.connection.on("connected", () => {
//     bucket = new GridFSBucket(db, {
//     bucketName: 'upload',
//   });
// })
// }   
// return connect();

// }
// mongoose.createConnection(process.env.MONGODB_URL)

  
 
export async function GET(req:NextRequest){
    
    const searchParams =req.nextUrl
    const clientd = client;
    // const db = clientd.db();
    const post = db.collection('posts')
    const name = searchParams.searchParams.get('search')
    // const form = await req.formData();
    // const name = form.get('search') as String ;
    // console.log(name);

 try{
     const findUser = await post.findOne({
          name
       })
     if(!findUser){
        return NextResponse.json({message:"no app with such name try different name"},{status:500})
      }
     
 
       const response = findUser
       console.log(response)
       return NextResponse.json({response},{status:200})  
 
    }
    catch(error){
      throw error
    
    }
}