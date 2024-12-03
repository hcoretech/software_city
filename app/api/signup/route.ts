import { NextRequest, NextResponse } from "next/server";
import client from "../../../lib/mongodb";


export  async function POST(request:NextRequest){

    const body = await request.json();
    const userData = await body;
    try {
        if(!userData){
            throw "no data found in the request body";
        }
        const db = client.db('software_city');
        const dbCreate =  db.collection('soundXusers');

          console.log('working with try') ;      
         const createAccount = await dbCreate.insertOne({userData});
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