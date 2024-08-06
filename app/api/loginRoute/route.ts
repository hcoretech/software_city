import { NextResponse } from "next/server";
// const jwt = require('jsonwebtoken');
import { User } from "../../../lib/userModel";
import { cookies } from "next/headers";
// import dbConnection from "../../../lib/mongodb";
import { nanoid } from "nanoid";
import { SignJWT } from "jose";
// import { jwtCheck } from "../../../lib/constant";
import { jwtSecret } from "../../../lib/constant";
export const dynamic ='force-dynamic'
import client from "../../../lib/mongodb";

// const createToken = (_id) => {
//     return jwt.sign({_id}, process.env.my_SECRET, { expiresIn: "1d" })
//   }
  
export async function POST(req:Request){
    // await dbConnection();
    const clientd = client;
    const db =  clientd.db('software_city');
    const user = db.collection('users')
    const body = await req.json();
    const {email,password} = body

    try{
        const finds = await user.findOne({
          'email':email,
          'password':password         
        })

        if(!finds){
            return NextResponse.json({message:"no user found with such id try again"},
             {status:400}
            )
        }
        const token = await new SignJWT({})
         .setProtectedHeader({ alg: 'HS256' })
          .setJti(nanoid())
          .setIssuedAt()
          .setExpirationTime('2day')
          .sign(new TextEncoder().encode(jwtSecret))

         cookies().set('authSession', token, {
         httpOnly: true,
         sameSite:'strict',
         secure:true,
         maxAge: 60 * 60 * 24, // 2 hours in seconds
      })
          return NextResponse.json({message:'logged succesfull'},{status:200})            

    }
      catch(error){
        return NextResponse.json({error:'Error in sign-in,check internet connection'},{status:400})
     }

    }