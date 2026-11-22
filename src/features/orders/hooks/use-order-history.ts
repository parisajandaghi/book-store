
import useSWR from "swr";
import { useEffect } from "react";
import { Order } from "../order.type";
import { notify } from "@/utils/notification";
import { useTranslations } from "next-intl";

const fetcher = async (url: string): Promise<Order[]> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }

  return response.json();
};

export function useOrderHistory(initialOrders: Order[] = []) {
  const t1 = useTranslations("Orders");
  const t2 = useTranslations("Notifications");

  const {
    data,
    error,
    isLoading,
    mutate,
  } = useSWR<Order[]>(
    "/api/orders/history",
    fetcher,
    {
      fallbackData: initialOrders,
      revalidateOnMount: true,
    }
  );

  useEffect(() => {
    if (error) {
      notify.error({
        id: "fetch-error",
        title: t2("ErrorTitle"),
        message: t1("FetchingOrdersFaild"),
      });
    }
  }, [error, t1, t2]);

  return {
    orders: data ?? [],
    isLoading: data === undefined && isLoading,
    error,
    mutate,
  };
}
