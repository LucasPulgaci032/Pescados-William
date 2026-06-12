import jwt from "jsonwebtoken"
import { User } from "@/modules/users/userSchema"
import { cookies } from "next/headers"


export async function GET() {
  const cookieStore = await cookies()

  const token = cookieStore.get("token")?.value

  if (!token) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.SECRET_TOKEN as string
    ) as any

    const user = await User.findById(decodedToken.id)

    if (!user) {
      return Response.json(
        { error: "User not found" },
        { status: 404 }
      )
    }
  
    return Response.json({
      userName: user.userName,
      email: user.email,
      role: user.role
    })

  } catch (error) {
    return Response.json(
      { error: "invalid token" },
      { status: 401 }
    )
  }
}