import { Address } from "@/features/carts/cart.type";
import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

export interface CheckoutState {
  activeStep: number;
  addressId: number | null;
  shippingMethod: string | null;
  deliveryDate: string | null;
  deliveryTime: string | null;
  recipientName: string;
  phone: string;
  address: string;
}

const initialCheckoutState: CheckoutState = {
  activeStep: 0,
  addressId: null,
  shippingMethod: null,
  deliveryDate: null,
  deliveryTime: null,
  recipientName: "",
  phone: "",
  address: "",
};

const storage = createJSONStorage<CheckoutState>(() =>
  typeof window !== "undefined"
    ? sessionStorage
    : (undefined as unknown as Storage),
);

export const addressModalAtom = atom<boolean>(false);
export const addressesAtom = atom<Address[]>([]);
export const radioValueAtom = atom<string | null>(null);

export const checkoutAtom = atomWithStorage<CheckoutState>(
  "checkout_state",
  initialCheckoutState,
  storage,
);
