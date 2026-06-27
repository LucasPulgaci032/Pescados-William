import { connectDB } from "@/lib/db";
import FishService from "@/modules/fish/fish.services";
import Image from "next/image";

import ButtonPatchFishPrice from "../ui/ButtonPatchFishPrice";
import ButtonAddToCart from "./ButtonAddToCart";




interface Props  {
   role : string
}

export default async function FishServer({role} : Props) {
   await connectDB();

   const fishes = await FishService.getFishes();
   


   return (
     <div className="flex flex-wrap justify-center gap-6 p-4">
  {fishes.map((fish: any) => (
    <div
      key={fish._id.toString()}
      className="
        w-80
        min-h-[450px]
        rounded-lg
        border-2
        border-white
        p-4
        flex
        flex-col
      "
    >
      <Image
        src={fish.fishPicture}
        alt={fish.fishName}
        width={300}
        height={200}
        className="
          w-full
          h-56
          object-cover
          rounded-lg
          border
          border-gray-300
        "
      />

      <h1 className="mt-4 text-xl font-semibold">
        {fish.fishName}
      </h1>

      <h1 className="mt-2">
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(fish.price)}
      </h1>

      <div className="mt-auto flex flex-col gap-2 pt-4">
        <ButtonAddToCart fishName={fish.fishName} fishId={fish._id.toString()} />

        {role === "admin" && (
          <ButtonPatchFishPrice fishName={fish.fishName} />
        )}
      </div>
    </div>
  ))}
</div>
   );
}