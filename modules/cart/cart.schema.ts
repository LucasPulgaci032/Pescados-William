
import mongoose from "mongoose";
import { ICart } from "./cart.types";



const cartSchema = new mongoose.Schema<ICart>({
    user : {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
        
    },

      items: [
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


const Cart = mongoose.models.Cart || 
mongoose.model("Cart", cartSchema)

export default Cart