export interface OrderItem {
  id: number;
  order_id: number;
  book_id: number;
  quantity: number;
  price: number;
  title?: string;
  author?: string;
  image_url?: string; 
}