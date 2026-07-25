import useSWR from "swr";
import { Order } from "../order.type";
import { OrderItem } from "../order-item.type";

export interface OrderResponse extends Order {
  items: OrderItem[];
}

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("سفارش یافت نشد یا خطایی در دریافت اطلاعات رخ داده است.");
  }
  return response.json();
};

export function useOrderDetails(orderId: string | string[] | undefined) {
  const { data, error, isLoading } = useSWR<OrderResponse>(
    orderId ? `/api/orders/${orderId}` : null,
    fetcher,
  );

  return {
    order: data,
    isLoading,
    error: error?.message || null,
  };
}
