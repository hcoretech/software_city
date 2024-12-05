import { NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose";

export async function GET(request: NextRequest):Promise<NextResponse> {
  
    const token = request.nextUrl.searchParams.get("token");
  
    try {
          
    if (!token) throw false;

      const verified = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.my_SECRET)
      )
     if(!verified){
      return NextResponse.json(false,{status:400})
     }
     return NextResponse.json(true,{status:200})
    } catch (err) {
        return NextResponse.json(err,{status:400})
    //   throw new Error('Your token has expired.')
    }
  }