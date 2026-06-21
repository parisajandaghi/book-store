import {
  Address,
  CartItem,
  initialMockAddresses,
} from "@/features/carts/cart.type";
import { atom } from "jotai";

export const cartItemsAtom = atom<CartItem[]>([]);

export const cartTotalAtom = atom((get) => {
  const items = get(cartItemsAtom);
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
});
export const cartCountAtom = atom((get) => {
  const items = get(cartItemsAtom);
  return items.reduce((total, item) => total + item.quantity, 0);
});
export const addressModalAtom = atom<boolean>(false);
export const addressesAtom = atom<Address[]>(initialMockAddresses);
export const radioValueAtom = atom<string | null>(null);
