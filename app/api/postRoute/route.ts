'use server'

import { NextRequest, NextResponse } from "next/server";
import { GridFSBucket,ReadPreference,} from "mongodb";
import fs from "node:fs/promises"
// const stream= require('node:stream/promises')
import { MongoClient } from 'mongodb';
import { createReadStream,} from "node:fs";
import { Post } from "../../../lib/postModel";
import client from "../../../lib/mongodb";
// export const dynamic ='force-dynamic'





// mongoose.createConnection(process.env.MONGODB_URL)

// const client = new MongoClient(process.env.MONGODB_URL);
 const db = client.db("software_city");
  
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

const GridFSBucketOptions =

 {
    bucketName:'upload',
    chunkSizeBytes : 1024*1024,
    readPreference:ReadPreference.secondary,

  } 
const bucket = new GridFSBucket(db, GridFSBucketOptions)

export async function POST(req:NextRequest){ 

   const form = await req.formData();
   const file = form.get('file') as File;
   const title=form.get('title') as string;
   const imageLink = form.get('imageLink') as string;
   const description=form.get('description') as string;
   const buffer = Buffer.from(await file.arrayBuffer())
   const New = new Uint8Array(buffer)
   const fileFormat = file.name.slice(-4)
   const dbCreate = db.createCollection('posts')
  
    try{    
        
         if(!file ||  !title){
           return NextResponse.json({messsage:'no valid file'},{status:400})
         }

        //  await fs.writeFile(`./public/uploads/${title}${fileFormat}`,New)
        //   .then((file)=>{
        //     console.log('file written succesfully') })
        //    .catch((error)=>{    // throw error
        //     console.log('fail to write the file')
        //  })

         const createStream =  createReadStream(buffer)
         const uploadStream = createStream.pipe(bucket.openUploadStream(`${title}${fileFormat}`,
         {
            metadata:{
              name:title,
              bufferArray:"henry"
            }
         }
         ))
            const itemId = uploadStream.id;
            const filename = uploadStream.filename;
            const path = createStream.path.slice(8);

           const post = (await dbCreate).insertOne({
            name:title,
            Filename:filename,
             FileSize:file.size,
             Description:description,
             ImageLink:imageLink,
             path:path,
             id : itemId,
             ContentType:file.type,       
            })

             console.log(post)

        //  const Unlink = ()=>{
        //     const interval = setInterval(()=>{
        //       fs.unlink(`./public/uploads/${title}${fileFormat}`)
        //      .then((file)=>{
        //         console.log("file deleted succesfully")
        //       }).catch((error)=>{
        //         console.log('failed to delete')
        //        })
        //       },20)
        //        setTimeout(()=>{
        //         clearInterval(interval) 
        //        },80)
        //      }
    
        //  Unlink();
    
         return NextResponse.json({message:'sucess'},{status:200})
         
    }catch(error){
        return NextResponse.json({
            error:"error posting to db"
        },{status:501})
     }

}

// export const config = {
//     api: {
//       bodyParser: false,
//     }
// }


