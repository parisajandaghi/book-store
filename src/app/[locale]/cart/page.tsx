"use client";

import CartItemsList from "@/features/carts/components/cart-items-list";
import EmptyCartState from "@/features/carts/components/empty-cart-state";
import { useCart } from "@/features/carts/hooks/use-cart";

export default function Carts() {
  const { cartItems } = useCart();
  return <>{cartItems.length === 0 ? <EmptyCartState /> : <CartItemsList />}</>;
}
