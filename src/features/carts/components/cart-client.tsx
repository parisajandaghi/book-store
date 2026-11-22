"use client";

import CartItems from "@/features/carts/components/cart-items";
import EmptyCartState from "@/features/carts/components/empty-cart-state";
import { useCart } from "@/features/carts/hooks/use-cart";
import { CartItem } from "@/features/carts/cart.type";

interface CartClientProps {
  initialCart: CartItem[];
}

export default function CartClient({ initialCart }: CartClientProps) {
  const { cartItems } = useCart(initialCart);

  if (cartItems.length === 0) {
    return <EmptyCartState />;
  }

  return <CartItems initialCart={initialCart} />;
}