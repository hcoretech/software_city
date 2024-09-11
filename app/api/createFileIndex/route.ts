//  'use server'
 import { NextResponse } from "next/server";
//  import fs from "node:fs/promises"
//  import { put } from "@vercel/blob";
 import {HandleUploadOptions, handleUpload, type HandleUploadBody  } from "@vercel/blob/client";
import { request } from "http";
// import path from "path";
// import { useSearchParams } from "next/navigation";

// const tokens = process.env.BLOB_READ_WRITE_TOKEN

 export async function POST(request:Request){

   const form = await request.json();
   console.log(form)
try{
   return NextResponse.json('succes')
      
   }

  catch(error){

    return NextResponse.json('filed to create file',{
        status:400,
        headers:{

        }
    })

  }

 }