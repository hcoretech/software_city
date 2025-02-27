'use server'

import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { jwtSecret } from "./constant";

interface UserJwtPayload {
    jti: string
    iat: number
  }
  
// const jwtSecret :string |undefined = process.env.my_SECRET 

// export  async function sessionClient (){
//     const session =  cookies().get('authSession');
//     try{
//         if (!session){
 
//             return null
//         }
   
//             return session ;

//     }catch(error){
//        throw error 
//     }
    

// }

export async function verifyAuth(req: NextRequest) {
  
    const token = req.cookies.get("authSession")?.value
  
    if (!token) throw new Error('Missing user token')
  
    try {
      const verified = await jwtVerify(
        token,
        new TextEncoder().encode(jwtSecret)
      )
      return verified.payload as UserJwtPayload
    } catch (err) {
      throw new Error('Your token has expired.')
    }
  }

// export function route(req:NextRequest,next){

// }
export async function uploadAuth(request:NextRequest,response:NextResponse){
  const userId = request.cookies.get('userId')?.value;
  if(!userId){
    throw new Error('no user token found');
  }
  return userId;

   
}

