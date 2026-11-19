import { Translation } from "../books/book.type";

export interface OrderItem {
  id: number;
  order_id: number;
  book_id: number;
  quantity: number;
  price: number;
  title?: string;
  author?: string;
  image_url?: string;
  translations?: Translation[];
}
export interface RawOrderItemRow {
  id: number;
  order_id: number;
  book_id: number;
  quantity: number;
  price: number;
  image_url?: string;
  translations_json: string | null;
}
