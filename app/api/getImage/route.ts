'use server'
import { NextResponse } from "next/server";
import dbConnection from "../../../lib/mongodb";
import { Post } from "../../../lib/postModel";
import { GridFSBucket } from "mongodb";
import mongoose from "mongoose";
import { MongoClient } from 'mongodb';
import { createReadStream, createWriteStream } from "fs";
import fs from "node:fs/promises"


// mongoose.createConnection(process.env.MONGODB_URL)

// let bucket ;
//  ()=>{
//     mongoose.connection.on("connected", () => {
//   bucket = new GridFSBucket(mongoose.connection[0].db, {
//     bucketName: 'upload',
//   });
// });


// }
const client = new MongoClient(process.env.MONGODB_URL);
 const db = client.db();
  
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
}
  
 const bucket = new GridFSBucket(db, {
    bucketName:'upload',
    chunkSizeBytes : 256 *1024,
    // readPreference:ReadPreference.secondary,
    // writeConcern:WriteConcern,
    // disableMD5:false
  }
 )
export async function POST(req:Request,res:NextResponse){
    // dbConnection();
const body = await req.formData();
const title = body.get('title').toString();
// console.log(title)

try{

 const cursor = bucket.find({
   filename:title
 })

 const array = await cursor.toArray()
 const arrays =array[0].filename
 const buck = bucket.openDownloadStreamByName(arrays)
 const data= buck.pipe(createWriteStream(`./public/${arrays}`)).path.slice(8)
   
   
console.log(data)
//  }).catch((error)=>{
//     throw error
//  })
 
//  createReadStream(array.filename)


// const arrays = bucket.openDownloadStreamByName(`${title}`)
//  pipe(createWriteStream(`./public/${title}`))

//  bucket.find().stream

//  bucket.openDownloadStreamByName(`${title}`).
//      pipe(createWrssiteStream(`./public/${title}`))
     
//  pipe(createWriteStream())
//   if(!get){
//     return NextResponse.json({message:'no file gotten'},{status:200})
//   }
// console.log(download)

  return NextResponse.json({data},{status:200})
}catch(error){
    return NextResponse.json({message:'fail to connect to database'},{status:501})
}
}