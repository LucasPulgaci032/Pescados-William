import { NextRequest, NextResponse } from "next/server";


 function middlewareAuthToken(request : NextRequest){
   const token = request.cookies.get('token')

   if(!token){
    return NextResponse.redirect(new URL('/', request.url))
   }
   return NextResponse.next()
}

export function middleware(request : NextRequest){
    return middlewareAuthToken(request)
}