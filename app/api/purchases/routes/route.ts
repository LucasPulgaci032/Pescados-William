import { connectDB } from "@/lib/db";
import UserPurchaseService from "@/modules/users/userPurchase/userPurchase.service";
import jwt from 'jsonwebtoken'
import { cookies } from "next/headers";

interface JwtUserPayload extends jwt.JwtPayload {
    userId: string;
    role?: string;
}


export async function POST(req: Request){
    await connectDB()

    const token = (await cookies()).get("token")?.value

    const secret = process.env.SECRET_TOKEN;

    if (!secret) {
        throw new Error("SECRET_TOKEN não definida");
    }
    const payload = jwt.verify(token!,secret) as JwtUserPayload

    const body = await req.json();

    await UserPurchaseService.createOrder(
    payload.userId,
    body
);
}