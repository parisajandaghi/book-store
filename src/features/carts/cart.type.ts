import { Translation } from "../books/book.type";

export interface CheckoutResult {
  order_id: string;
  total: number;
}

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
export const cartItems = [
  {
    id: 1, // همیشه یک id یکتا برای key در مپ نیاز دارید
    title: "جاناتان مرغ دریایی",
    author: "ریچارد باخ",
    price: 300000,
    imageSrc: "/images/jonathan-livingston-seagull.jpg",
    quantity: 1, // مقدار اولیه برای NumberInput
  },
  {
    id: 2, // همیشه یک id یکتا برای key در مپ نیاز دارید
    title: "جاناتان مرغ دریایی",
    author: "ریچارد باخ",
    price: 300000,
    imageSrc: "/images/jonathan-livingston-seagull.jpg",
    quantity: 2, // مقدار اولیه برای NumberInput
  },
  {
    id: 3, // همیشه یک id یکتا برای key در مپ نیاز دارید
    title: "جاناتان مرغ دریایی",
    author: "ریچارد باخ",
    price: 300000,
    imageSrc: "/images/jonathan-livingston-seagull.jpg",
    quantity: 1, // مقدار اولیه برای NumberInput
  },
];
