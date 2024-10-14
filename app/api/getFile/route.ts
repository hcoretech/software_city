'use server'
import { NextRequest,NextResponse } from "next/server";
import { Post } from "../../../lib/postModel";
import client from "../../../lib/mongodb";



  
 
export async function GET(req:NextRequest):Promise<NextResponse>{
    
    const searchParams = req.nextUrl
    const db = client.db();
    // const db = clientd.db();
    const post = db.collection('postFiles');
    const title = searchParams.searchParams.get('search')
   

 try{
     const findUser = await post.findOne({
          title
       })
     if(!findUser){
        return NextResponse.json({message:"no app with such name try different name"},
        {status:400})
      }
     
 
       const response = findUser
       console.log(response)
       return NextResponse.json({response},{status:200})  
 
    }
    catch(error){
      return NextResponse.json({message:"error from the server check internet connection"},{status:400});
    
    }
}