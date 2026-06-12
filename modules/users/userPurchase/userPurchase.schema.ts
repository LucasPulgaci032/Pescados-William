
import mongoose from "mongoose";
import { IUserPurchase } from "./userPurchase.types";



const userPurchaseSchema = new mongoose.Schema<IUserPurchase>({
    user : {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
        
    },

      purchases: [
      {
        fish: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Fish",
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
        },

        unit: {
          type: String,
          enum: ["UN","G", "KG", "BRL"],
          required: true,
        },
      },
    ],
},
    {
        timestamps : true
    }
  
)


const UserPurchase = mongoose.models.UserPurchase || 
mongoose.model("UserPurchase", userPurchaseSchema)

export default UserPurchase