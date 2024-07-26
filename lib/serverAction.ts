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
            //  throw error ('no session found')
            //  redirect('/sign-in')
            // NextResponse.json({
            //     message:'no cookies found',
            // },{status:400})
            // }
            // NextResponse.json({
            //     // message:''
            //     session
            // },{status:200})
            // console.log(session) ;
            return session ;

    }catch(error){
       throw error 
    }
    

}


