'use server'
import { NextResponse,NextRequest } from "next/server";
import { User } from "../../../lib/userModel";
import { nanoid } from "nanoid";
import { SignJWT } from "jose";

import client from "../../../lib/mongodb";

export async function POST(request:NextRequest):Promise<NextResponse>{

    const body = await request.json();
    const {email,password} = body

    try{

        if(email.indexOf("@")== -1){
         throw "invalid email address ";
        }
      
        const db =  client.db('software_city');
        const user = db.collection('soundXusers');

        const finds = await user.findOne({
          'email':email,
          'password':password         
        })

          if(!finds){
            throw "no user found check info and try again";
            
          }
        
        const token = await new SignJWT({})
         .setProtectedHeader({ alg: 'HS256' })
          .setJti(nanoid())
          .setIssuedAt()
          .setExpirationTime('1day')
          .sign(new TextEncoder().encode(process.env.my_SECRET));

      
          return NextResponse.json(token,{status:200})  
          // return NextResponse.redirect('/Home',{status:200})       

    }
    catch(error){
        return NextResponse.json(error,{status:400})
     }
      
    }