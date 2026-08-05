import { Translation } from "../books/book.type";
export interface CheckoutRequest {
  addressId: number;

  recipientName: string;

  phone: string;

  address: string;

  shippingMethod: string | null;

  deliveryDate: string | null;

  deliveryTime: string | null;

  payment: {
    cardHolderName: string;
    cardNumber: string;
    expiryDate: string;
    cvv2: string;
  };
}
export interface CheckoutResult {
  orderId: number;

  trackingCode: string;

  subtotal: number;

  shippingFee: number;

  total: number;
}
export type CheckoutAddressFormValues = {
  recipientName: string;
  phone: string;
  province: string | null;
  city: string | null;
  postalCode: string;
  address: string;
};
export type paymentFormValues = {
  cardHolderName: string;
  cardNumber: string;
  expiryDate: string;
  cvv2: string;
};
export interface CartItemRow {
  id: number;
  user_id: number;
  book_id: number;
  quantity: number;
  created_at: string;
}

export interface CartItem {
  id: number;

  book_id: number;

  quantity: number;

  price: number;

  image_url: string;

  translations: Translation[];
}

// i define it until using api

export type Address = {
  id: number | string;
  recipientName: string;
  phone: string;
  postalCode: string;
  address: string;
  province?: string | null;
  city?: string | null;
};
