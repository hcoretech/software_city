'use server'
import { NextResponse } from "next/server";
import { GridFSBucket } from "mongodb";
import { MongoClient } from 'mongodb';
import { createReadStream, createWriteStream } from "fs";
import fs from "node:fs/promises"
import { Post } from "../../../lib/postModel";
// import { useSearchParams } from 'next/navigation'



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
export async function GET(req:Request,res:NextResponse){
    // dbConnection();
    const { searchParams } = new URL(req.url)
  
    const name = searchParams.get('name');
    const id = searchParams.get('id');
    console.log(id);
// const searchParams = params.get('name')
// const title = body.get('search').toString();
// console.log(title)

try{

  const findUser = await Post.findOne({
    'name':name
  })
  const bucketFilename = await findUser.Filename

 const cursor = bucket.find({
   filename:bucketFilename
 })

 const array = await cursor.toArray()
 const uploadFilename = array[0].filename

 const downloadStream = bucket.openDownloadStreamByName(uploadFilename)

// const buffer = downloadStream.on('data',(chunck)=>{
//   return chunck

//  })
// //  await fs.writeFile('./public/images',buffer)
//  downloadStream.on('error',(error)=>{
//  console.log(error)
//  })
//  downloadStream.on('end',()=>{
//  })
 const writeStream = downloadStream.pipe(createWriteStream(`./public/images/${uploadFilename}`))
  const streamfile = writeStream.path.slice(8).toString()
  // const createObject = URL.createObjectURL(streamFile)

  // console.log(response)
//  const senData = await data ;
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
       const response = findUser

  return NextResponse.json({response},{status:200})
  // .headers.set(
  //   Content-type:"multipart/form-data"
  // )
}catch(error){
    return NextResponse.json({message:'fail to connect to database'},{status:501})
    
}
}