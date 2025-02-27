'use server'

import { User } from "../../../lib/userModel";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
// const {User} =require ('../../../lib/userModel.js')
// const jwt = require('jsonwebtoken');
// export const dynamic ='force-dynamic'
import client from "../../../lib/mongodb";


// const createToken = (_id) => {
//   return jwt.sign({_id}, process.env.my_SECRET, { expiresIn: '3m' })
// }

export async function POST(req:NextRequest):Promise<NextResponse>{   

        const body = await req.json();
        const userData = await body;
        console.log(userData);
          

        

          
    try{  

        if(!userData){
          throw  "check input and try again";
        }
         const db = client.db('software_city');
         const dbCreate = await db.collection('users');

           console.log('working with try')       
          const createAccount = await dbCreate.insertOne({userData});
          console.log("working")
          const response = createAccount;
         
          if(!response){
            throw  "user creation failed";
              //  return NextResponse.json({message:'user creation failed'},{status:400})
          }
          return NextResponse.json({response},{status:200});
        }
      catch(err){
            return NextResponse.json({error:err},{status:400})
          }
        }