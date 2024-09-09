'use server'
import { put } from "@vercel/blob";
import { createReadStream } from "fs";
import { useSearchParams } from "next/navigation";
import { NextResponse } from "next/server";

export async function POST(request:Request){
  const file =  request.body || '';
  const params = useSearchParams();
  const id = params.get('id');
  const Contentype = request.headers.get('Content-type') || 'text/plain'
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