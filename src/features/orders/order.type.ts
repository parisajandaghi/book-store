import { ReactNode } from "react";
import { OrderItem } from "./order-item.type";

export type OrderStatus = "pending" | "processing" | "delivered" | "cancelled";
export interface Order {
  id: number;
  user_id: number;
  subtotal: number;
  shipping_fee: number;
  total: number;
  recipient_name: string;
  phone: string;
  address: string;
  tracking_code: string | null;
  status: OrderStatus;
  created_at?: string;
  customer_name?: string;
  customer_email?: string;
  // فیلدهای جدیدی که در لاگ دیتابیس هستند:
  address_id?: number;
  shipping_method?: string;
  delivery_date?: string;
  delivery_time?: string;
  order_items?: OrderItem[]; // اضافه شدن آرایه آیتم‌های سفارش
}
export interface OrderSummaryProps {
  button?: ReactNode;
  children?: ReactNode;
  subtotal: number;
  shippingFee: number;
  totalAmount: number;
}
export interface ShoppingInfoProps {
  name: string;
  phone_number: string;
  address: string;
  tracking_code: string | null;
}
