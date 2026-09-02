import { Order } from "@/features/orders/order.type";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useAdminOrders() {
  const { data, error, isLoading, mutate } = useSWR<Order[]>(
    "/api/admin/orders",
    fetcher,
  );

  return {
    orders: data || [],
    isLoading,
    error,
    mutate,
  };
}

export function useAdminOrder(orderId: string | null) {
  const key = orderId ? `/api/admin/orders/${orderId}` : null;

  const { data, error, isLoading, mutate } = useSWR<Order>(key, fetcher);

  const updateOrder = async (updateData: {
    status?: string | null;
    tracking_code?: string;
  }) => {
    if (!orderId) return;

    const res = await fetch(`/api/admin/orders/${orderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "خطا در به‌روزرسانی سفارش");
    }

    const updatedOrder = await res.json();

    await mutate(updatedOrder, { revalidate: true });
    return updatedOrder;
  };

  return {
    order: data,
    isLoading,
    error,
    mutate,
    updateOrder,
  };
}
