'use server'
import { NextResponse } from "next/server";

import { User } from "../../../lib/userModel";
import { cookies } from "next/headers";

import { nanoid } from "nanoid";
import { SignJWT } from "jose";

import client from "../../../lib/mongodb";

export async function POST(req:Request):Promise<NextResponse>{

    const clientd = client;
    const db =  clientd.db('software_city');
    const user = db.collection('users')
    const body = await req.json();
    const {email,password} = body

    try{

        if(email.indexOf("@")== -1){
         throw "invalid email address ";
        }
      
        const finds = await user.findOne({
          'email':email,
          'password':password         
        })

          if(!finds){
            throw "no user found check info and try again";
            
          }
       
        const id = finds._id.toString();
        
        const token = await new SignJWT({})
         .setProtectedHeader({ alg: 'HS256' })
          .setJti(nanoid())
          .setIssuedAt()
          .setExpirationTime('1day')
          .sign(new TextEncoder().encode(process.env.my_SECRET));

            (await cookies()).set('userId', id, {
            httpOnly: true,
           //  domain:"https://software_city.vercel.app",
            sameSite:'strict',
            secure:true,
            maxAge: 60 * 60 * 24, 
          });

          (await cookies()).set('authSession', token, {
         httpOnly: true,
        //  domain:"https://software_city.vercel.app",
         sameSite:'strict',
         secure:true,
         maxAge: 60 * 60 * 24, 
       });
      
          return NextResponse.json({message:'logged succesfull',status:200})  
          // return NextResponse.redirect('/Home',{status:200})       

    }
    catch(error){
        return NextResponse.json({message:error},{status:400})
     }
      
    }