import { connectDB } from "@/lib/db"
import UserService from "@/modules/users/user.services"
import { cookies } from "next/headers"

    

export async function GET(){
    await connectDB()
    const users = await UserService.getUser()
    return Response.json(users, {status: 200})
}

export async function POST(request : Request){
    await connectDB()
    try{
   
    const body = await request.json()
    const {token} =  await UserService.postUser(body)
    const cookieStore = await cookies()

    cookieStore.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
        maxAge: 60 * 60
    })

    return Response.json({success : true}, {status : 201})
    }
    catch(error : any){
        return Response.json(
            {message: error.message},
            {status : error.status || 500}
        )
    } 
}

export async function DELETE(){
    await connectDB()
    try{
        await UserService.deleteDB()
        return Response.json({message: "collection deleted"},{status : 200})
    }catch(error : any){
        return Response.json(
             {message: error.message},
             {status : error.status || 500}
        )
    }
}





