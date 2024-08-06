// 'use server'
import { NextResponse } from "next/server";
import { GridFSBucket } from "mongodb";
import { MongoClient } from 'mongodb';
import { WriteConcern } from "mongodb";
import { ReadPreference } from "mongodb";
import { existsSync } from "fs";
import mongoose from "mongoose";
import { createReadStream, createWriteStream } from "fs";
import { Post } from "../../../lib/postModel";
export const dynamic ='force-dynamic'
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
const client = new MongoClient(process.env.MONGODB_URL);
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

  const GridFSBucketOptions = {

    bucketName:'upload',
    chunkSizeBytes : 256 *1024,
    readPreference:ReadPreference.secondary
 }
  
 const bucket = new GridFSBucket(db, GridFSBucketOptions)
export async function POST(req:Request){

    const form = await req.formData();
    const name = form.get('search') as String ;
    // console.log(name);

 try{
     const findUser = await Post.findOne({
          name
       })
     if(!findUser){
        return NextResponse.json({message:"no app with such name try different name"},{status:500})
      }
      const bucketFilename =  findUser.Filename

      const cursor = bucket.find({
          filename:bucketFilename
       })

      const array = await cursor.toArray()
      const uploadFilename = array[0].filename
 
      console.log("log")
 
      const response = findUser
      const check = existsSync(`./public/images/${uploadFilename}`)
  
     if(check){
        return NextResponse.json({response},{status:200})
      }

      bucket.openDownloadStreamByName(uploadFilename)
      .pipe(createWriteStream(`./public/images/${uploadFilename}`))
       return NextResponse.json({response},{status:200})  
 
    }
    catch(error){
      throw error
    
    }
}