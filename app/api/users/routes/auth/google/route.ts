import { User } from "@/modules/users/userSchema";
import { OAuth2Client } from "google-auth-library";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import jwt from "jsonwebtoken";

const client = new OAuth2Client(
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
);

export async function POST(req: Request) {

  await connectDB();

  try {

    const { token } = await req.json();

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload?.email) {
      return NextResponse.json(
        {
          message: "Email não encontrado",
        },
        {
          status: 400,
        }
      );
    }

    const userData = {
      userName: payload.name,
      email: payload.email,
      provider: "google",
    };

    let user = await User.findOne({
      email: payload.email,
    });

    if (!user) {
      user = await User.create(userData);
    }

    const authToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.SECRET_TOKEN!,
      {
        expiresIn: "7d",
      }
    );

    const response = NextResponse.json({
      success: true,
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
      },
    });

    response.cookies.set("token", authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;

  } catch (error: any) {

    console.log(error);

    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}