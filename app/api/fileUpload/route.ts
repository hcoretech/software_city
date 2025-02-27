'use server'
import { put } from "@vercel/blob";
import { createReadStream } from "fs";
// import { useSearchParams } from "next/navigation";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
  const file =  request.body || '';
  const params = request.nextUrl.searchParams
  const id = params.get('id');
  const Contentype = request.headers.get('content-type') || 'text/plain';
  try{
    console.log('start')
    console.log(file)
    // createReadStream(file)
  const blob = await put(id,file,{
    access:'public',  
    contentType:Contentype
  });

console.log(blob)
  return NextResponse.json(blob)

}
catch(error){
 return NextResponse.json("failed to writeFile");
}
}