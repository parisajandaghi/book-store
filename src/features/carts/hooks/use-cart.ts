import { CartItem } from "../cart.type";

import useSWR from "swr";

const fetcher = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch cart.");
  }

  return response.json();
};

export const useCart = () => {
  const {
    data: cartItems = [],
    error,
    isLoading,
    mutate,
  } = useSWR<CartItem[]>("/api/cart", fetcher);

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const addToCart = async (bookId: number) => {
    const response = await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bookId }),
    });

    console.log("status:", response.status);

    const data = await response.json();

    console.log("response:", data);

    if (!response.ok) {
      throw new Error(data.error);
    }

    await mutate();
  };

  const increaseQuantity = async (itemId: number, currentQuantity: number) => {
    const response = await fetch("/api/cart", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        itemId,
        quantity: currentQuantity + 1,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update cart.");
    }

    await mutate();
  };

  const decreaseQuantity = async (itemId: number, currentQuantity: number) => {
    if (currentQuantity === 1) {
      await removeFromCart(itemId);
      return;
    }

    const response = await fetch("/api/cart", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        itemId,
        quantity: currentQuantity - 1,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update cart.");
    }

    await mutate();
  };

  const removeFromCart = async (itemId: number) => {
    const response = await fetch(`/api/cart?id=${itemId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to remove item.");
    }

    await mutate();
  };

  return {
    cartItems,
    cartTotal,
    isLoading,
    error,
    cartCount,

    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  };
};
