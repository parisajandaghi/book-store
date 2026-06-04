import { cartItemsAtom, cartTotalAtom } from "@/store/cart-atom";
import { useAtom } from "jotai";
import { CartItem } from "../cart.type";

export const useCart = () => {
  const [cartItems, setCartItems] = useAtom(cartItemsAtom);
  const [cartTotal] = useAtom(cartTotalAtom);
  const addToCart = (product: Omit<CartItem, "quantity">) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.book_id === product.book_id,
      );
      if (existingItem) {
        return prevItems.map((item) =>
          item.book_id === product.book_id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };
  const decreaseQuantity = (book_id: number) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.book_id === book_id);
      if (existingItem?.quantity === 1) {
        return prevItems.filter((item) => item.book_id !== book_id);
      }
      return prevItems.map((item) =>
        item.book_id === book_id
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      );
    });
  };
  const increaseQuantity = (book_id: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.book_id === book_id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };
  const removeFromCart = (book_id: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.book_id !== book_id),
    );
  };
  return {
    cartItems,
    cartTotal,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    increaseQuantity,
  };
};
