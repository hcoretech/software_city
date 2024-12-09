import { NextRequest, NextResponse } from "next/server";
import client from "../../../lib/mongodb";
import { SignupModel } from "../../../lib/signup";


export  async function POST(request:NextRequest):Promise<NextResponse>{

    const body = await request.json();
    const userData = await body;
    try {
        if(userData == null){
            throw "no data found in the request body";
        }
        if(userData?.email?.indexOf("@")== -1){
             throw "invalid email try another email";
        }
        if(userData?.password?.length < 4){
            throw "password to short";
       }
       
        
        const db = client.db('software_city');
        const dbCreate =  db.collection('soundXusers');

          console.log('working with try') ;      
         const createAccount = await dbCreate.insertOne(userData);
         console.log("working")
         const response = createAccount;
        
         if(!response){
           throw  "user creation failed";
         }
         return NextResponse.json(response,{status:200});

        
    } catch (error) {
       return NextResponse.json(error,{status:400});
    }

}