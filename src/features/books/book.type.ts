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
  translations?: Translation[];
}
export interface UpdateBookDTO {
  price?: number;
  image_url?: string;
  stock?: number;
  translations?: Translation[];
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
