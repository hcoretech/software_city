'use server'
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
const jwt = require('jsonwebtoken');

export async function GET(req:Request){
const session = cookies().get('authSession');
try{
    if(!session){
        return NextResponse.json({
            message:"no session found"
        },{status:400})
    }
    const verifyToken = jwt.verify(session.value,process.env.my_SECRET);
    if(!verifyToken){
        return NextResponse.json({
            message:"session expired"
        },{status:501})
    //  return NextResponse.redirect('/sign-in')
    }
    return NextResponse.json({verifyToken},{status:200})

}catch(error){
    return NextResponse.json({
        message:"error communication with server"
    },{status:501})
}

}