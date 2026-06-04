import { ReactNode } from "react";

export type OrderStatus = "Pending" | "Processing" | "Delivered" | "Cancelled";
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
}
export interface OrderSummaryProps {
  button?: ReactNode;
  shippingFee: string;
  subtotal: number;
  totalAmount: string;
}
export interface ShoppingInfoProps {
  name: string;
  phone_number: string;
  address: string;
  tracking_code: string;
}
export const mockOrders: Order[] = [
  {
    id: 1,
    created_at: "2024-05-08",
    subtotal: 1200000,
    shipping_fee: 50000,
    total: 1250000,
    status: "Pending",
    user_id: 2,
    recipient_name: "علی رضایی",
    phone: "09121111111",
    address: "تهران، خیابان ولیعصر، کوچه بهار، پلاک ۱۲، واحد ۳",
    tracking_code: null, // چون هنوز Pending است
  },
  {
    id: 2,
    created_at: "2024-05-05",
    subtotal: 400000,
    shipping_fee: 50000,
    total: 450000,
    status: "Processing",
    user_id: 3,
    recipient_name: "سارا محمدی",
    phone: "09122222222",
    address: "اصفهان، میدان نقش جهان، خیابان حافظ، پلاک ۴۵",
    tracking_code: null, // در حال پردازش است و هنوز ارسال نشده
  },
  {
    id: 3,
    created_at: "2024-04-28",
    subtotal: 2800000,
    shipping_fee: 0, // ارسال رایگان برای مبلغ بالا
    total: 2800000,
    status: "Delivered",
    user_id: 4,
    recipient_name: "محمد کریمی",
    phone: "09123333333",
    address: "شیراز، بلوار زند، کوچه ۲۰، مجتمع پارس، طبقه ۲",
    tracking_code: "10345678902145", // چون تحویل داده شده، کد رهگیری دارد
  },
  {
    id: 4,
    created_at: "2024-04-10",
    subtotal: 900000,
    shipping_fee: 50000,
    total: 950000,
    status: "Cancelled",
    user_id: 3,
    recipient_name: "سارا محمدی",
    phone: "09122222222",
    address: "اصفهان، میدان نقش جهان، خیابان حافظ، پلاک ۴۵",
    tracking_code: null, // لغو شده
  },
  {
    id: 5,
    created_at: "2024-03-22",
    subtotal: 1550000,
    shipping_fee: 50000,
    total: 1600000,
    status: "Delivered",
    user_id: 3,
    recipient_name: "امیر حسینی",
    phone: "09125555555",
    address: "تبریز، خیابان آبرسان، کوچه مهر، پلاک ۱۰",
    tracking_code: "10987654321098", // تحویل داده شده
  },
];
