import { Book } from "@/features/books/book.type";
import { CartItem } from "@/features/carts/cart.type";

export const getLocalizedBook = (book: Book | CartItem, locale: string) => {
  return locale === "fa" ? book.translations?.[0] : book.translations?.[1];
};

export const getFormattedPrice = (price: number, locale: string) => {
  const EXCHANGE_RATE = 60000;
  const displayPrice = locale === "en" ? price / EXCHANGE_RATE : price;

  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: 2,
  }).format(displayPrice);
};
