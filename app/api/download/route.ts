
import { NextRequest, NextResponse } from "next/server";
import { NextApiResponse } from "next";
import { GridFSBucket, ObjectId,  } from "mongodb";
import { ReadPreference } from "mongodb";
import client from "../../../lib/mongodb";
import { createReadStream } from "fs";

const db = client.db();

const GridFSBucketOptions = {

    bucketName:'upload',
    chunkSizeBytes : 1024*1024,
    readPreference:ReadPreference.secondary
 }
  
 const bucket = new GridFSBucket(db, GridFSBucketOptions)

export async function GET(req:NextRequest,res:NextApiResponse){
     
    const params = req.nextUrl 
    const id =  params.searchParams.get('id') 
    // const search = id : ObjectId
  try{

    
    const cursor = bucket.openDownloadStreamByName(id)
   
    

    const array = await cursor.toArray()
    res.send(array)
    // const uploadFilename = array[0].filename

    // console.log(array)
    // return new NextResponse().arrayBuffer()
  }
  catch(error){
   return new NextResponse(error,{status:400})
  }
    

}