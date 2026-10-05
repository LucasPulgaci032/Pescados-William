import Cart from "../cart/cart.schema";
import { User } from "../users/userSchema";
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
  static async getPurchaseById(id : string) {
    return UserPurchase.findOne({_id : id});
  }

  static async createOrder(userId: string, data: CreateOrderDTO) {
    // Busca usuário
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    // Busca carrinho
    const cart = await Cart.findOne({ user: userId }).populate(
      "items.fish",
      "fishName price"
    );

    if (!cart || cart.items.length === 0) {
      throw new Error("Carrinho vazio");
    }

    // Validação de entrega
    if (data.method === "ENTREGA" && !data.address) {
      throw new Error("Endereço obrigatório para entrega");
    }

    // Monta os itens do pedido
    const items = cart.items.map((item: any) => {
      const unitPrice = item.fish.price;

      return {
        fishId: item.fish._id,
        fishName: item.fish.fishName,
        unitPrice,
        quantity: item.quantity,
        unit: item.unit,
        cutMethod: item.cutMethod,
        subtotal: unitPrice * item.quantity,
      };
    });

    // Calcula valor total
    const totalPrice = items.reduce(
      (acc: number, item: any) => acc + item.subtotal,
      0
    );

    // Cria pedido
    const order = await UserPurchase.create({
      user: userId,
      items,
      totalPrice,
      status: "pending",
      method: data.method,
      address: data.address ?? null,
    });

    // Limpa o carrinho
    await Cart.findOneAndUpdate(
      { user: userId },
      { $set: { items: [] } }
    );

    // Dispara webhook para o n8n
    try {
      await fetch("http://localhost:5678/webhook/mensageria-pedido", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: order._id,
          userId: user._id,
          userName: user.userName,
          userEmail: user.email,
          method: order.method,
          status: order.status,
          totalPrice: order.totalPrice,
          address: order.address,
          createdAt: order.createdAt,
          items: order.items,
        }),
      });

      console.log("Webhook do pedido enviado com sucesso.");
    } catch (error) {
      console.error("Erro ao enviar webhook:", error);
    }

    return order;
  }
}

export default UserPurchaseService;