import {handleUpload,type HandleUploadBody } from "@vercel/blob/client"
import { NextRequest, NextResponse } from "next/server";
import { uploadAuth } from "../../../lib/serverAction";
import client from "../../../lib/mongodb";
import { blobToken } from "../../../lib/constant";
import { blob } from "stream/consumers";



export async function POST(request:NextRequest):Promise<NextResponse>{
    const body = (await request.json()) as HandleUploadBody;
    const db = client.db('software_city');
    const collection = await db.collection('postFiles');
    // const createCollection = await db.createCollection('postFiles');
    try{
     const jsonResponse = await handleUpload(
        {   
            token:blobToken,
            body,
            request,
            onBeforeGenerateToken:async(pathname:string,clientPayload:string)=>{
                console.log(pathname);
                const payload = clientPayload
                
                //  try{
                    if(!clientPayload){
                        throw new Error('no payload attach')
                    }
                    // const payload = clientPayload;

                    // const userId = await uploadAuth(request);
                    // if(!userId){
                    //     throw new Error  ('no user with such Id')
                    // }
                    console.log("start");
                    // return {
                    //    allowedContentTypes:['image/png']
                    // }
                    //     // validUntil:16000,
                        // cacheControlMaxAge:1,
                        
                    
              
                // return {
                  
                // }
                return {
                    allowedContentTypes:[
                        'text/plain','text/csv','text/html',
                        'image/png','image/svg',
                        'application/zip',
                        'image/jpeg','image/gif','image/svg+xml','image/webp',
                        'video/mp4','video/mkv','video/avi',
                        'audio/mp3'],
                        // validUntil:60*60*2,
                        // cacheControlMaxAge:1,
                        tokenPayload:clientPayload
                    // allowedContentTypes:'image/png'
                  }
                
                //    validUntil:1600
                    // cacheControlMaxAge:1,
                    // validUntil:60 * 5 ,
                    // allowedContentTypes:[
                    // 'text/plain','text/csv','text/html',
                    // 'image/png','image/svg',
                    // 'image/jpeg','image/gif','image/svg+xml','image/webp',
                    // 'video/mp4','video/mkv','video/avi',
                    // 'audio/mp3']
                    // tokenPayload:JSON.stringify({
                    //   clientPayload
                    // })
                
            
            // }
            // catch(error){
            //     throw new Error('failed generateUploadToken')
            // }
             
         },
         onUploadCompleted:async({blob,tokenPayload})=>{
             try{
                 if(!blob){
                    throw new Error('no blob found')
                 }
                //  const userId = await uploadAuth(request);
                const userId = request.cookies.get('userld')?.value;
                 if(!userId){
                    throw new Error('no user with such id');
                 }
                //  if(!collection){

                //        await db.createCollection('postFile')                 
                //       }

                      const upload = await collection.insertOne({
                            userid:userId,
                            title:tokenPayload,
                            pathname:blob.pathname,
                            downloadUrl:blob.downloadUrl,
                            url:blob.url,
                            contentType:blob.contentType
                        }) 
                        // return {
                        //     upload
                        // }

             }
             catch(error){
                throw new Error('failed to upload file to mongodb')
             }

         }
            // onUploadCompleted:async({blob,tokenPayload}
    
            // )=>
            // {
            //     try{
            //       

            //     

                //   
                // const response = await upload;
                // return new NextResponse(response)
                  
                // }
                // catch(error){
                //     throw new Error('failed to upload to db')
                // }
              
            // }
            
 
      }
    )
    // console.log(handleUpload)
       return NextResponse.json(jsonResponse,{status:200});
    }
    catch(error){
        return NextResponse.json(
            {error:(error as Error).message},
            {status:400},
        )
    }

}