'use server'

import { User } from "../../../lib/userModel";
import { NextResponse } from "next/server";
// const {User} =require ('../../../lib/userModel.js')
// const jwt = require('jsonwebtoken');
// export const dynamic ='force-dynamic'
import client from "../../../lib/mongodb";


// const createToken = (_id) => {
//   return jwt.sign({_id}, process.env.my_SECRET, { expiresIn: '3m' })
// }

export async function POST(req:Request){   

        const body = await req.json()
        const {firstName,lastName,userName,email,password} = body
        const clients = client;
        const db = clients.db('software_city');
        const dbCreate = db.createCollection('users');

          
    try{       
      console.log('working with try')       
          const createAccount = (await dbCreate).insertOne({
            firstName,
            lastName,
            userName,
            email,
            password
          })
          console.log("working")
          const response = createAccount;
         
          if(!response){
               return NextResponse.json({message:'user creation failed'},{status:400})
          }
          return NextResponse.json({response},{status:200});
        }
      catch(error){
            return NextResponse.json({error:'Error in sign-up,check internet connection'},{status:400})
          }
        }