"use client";

import CartItems from "@/features/carts/components/cart-items";
import EmptyCartState from "@/features/carts/components/empty-cart-state";
import { useCart } from "@/features/carts/hooks/use-cart";

export default function Carts() {
  const { cartItems } = useCart();
  return <>{cartItems.length === 0 ? <EmptyCartState /> : <CartItems />}</>;
}
