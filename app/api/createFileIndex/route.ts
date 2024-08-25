 'use server'
 import { NextResponse } from "next/server";
 import fs from "node:fs/promises"

 export async function POST(req:Request){

   const form = await req.formData();
   const file = form.get('file') as File;
   const title=form.get('title') as string;
   const buf =  await file.arrayBuffer()
   const buffers = new Uint8Array(buf)

   if(!file || !title ){
    return NextResponse.json({messsage:'check all input '},{status:400})
  }
  try{
     const fileFormat = file.name.slice(-4)
     fs.writeFile(`./public/uploads/${title}${fileFormat}`,buffers)
     .then((data)=>{
       console.log(data)
     })
     .catch((err)=>{
      console.log(err)
     })
     return  NextResponse.json('file creation success',{
        status:200,
       
    })
  }
  catch(error){

    return NextResponse.json('filed to create file',{
        status:400,
        headers:{

        }
    })

  }

 }