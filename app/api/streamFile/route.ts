'use server'
import client from "../../../lib/mongodb";
import { ReadPreference } from "mongodb";
import { GridFSBucket } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { createReadStream } from "fs";


const db = client.db('software_city');

const GridFSBucketOptions =

 {
    bucketName:'upload',
    chunkSizeBytes : 256*1024,
    readPreference:ReadPreference.secondary,

  } 
const bucket = new GridFSBucket(db, GridFSBucketOptions)

export async function POST(req:NextRequest){
  console.log('start')
   const formData = await req.formData();
   const file = formData.get('file') as File;
   const title = formData.get('title') as String;

   if(!file || !title){
    return NextResponse.json("check all input",{status:400});
   }
   try{
    const fileFormat = file.name.slice(-4)
    console.log('start')
    const createStream =  createReadStream(`./public/uploads/${title}${fileFormat}`)
    .pipe(bucket.openUploadStream(`${title}${fileFormat}`))
    .on('finish',()=>{
        console.log('finish reading  file to stream')
    })
    .on('error',()=>{
  console.log('failed to write file to stream')
    })
    .on('close',()=>{
        console.log('done closing event')
    })
    const itemId = createStream.id;
    const filename = createStream.filename;

    const response ={
        itemId,
        filename
    }
    return NextResponse.json(response,{status:200})

   }
   catch(error){
      return NextResponse.json('failed to upload file',{status:400});
   }
  

}

