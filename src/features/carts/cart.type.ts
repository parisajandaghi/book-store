import { Translation } from "../books/book.type";

export interface CheckoutResult {
  order_id: string;
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
  book_id: number;
  quantity: number;
  price: number;
}

export type CartItem = {
  book_id: number;
  title: string;
  price: number;
  quantity: number;
  image_url?: string;
  author?: string;
  translations?: Translation[];
};

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
export const initialMockAddresses: Address[] = [
  {
    id: 1,
    recipientName: "Parisa Jandaghi",
    phone: "09123456789",
    postalCode: "1234567890",
    address: "Tehran, Valiasr Street, No. 25, Unit 4",
  },
  {
    id: 2,
    recipientName: "Parisa Jandaghi",
    phone: "09123456789",
    postalCode: "1234567891",
    address: "Tehran, Shariati Street, No. 120, Unit 8",
  },
];
