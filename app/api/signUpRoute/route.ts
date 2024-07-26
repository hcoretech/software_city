'use server'
import  {type NextApiRequest,NextApiResponse } from "next";
import dbConnection from "../../../lib/mongodb";
import { User } from "../../../lib/userModel";
import { NextResponse } from "next/server";
// const jwt = require('jsonwebtoken');


// const createToken = (_id) => {
//   return jwt.sign({_id}, process.env.my_SECRET, { expiresIn: '3m' })
// }

export async function POST(req:Request){
  
         await  dbConnection();        
         const body = await req.json()
          const {firstName,lastName,userName,email,password} = body
          
    try{              
          const createAccount = await User.create({
            firstName,
            lastName,
            userName,
            email,
            password
          })
          const response = createAccount;
          if(!response){
               return NextResponse.json({message:'user creation failed'},{status:400})
          }
          return NextResponse.json({response},{status:200});
        }

     catch(error){
            return NextResponse.json({Message:'error connecting to db'},{status:400})
          }
        }