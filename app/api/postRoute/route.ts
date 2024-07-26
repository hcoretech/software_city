'use server'
import { Post } from "../../../lib/postModel";
import { NextRequest, NextResponse } from "next/server";
import { GridFSBucket, Int32, ReadPreference, WriteConcern } from "mongodb";
import { GridFSFile } from "mongodb";
import fs from "node:fs/promises"
// const stream= require('node:stream/promises')
 import { MongoClient } from 'mongodb';
 import { createReadStream, unlink } from "node:fs";
import { Blob } from "node:buffer";
import { open } from "node:fs";
import { write } from "node:fs";
// import { setInterval } from "node:timers/promises";



// mongoose.createConnection(process.env.MONGODB_URL)

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
    readPreference:ReadPreference.secondary,
    // writeConcern:WriteConcern,
    // disableMD5:false
  }

)

 

// export async function files(filed){
// console.log(filed) 
// }
export async function POST(req:NextRequest){ 
//    const data = await upload.single('file')
//   dbConnection();
//    run().catch(error=>{
//     console.log(error)
//    })
    // const file = req.file
    // console.log(file)
    // const id = req.nextUrl.searchParams.get('file');
    
    // console.log(id)
   const form = await req.formData();

   const image = form.get('file') as File;
   const title=form.get('title');
   const buffer =await image.arrayBuffer()
   const New = new Uint8Array(buffer)
    
    try{    
         if(!image){
           return NextResponse.json({messsage:'no valid file'},{status:400})
         }
        //  await writeFile(`./public/${image.name}`,New)
    //      const bufer = await image.

    // // const run = async()=>{
    //      const data =  createWriteStream(image)
    //      data.on('read' ,()=>{
    //         console.log(image.read())
    //      })
    // const d=await fs.writeFile(`./public/${image.name}`,New,null)
    // console.log(d)
    // const title = form.get('title');
   
    // const text = await blob.text();
   await fs.writeFile(`./public/${image.name}`,New,null)

    createReadStream(`./public/${image.name}`)
    .pipe(bucket.openUploadStream(image.name,
        {
            metadata:{
                name:title,
                bufferArray:"henry"
            }
        }
    ))
    .closed
    const Unlink =()=>{
     const interval = setInterval(()=>{
            fs.unlink(`./public/${image.name}`)
            .then((file)=>{
                console.log("file deleted succesfully")
            }).catch((error)=>{
                console.log('failed to delete')
            })
     },100)
      setTimeout(()=>{
        clearInterval(interval) 
      },
      160
    )
    }
    
    Unlink();
    // const interVal = setInterval(()=>{
    //    fs.unlink(`./public/${image.name}`)
    //    .then((value)=>{
    //     console.log('file remove succesfully')
    //    }).catch((error)=>{
    //      throw error
    //    })
    // },500)

    // setTimeout(()=>{
    //   clearInterval(interVal)
    // },100)
    // .then(()=>{
    //    const filePath = await fs.open(`./public/${image.name}`)
    //  const write = createReadStream(filePath).pipe
    //     (bucket.openUploadStream(`./public/${image.name}`)).
    //     _final((error)=>{
    //      console.log (error)
    //     })
    //     return write;
    // }).catch((error)=>{
    //     throw error
    // })
    // const filePath = await fs.open(`./public/${image.name}`)
    // const writes = write(filePath,"12")
    // console.log(writes)
//   const streamFile =()=>{ 
    //   const Stream = filePath.createReadStream()
    //   .pipe(
    //     bucket.openUploadStream(Stream)
    //   )
    //   console.log(Stream)
// }    fs.
       
//    await streamFile ;
    //  const name = data
//   const location = fs.readlink(`./public/${image.name}`)
  
//   if(location){
//     const interval = setInterval(()=>{
//         fs.unlink(`./public/${image.name}`)
//         .then((start)=>{
//          console.log( start)
//          //    console.log("succes unlink")
//          //     console.log(start)
//         }).catch((error)=>{
//          throw error
//         })
//     },8000)
//     const clear =setTimeout(()=>{
//         clearInterval(interval)
//     }
//     ,
//     100
// )
   

// }else{

// }
    //   const data = createReadStream(buffer).
    //      pipe(bucket.openUploadStream(buffer,{
    //         contentType:'image/png' ,
    //         metadata:image,
       
        // fs.unlink(`./public/${image.name}`)

    //      }));
//   s
        // const fz = bucket.openUploadStream(file)
          
        //   const data = upload.single(file)
        //   if(!data){
        //     return NextResponse.json({
        //         message:'failed to input file'
        //     },{status:400})
        //   }
        //   console.log(data)
        //  bucket.openUploadStream( 'image',image))
        // // const da =  bucket.openDownloadStream(id:new ObjectId('669ef41c9098153f95a8d59e'))
        //  const find = bucket.find({
        //  })
         
        
        // console.log(GridFSFile)
        // then((data, err)=>{
        //     if(err){
        //         console.log(err);
        //     }
            //   console.log(fs)
        // })
       
            
        // console.log(fin);
        
         
        //  const insert = await Post.create({
        //     title,
        //     image
        //  })
        //  const response = await insert
        //  if(!response){
        //     return NextResponse.json({
        //         message:'failed'
        //     },{status:200})
        //  }
         return NextResponse.json({message:'sucess'},{status:200})
        //  const find =  bucket.find().toArray()
        //  console.log(find)
        // const value = await connect().find().toArray()
        // console.log(value)
 
        // return NextResponse.json({message:'succesful'},{status:200})
        //  upload.createReadStream()
        // bucket.createFileStream()
     
        //  upload.createReadStream()

        // const find = await bucket.find().toArray((err,files)=>{

        // if(!files || files.length === 0){
        //  NextResponse.json({files:false},{status:400})
        // }else{
        //     files.map(file =>{
        //         if(
        //             file.contentType === 'image/jpeg' ||
        //             file.contentType === 'image/png'
        //         ){
        //             file.isImage = true
        //         }else{
        //             file.isImage =false
        //         }
        //     });
        //     NextResponse.json({files:files},{status:200})
        // }
        // })
        // return find
//    const post = await Post.create({
//     title:title,
//     image:image.type
//       })
//       const response = post;
//     console.log(response)
        //  const create= Post.create({
        //     title:title,
        //  })
        //  const Response =  await create 
        //  if(Response){
        //     NextResponse.json({message:'success'},{status:200})
        //  }
         
    }catch(error){
        return NextResponse.json({
            message:"error posting to db"
        },{status:501})
    }

}

// export const config = {
//     api: {
//       bodyParser: false,
//     }
// }


