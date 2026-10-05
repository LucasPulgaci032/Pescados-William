import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { User } from "@/modules/users/userSchema";

export async function getAuthenticatedUser() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const decoded = jwt.verify(
    token,
    process.env.SECRET_TOKEN as string
  ) as { id: string };

  const user = await User.findById(decoded.id);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}