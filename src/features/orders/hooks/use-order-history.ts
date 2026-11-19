import useSWR from "swr";
import { Order } from "../order.type"; // مسیر رو بر اساس ساختار پوشه‌هات تنظیم کن

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useOrderHistory() {
  const { data, error, isLoading, mutate } = useSWR<Order[]>(
    "/api/orders/history",
    fetcher,
  );

  return {
    orders: data || [],
    isLoading,
    error,
    mutate,
  };
}
