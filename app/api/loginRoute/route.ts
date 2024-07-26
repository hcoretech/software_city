import { NextResponse } from "next/server";
const jwt = require('jsonwebtoken');
import { User } from "../../../lib/userModel";
import { cookies } from "next/headers";
import dbConnection from "../../../lib/mongodb";

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.my_SECRET, { expiresIn: "1d" })
  }
  
export async function POST(req:Request){
    await dbConnection();

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
     const session = createToken(finds._id);

     cookies().set('authSession',session,{
        path:'/',
        httpOnly:true,
        sameSite:'strict',
        secure:true,
        
      })

      return NextResponse.json({message:'logged succesfull'},{status:200})        

    }catch(error){
        return NextResponse.json({Message:'error in connection '},{status:400})
    }

}