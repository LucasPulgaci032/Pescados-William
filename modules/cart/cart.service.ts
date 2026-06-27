import Cart from "./cart.schema";

type NormalizedItem = {
  quantity: number;
  unit: "KG";
};

function normalizeToKg(quantity: number, unit: string): NormalizedItem {
  const normalizedUnit = unit.toUpperCase().trim();

  if (normalizedUnit === "KG") return { quantity, unit: "KG" };
  if (normalizedUnit === "G") return { quantity: quantity / 1000, unit: "KG" };

  throw new Error(`Unidade inválida: ${unit}`);
}

class CartService {
  static async getUserCart(userId: string) {
    const cart = await Cart.findOne({ user: userId }).populate(
      "items.fish",
      "fishName price"
    );

    if (!cart?.items?.length) return [];

    return cart.items.map((item: any) => ({
      _id: item._id.toString(),
      fishId: item.fish._id.toString(),
      fishName: item.fish.fishName,
      price: item.fish.price,
      quantity: item.quantity,
      unit: item.unit,
    }));
  }

  static async addToCart(userId: string, product: any) {
    const normalized = normalizeToKg(product.quantity, product.unit);

    let cart = await Cart.findOne({ user: userId });

    // 🔥 SEMPRE garantir user no create
    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [
          {
            fish: product.fishId,
            quantity: normalized.quantity,
            unit: normalized.unit,
          },
        ],
      });

      return cart;
    }

    const index = cart.items.findIndex(
      (i: any) => i.fish.toString() === product.fishId
    );

    if (index >= 0) {
      cart.items[index].quantity += normalized.quantity;
      cart.items[index].unit = "KG";
    } else {
      cart.items.push({
        fish: product.fishId,
        quantity: normalized.quantity,
        unit: "KG",
      });
    }

    return cart.save();
  }

  static async deleteItem(userId: string, fishId: string) {
    return Cart.findOneAndUpdate(
      { user: userId },
      { $pull: { items: { fish: fishId } } },
      { new: true }
    );
  }

  static async clearCart(userId: string) {
  return Cart.findOneAndUpdate(
    { user: userId },
    { $set: { items: [] } },
    { new: true }
  );
}
}

export default CartService;