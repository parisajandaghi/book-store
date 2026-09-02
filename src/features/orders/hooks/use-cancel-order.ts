// src/features/orders/hooks/use-cancel-order.ts
import useSWRMutation from "swr/mutation";
import { useSWRConfig } from "swr";

async function cancelOrderFetcher(url: string) {
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "خطایی در لغو سفارش رخ داد");
  }

  return data;
}

export function useCancelOrder(orderId: string | number) {
  const { mutate } = useSWRConfig();

  const { trigger, isMutating, error } = useSWRMutation(
    `/api/orders/${orderId}/cancel`,
    cancelOrderFetcher,
    {
      onSuccess: () => {
        // ۱. کش خود سفارش
        mutate(`/api/orders/${orderId}`);
        // ۲. کش لیست سفارش‌ها
        mutate("/api/orders");
        // ۳. کش کتاب‌ها (چون موجودی به انبار برگشته)
        mutate("/api/books");
      },
    },
  );

  return {
    cancelOrder: trigger,
    isCancelling: isMutating,
    error,
  };
}
