import mongoose from "mongoose";

export interface IUserPurchaseItem {
  fishId: mongoose.Types.ObjectId;
  fishName: string;
  unitPrice: number;
  quantity: number;
  unit: "KG" | "UN";
  subtotal: number;
}

export interface IUserPurchase {
  user: mongoose.Types.ObjectId;
  items: IUserPurchaseItem[];
  totalPrice: number;
  status: "pending" | "paid" | "shipped" | "cancelled";
  method: "ENTREGA" | "RETIRADA";
  address?: {
    street: string;
    number: string;
    city: string;
    zipCode: string;
  };
}

const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  number: { type: String, required: true },
  city: { type: String, required: true },
  zipCode: { type: String, required: true },
});


const userPurchaseSchema = new mongoose.Schema<IUserPurchase>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        fishId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Fish",
          required: true,
        },

        fishName: {
          type: String,
          required: true,
        },

        unitPrice: {
          type: Number,
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
        },

        unit: {
          type: String,
          enum: ["KG", "UN"],
          required: true,
        },

        subtotal: {
          type: Number,
          required: true,
        },
      },
    ],

    totalPrice: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "cancelled"],
      default: "pending",
    },

    method: {
      type: String,
      enum: ["ENTREGA", "RETIRADA"],
      required: true,
    },

    address: {
      type: addressSchema,
      required: function () {
        return this.method === "ENTREGA"
    },
  }
},
  {
    timestamps: true,
  }
);

const UserPurchase =
  mongoose.models.UserPurchase ||
  mongoose.model("UserPurchase", userPurchaseSchema);

export default UserPurchase;