import { connectDB } from "@/lib/db"
import { ValidateUserDTO } from "@/modules/users/user.dto"
import UserService from "@/modules/users/user.services"
import { cookies } from "next/headers"

export async function POST(request : Request){
    await connectDB()
    try{
        const body : ValidateUserDTO = await request.json()

        const {token} = await UserService.loginUser(body)

        const cookieStore = await cookies()
        
           cookieStore.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60
        })
        
            return Response.json({success : true})

         
    }catch(error : any){
        return Response.json(
            {error : error.message},
            {status : error.status || 500}   
         )
    }
} 
