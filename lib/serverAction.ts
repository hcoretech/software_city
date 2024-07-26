'use server'
import { error } from "console";
import { cookies } from "next/headers"
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";


export default async function sessionClient (){
    const session =  cookies().get('authSession');
    try{
        if (!session){

            return null
        }
   
            return session ;

    }catch(error){
       throw error 
    }
    

}


