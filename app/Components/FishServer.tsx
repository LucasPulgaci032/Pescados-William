import { connectDB } from "@/lib/db";
import FishService from "@/modules/users/fish/fish.services";
import Image from "next/image";

import ButtonPatchFishPrice from "./ButtonPatchFishPrice";
import UserPurchaseService from "@/modules/users/userPurchase/userPurchase.service";


interface Props  {
   role : string
}

export default async function FishServer({role} : Props) {
   await connectDB();

   const fishes = await FishService.getFishes();
   


   return (
      <div className="flex flex-wrap p-4 gap-6 m-auto">
         {fishes.map((fish: any) => (
            <div key={fish._id.toString()} className=" 
            rounded-lg flex-col border-2 border-white p-4 max-w-1/4">
               <Image
                  src={fish.fishPicture}
                  alt={fish.fishName}
                  width={300}
                  height={200}
                  className="w-full h-1/2 rounded-lg border border-gray-300"
                  
               />
               <h1>{fish.fishName}</h1>
               <h1>{
                new Intl.NumberFormat("pt-BR", {
                     style: "currency",
                     currency: "BRL",
                  }).format(fish.price)
                  }</h1>
                  {role === "admin" && (
                     <ButtonPatchFishPrice  fishName={fish.fishName}/>
                  )}
            </div>
         ))}
      </div>
   );
}