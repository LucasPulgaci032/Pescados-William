import { connectDB } from "@/lib/db";
import UserPurchaseService from "@/modules/purchases/userPurchase.service";

export async function GET(){
    await connectDB()

    try {
        const purchases = await UserPurchaseService.getPurchases()
        return Response.json({message : purchases}, {status: 200})
    }catch(error){
        return Response.json(
            {status : 500}
        )
    }
}

export async function POST(req: Request) {
  await connectDB();

  try {
    const body = await req.json();

    return Response.json(
      { message: "OK", data: body },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: "Erro no POST" },
      { status: 500 }
    );
  }
}