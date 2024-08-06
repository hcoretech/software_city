import { NextResponse } from "next/server";
// const jwt = require('jsonwebtoken');
import { User } from "../../../lib/userModel";
import { cookies } from "next/headers";
import dbConnection from "../../../lib/mongodb";
import { nanoid } from "nanoid";
import { SignJWT } from "jose";
import { jwtCheck } from "../../../lib/constant";

// const createToken = (_id) => {
//     return jwt.sign({_id}, process.env.my_SECRET, { expiresIn: "1d" })
//   }
dbConnection();
export async function POST(req:Request,res:NextResponse){
 

    const body = await req.json();
    const {email,password} = body

    try{
        const finds = await User.findOne({
          'email':email,
          'password':password         
        }).sort({createdAt: -1})

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
          .sign(new TextEncoder().encode(jwtCheck()))

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