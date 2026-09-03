import { Book } from "@/features/books/book.type";
import { CartItem } from "@/features/carts/cart.type";

export const getLocalizedBook = (book: Book | CartItem, locale: string) => {
  return locale === "fa" ? book.translations?.[0] : book.translations?.[1];
};

export const getFormattedPrice = (price: number, locale: string) => {
  const EXCHANGE_RATE = 200000;
  const displayPrice = locale === "en" ? price / EXCHANGE_RATE : price;

  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: 2,
  }).format(displayPrice);
};

export const toPersianDigits = (num: string | number) => {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return num.toString().replace(/\d/g, (x) => persianDigits[Number(x)]);
};

export const toEnglishDigits = (str: string | number) => {
  const persianDigits = [
    /۰/g,
    /۱/g,
    /۲/g,
    /۳/g,
    /۴/g,
    /۵/g,
    /۶/g,
    /۷/g,
    /۸/g,
    /۹/g,
  ];
  let result = str.toString();
  for (let i = 0; i < 10; i++) {
    result = result.replace(persianDigits[i], i.toString());
  }
  return result;
};
