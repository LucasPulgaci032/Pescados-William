import Cart from "../cart/cart.schema";
import UserPurchase from "./userPurchaseSchema";

type CreateOrderDTO = {
  method: "ENTREGA" | "RETIRADA";
  address?: {
    street: string;
    number: string;
    city: string;
    zipCode: string;
  };
};

class UserPurchaseService {

   static async getPurchases(){
     return UserPurchase.find({})
   }

  static async createOrder(userId: string, data: CreateOrderDTO) {
    const cart = await Cart.findOne({ user: userId }).populate(
      "items.fish",
      "fishName price"
    );

    if (!cart || cart.items.length === 0) {
      throw new Error("Carrinho vazio");
    }

    // regra de negócio
    if (data.method === "ENTREGA" && !data.address) {
      throw new Error("Endereço obrigatório para entrega");
    }

    const items = cart.items.map((item: any) => {
      const unitPrice = item.fish.price;

      return {
        fishId: item.fish._id,
        fishName: item.fish.fishName,
        unitPrice,
        quantity: item.quantity,
        unit: item.unit,
        subtotal: unitPrice * item.quantity,
      };
    });

    const totalPrice = items.reduce(
      (acc: number, item: any) => acc + item.subtotal,
      0
    );

    const order = await UserPurchase.create({
      user: userId,
      items,
      totalPrice,
      status: "pending",
      method: data.method,
      address: data.address || null,
    });

    // limpa carrinho
    await Cart.findOneAndUpdate(
      { user: userId },
      { $set: { items: [] } }
    );

    return order;
  }
}

export default UserPurchaseService;