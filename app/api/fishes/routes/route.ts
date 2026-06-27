import FishService, { uploadFishImage } from "@/modules/fish/fish.services"
import { connectDB } from "@/lib/db"

export async function GET(){
     await connectDB()
    const allFishes = await FishService.getFishes()
     return Response.json(allFishes, {status: 200})
}

export async function POST(req: Request){
    await connectDB()
    const formData = await req.formData()

    const fishName = formData.get("fishName") as string
    const file = formData.get("fishPicture") as File
    const price = Number(formData.get("price")) as number

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const uploadResult : any = await uploadFishImage(buffer)

    const fish = await FishService.createFish({
        fishName,
        fishPicture : uploadResult.secure_url,
        price
    })

    return Response.json(fish,{status: 201})
}

export async function PATCH(req: Request) {
    const { searchParams } = new URL(req.url);

    const fishName = searchParams.get("fishName");

    if (!fishName) {
        return Response.json(
            { error: "Nome não informado" },
            { status: 400 }
        );
    }

    const body = await req.json();
      console.log("price recebido:", body.price);
    await FishService.patchFish(
        fishName,
        body.price
    );

    return Response.json({ success: true });
}
