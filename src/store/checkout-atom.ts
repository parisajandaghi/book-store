import { Address, initialMockAddresses } from "@/features/carts/cart.type";

import { atom } from "jotai";

export const addressModalAtom = atom<boolean>(false);
export const addressesAtom = atom<Address[]>(initialMockAddresses);
export const radioValueAtom = atom<string | null>(null);
export const checkoutAtom = atom({
  addressId: null as number | null,
  shippingMethod: null as string | null,
  deliveryDate: null as string | null,
  deliveryTime: null as string | null,
});
