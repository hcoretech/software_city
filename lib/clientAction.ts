"use server"

import { existsSync,statSync} from "fs"
import client from "./mongodb";
import { GridFSBucket } from "mongodb";
import { MongoClient } from 'mongodb';
import { ReadPreference } from "mongodb";
import { createWriteStream } from "fs";

const clients = new MongoClient(process.env.MONGODB_URL);
const db = clients.db()

const GridFSBucketOptions = {

    bucketName:'upload',
    chunkSizeBytes : 1024*1024,
    readPreference:ReadPreference.secondary
 }
const bucket = new GridFSBucket(db, GridFSBucketOptions)


export const getFile = async(formData:FormData)=>{
    const clientd = client;
    const db = clientd.db();
    const post = await db.collection('posts')

    const name = formData.get('search') as String;
    console.log(name)
    // const name = form.get('search') as String ;
    // console.log(name);

 try{
     const findUser = await post.findOne({
          name
       })
     if(!findUser){
        const response = {
            message:"no app with such name try different name",
            status:500
        }
        return response;
       }
      
      const bucketFilename =  findUser.Filename

      const cursor = bucket.find({
          filename:bucketFilename
       })

      const array = await cursor.toArray()
      const uploadFilename = array[0].filename
 
      console.log("log")
 
      const res = findUser
      const downloadLink = findUser.path
    //   const check = existsSync(`./public/uploads/${uploadFilename}`)
  
    //  if(check){
    //     const response = {
    //         res,
    //         status:200
    //     }
    //     return response;
    //   }
     const openDownload = bucket.openDownloadStreamByName(uploadFilename)
     .on('data',(data)=>{
        // console.log(data)
        return data
     })
     const response = await openDownload 
     console.log(response);   //   const interval = ()=>{
        
    //     let chunck =[];
    //   openDownload.on('data',(data)=>{
    //      chunck.push(data)
    //   }).pipe(createWriteStream(`./public/uploads/${uploadFilename}`,"utf8"))
    //   .on('finish',()=>{
    //     fs.link("./public" + `${downloadLink}`,`/search ${downloadLink}`)
    //     .then(()=>{
    //       console.log("running")
    //     }).catch((error)=>{
    //       console.log('rejected')
    //     })
    //   })
    //   openDownload.on('error',()=>{
    //     process.exit(0)
    //   })
    //   }
    //   setTimeout(interval,30);
      
   
      // openDownload.on('finish',()=>{
        // chunck.push(chuncks)
      //   console.log(chunck)
      //   console.log("finished")
          
      // })
      // console.log(chunck)
      // const option = openDownload._construct((error)=>{
      //  console.log(error)
      // })

      //  let stream ;
      //  const writeStream = openDownload.pipe(createWriteStream(`./public/images/${uploadFilename}`)
      // )

    //    return NextResponse.json({response},{status:200})  
 
    }
    catch(error){
      throw error
    
    }
}
export const downloadFile = async (DownloaData:fileDownload)=>{
    // console.log(DownloaData)
   
   const fileExit  = existsSync(`./public${DownloaData.fileLink}`) ;
    try{

      if (!fileExit){
         const response = {
            status:300,
            message:"no file found"
        }
        return response
      }
      
        const readFile = statSync(`./public${DownloaData.fileLink}`);
        const checkSize = readFile.size;
        console.log(checkSize);

        // for(let i=0 ; i <=checkSize;i++){
            if(checkSize !== DownloaData.filezie){

                const response = {
                   status: "pending",

                }
                return response;
            }else{
                // return "downloading"
            const response = {
                    status:"downloading",
                    Link:DownloaData.fileLink
                }
                return response;
            }

  
    }
    catch(error)
    {
      const response = {
       status:400,
       message: "file not found try again"
      }
      return response

    }
}