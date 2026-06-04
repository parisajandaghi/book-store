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

export interface Book {
  id: number;
  price: number;
  image_url: string;
  created_at?: string;
  translations?: Translation[];
}

export interface CreateTranslationDTO {
  language_code: string;
  title: string;
  author: string;
  description: string;
}

export interface CreateBookDTO extends Omit<Book, "id" | "created_at" | "translations"> {
  translations?: CreateTranslationDTO[];
}

export interface UpdateTranslationDTO {
  id?: number;
  language_code?: string;
  title?: string;
  author?: string;
  description?: string;
}

export interface UpdateBookDTO extends Partial<Omit<Book, "id" | "created_at" | "translations">> {
  translations?: UpdateTranslationDTO[];
}
