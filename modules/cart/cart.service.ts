import Cart from "./cart.schema";

type NormalizedItem = {
  quantity: number;
  unit: "KG";
};

function normalizeToKg(quantity: number, unit: string): NormalizedItem {
  const normalizedUnit = unit.toUpperCase().trim();

  switch (normalizedUnit) {
    case "KG":
      return {
        quantity,
        unit: "KG",
      };

    case "G":
      return {
        quantity: quantity / 1000,
        unit: "KG",
      };

    default:
      throw new Error(`Unidade inválida: ${unit}`);
  }
}

class CartService {
  static async getUserCart(userId: string) {
  const cart = await Cart.findOne({ user: userId }).populate(
    "items.fish",
    "fishName price"
  );

  if (!cart || cart.items.length === 0) {
    return [];
  }

  return cart.items
    .filter((item: any) => item.fish)
    .map((item: any) => ({
      _id: item._id.toString(),
      fishId: item.fish._id.toString(),
      fishName: item.fish.fishName,
      price: item.fish.price,
      quantity: item.quantity,
      unit: item.unit,
      cutMethod: item.cutMethod ?? "inteiro",
    }));
}

  static async addToCart(userId: string, product: any) {
    const normalized = normalizeToKg(product.quantity, product.unit);

    const cutMethod =
      (product.cutMethod ?? "").trim() || "inteiro";

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return Cart.create({
        user: userId,
        items: [
          {
            fish: product.fishId,
            quantity: normalized.quantity,
            unit: normalized.unit,
            cutMethod,
          },
        ],
      });
    }

    const existingItem = cart.items.find((item: any) => {
      const itemCutMethod =
        (item.cutMethod ?? "inteiro").trim();

      return (
        item.fish.toString() === product.fishId &&
        itemCutMethod === cutMethod
      );
    });

    if (existingItem) {
      existingItem.quantity += normalized.quantity;
      existingItem.unit = "KG";
    } else {
      cart.items.push({
        fish: product.fishId,
        quantity: normalized.quantity,
        unit: "KG",
        cutMethod,
      });
    }

    await cart.save();

    return cart;
  }

  static async deleteItem(userId: string, itemId: string) {
    return Cart.findOneAndUpdate(
      { user: userId },
      {
        $pull: {
          items: {
            _id: itemId,
          },
        },
      },
      { new: true }
    );
  }

  static async clearCart(userId: string) {
    return Cart.findOneAndUpdate(
      { user: userId },
      {
        $set: {
          items: [],
        },
      },
      { new: true }
    );
  }
}

export default CartService;