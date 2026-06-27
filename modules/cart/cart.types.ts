import mongoose from "mongoose";

//services
 export interface CartDTO {
    fishId: string;
    quantity: number;
    unit: "UN" | "G" | "KG";
}



//Schema
interface IPurchaseItem {
    fish: mongoose.Types.ObjectId;
    quantity: number;
    unit: "KG" | "UN" | "BRL";
}


export interface ICart {
    user: mongoose.Types.ObjectId,
    items : IPurchaseItem[]
}
