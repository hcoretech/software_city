import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export default async function POST(request:Request){
  const file =  request.body || '';
  const Contentype = request.headers.get('content-type') || 'text/plain'
  try{
  const blob = await put('projectS',file,{
    access:'public',
    contentType:Contentype
  });

  return NextResponse.json(blob)
}
catch(error){
 throw new Error("failed to writeFile")
}
}