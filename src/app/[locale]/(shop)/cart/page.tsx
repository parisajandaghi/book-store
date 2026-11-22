import CartClient from "@/features/carts/components/cart-client";
import { getCurrentUser } from "@/lib/auth";
import { getCart } from "@/services/cart.service";

export const dynamic = "force-dynamic";

export default async function Carts() {
  const user = await getCurrentUser();
  const initialCart = user ? getCart(user.id) : [];

  return <CartClient initialCart={initialCart} />;
}
