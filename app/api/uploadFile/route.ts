import {handleUpload,type HandleUploadBody } from "@vercel/blob/client"
import { NextRequest, NextResponse } from "next/server";
import { uploadAuth } from "../../../lib/serverAction";
import client from "../../../lib/mongodb";
import { blobToken } from "../../../lib/constant";



export async function POST(request:NextRequest):Promise<NextResponse>{
    const body = (await request.json()) as HandleUploadBody;
    const db = client.db('software_city');
    const collection = db.collection('postFile');
    const createCollection = db.createCollection('postFile');
    try{
    const jsonResponse = handleUpload(
        {   
            token:blobToken,
            body,
            request,
            onBeforeGenerateToken:async(pathname)=>{
                 try{
                    const userId =await uploadAuth(request);
                    if(!userId){
                        throw new Error  ('no user with such Id')
                    }

                return{
                    cacheControlMaxAge:1,
                    allowedContentTypes:[
                    'text/plain','text/csv','text/html',
                    'image/png','image/svg',
                    'image/jpeg','image/gif','image/svg+xml','image/webp',
                    'video/mp4','video/mkv','video/avi',
                    'audio/mp3'],
                    // tokenPayload:JSON.stringify({
                    //   clientPayload
                    // })
                }
            }
            catch(error){
                throw new Error ('failed generateUploadToken')
            }

            },
            onUploadCompleted:async({blob}
    
            )=>
            {
                try{
                  const userId = await uploadAuth(request);

                  if(!collection){

                   await db.createCollection('postFile')                 
                  }

                  const upload = await collection.insertOne({
                    userid:userId,
                    pathname:blob.pathname,
                    downloadUrl:blob.downloadUrl,
                    url:blob.url,
                    contentType:blob.contentType
                }) 
                // const response = await upload;
                // return new NextResponse(response)
                  
                }
                catch(error){
                    throw new Error('failed to upload to db')
                }
              
            }
        }
    )

    return NextResponse.json(jsonResponse);
    }
    catch(error){
        return NextResponse.json(
            {error:(error as Error).message},
            {status:400},
        )
    }

}