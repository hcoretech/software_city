'use server'

import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "./lib/serverAction";


export default async function middleware(req:NextRequest,){
   
    // const pathname = req.nextUrl.pathname.startsWith('/')
    // if(pathname){
    //   return NextResponse.redirect(new URL('/Home',req.url))
    // }
    
    const verifiedToken = await verifyAuth(req).catch((err) => {
        console.log(err.message)
      })
    
      if (!verifiedToken) {
        // if this an API request, respond with JSON
        // if (req.nextUrl.pathname.startsWith('/api/')) {
        //   return new NextResponse(
        //     JSON.stringify({ 'error': { message: 'authentication required' } }),
        //     { status: 401 });
        // }
        return NextResponse.redirect(new URL('/sign-in', req.url))
      }
    //  return NextResponse.redirect(new URL('/Home',req.url));
        // otherwise, redirect to the set token page
        // else {
        //   return NextResponse.rewrite(new URL('/Home',req.url))
        // }
    
//   const session = cookies().get('authSession');
//   console.log(session)
//   try{
//     if(!session){
//         return NextResponse.redirect(new URL('/sign-up', req.url))
//     }
//   const verify = jwt.verify(session.value,process.env.my_SECRET,async(error,valid)=>{
//     if(error){
//         console.log('sign up')
//         // return NextResponse.redirect(new URL('/sign-in',req.url))
//     }
//     else{
//         console.log('sign up')
//         // return NextResponse.redirect(new URL('/sign-in',req.url))
//     }
//   })
//    return verify


}

export const config = {
    matcher: ['/Home/:path*', '/downloads/:path*',]
  }