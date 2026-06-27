import { connectDB } from "@/lib/db";
import CartService from "@/modules/cart/cart.service";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

interface JwtUserPayload extends jwt.JwtPayload {
  id: string;
  email?: string;
}

async function getToken() {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value;
}

function verifyToken(token: string) {
  const secret = process.env.SECRET_TOKEN;

  if (!secret) throw new Error("SECRET_TOKEN não definida");

  return jwt.verify(token, secret) as JwtUserPayload;
}

/* ================= GET ================= */
export async function GET() {
  try {
    await connectDB();

    const token =  await getToken();
    if (!token) return Response.json({ items: [] });

    const payload = verifyToken(token);

    const items = await CartService.getUserCart(payload.id);

    return Response.json({ items });
  } catch (err) {
    console.error("GET CART ERROR:", err);
    return Response.json({ items: [] }, { status: 500 });
  }
}

/* ================= PATCH ================= */
export async function PATCH(req: Request) {
  try {
    await connectDB();

    const token =  await getToken();
    if (!token) {
      return Response.json({ message: "Não autorizado" }, { status: 401 });
    }

    const payload = verifyToken(token);
    const body = await req.json();

    if (!body.fishId || !body.quantity || !body.unit) {
      return Response.json({ message: "Payload inválido" }, { status: 400 });
    }

    await CartService.addToCart(payload.id, body);

    return Response.json({ message: "OK" });
  } catch (err) {
    console.error("PATCH CART ERROR:", err);

    return Response.json(
      { message: "Erro interno" },
      { status: 500 }
    );
  }
}

/* ================= DELETE ================= */
export async function DELETE(req: Request) {
  try {
    await connectDB();

    const token = (await cookies()).get("token")?.value;

    if (!token) {
      return Response.json({ message: "Não autorizado" }, { status: 401 });
    }

    const payload = verifyToken(token);
    const body = await req.json();

    // 🔥 NOVO: limpar carrinho inteiro
    if (body.mode === "clear") {
      await CartService.clearCart(payload.id);

      return Response.json(
        { message: "Carrinho limpo" },
        { status: 200 }
      );
    }

    // remover item específico
    if (!body.fishId) {
      return Response.json(
        { message: "fishId é obrigatório" },
        { status: 400 }
      );
    }

    await CartService.deleteItem(payload.id, body.fishId);

    return Response.json(
      { message: "Item removido do carrinho" },
      { status: 200 }
    );

  } catch (error) {
    console.error("DELETE ERROR:", error);

    return Response.json(
      { message: "Erro interno" },
      { status: 500 }
    );
  }
}