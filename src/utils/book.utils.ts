import {
  Book,
  BookFormValues,
  CreateBookDTO,
  Translation,
} from "@/features/books/book.type";
import { CartItem } from "@/features/carts/cart.type";

export const getLocalizedBook = (
  book: { translations?: Translation[]; title?: string; author?: string },
  locale: string,
) => {
  if (book.translations && book.translations.length > 0) {
    const found = book.translations.find((t) => t.language_code === locale);
    if (found) return found;
    return book.translations[0];
  }

  return {
    title: book.title || "",
    author: book.author || "",
    description: "",
  };
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

export const toFormValues = (
  book: Book | null,
  locale = "fa",
): BookFormValues => {
  if (!book) {
    return {
      title: "",
      author: "",
      description: "",
      price: 0,
      stock: 0,
      image_url: "",
    };
  }
  // گرفتن ترجمه متناسب با زبانی که ادمین در آن حضور دارد
  const tr =
    book.translations?.find((t) => t.language_code === locale) ||
    book.translations?.[0];

  return {
    title: tr?.title || "",
    author: tr?.author || "",
    description: tr?.description || "",
    price: book.price ?? 0,
    stock: book.stock ?? 0,
    image_url: book.image_url ?? "",
  };
};

export const toCreateDTO = (
  values: BookFormValues,
  bookId?: number,
  locale = "fa",
): CreateBookDTO => ({
  price: Number(values.price),
  stock: Number(values.stock),
  image_url: values.image_url,
  translations: [
    {
      book_id: bookId ?? 0,
      language_code: locale, // زبانی که الان در حال ایجاد/ویرایش آن هستیم
      title: values.title.trim(),
      author: values.author.trim(),
      description: values.description || "",
    },
  ],
});

export const isValidLuhn = (digits: string): boolean => {
  if (digits.length !== 16) return false;
  let sum = 0;
  for (let i = 0; i < 16; i++) {
    let cardDigit = parseInt(digits.charAt(i), 10);
    if (i % 2 === 0) {
      cardDigit *= 2;
      if (cardDigit > 9) cardDigit -= 9;
    }
    sum += cardDigit;
  }
  return sum % 10 === 0;
};
