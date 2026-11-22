import useSWR from "swr";
import { Order } from "../order.type";
import { OrderItem } from "../order-item.type";
import { useEffect } from "react";
import { notify } from "@/utils/notification";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("OrderDetails");
  const t1 = useTranslations("Notifications");
  const { data, error, isLoading } = useSWR<OrderResponse>(
    orderId ? `/api/orders/${orderId}` : null,
    fetcher,
  );
  useEffect(() => {
    if (error) {
      notify.error({
        id: "order-not-found",
        title: t1("ErrorTitle"),
        message: t("OrderNotFound"),
      });
    }
  }, [error, t, t1]);
  return {
    order: data,
    isLoading,
    error: error?.message || null,
  };
}
