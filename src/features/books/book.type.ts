export interface FeaturedBooksProp {
  books: Book[];
}

export interface Translation {
  id: number;
  book_id: number;
  language_code: string;
  title: string;
  author: string;
  description: string;
}

// برای Create، فیلد id اجباری نیست (دیتابیس آن را خودکار می‌سازد)
export type CreateTranslationDTO = Omit<Translation, "id">;

// برای Update، فیلد id اختیاری است تا هم با شناسه و هم با (book_id + locale) قابل مدیریت باشد
export type UpdateTranslationDTO = Partial<Translation>;

export interface Book {
  id: number;
  price: number;
  image_url: string;
  created_at?: string;
  stock?: number;
  translations?: Translation[];
}

export interface BookFormValues {
  title: string;
  author: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
}

export interface CreateBookDTO {
  price: number;
  image_url: string;
  stock: number;
  translations?: CreateTranslationDTO[];
}

export interface UpdateBookDTO {
  price?: number;
  image_url?: string;
  stock?: number;
  translations?: UpdateTranslationDTO[];
}

export interface UseBooksParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
}

export interface BooksApiResponse {
  data: Book[];
  total: number;
  page: number;
  totalPages: number;
}
