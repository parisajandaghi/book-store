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

export function useCancelOrder(orderId: string) {
  const { mutate } = useSWRConfig();

  const { trigger, isMutating, error } = useSWRMutation(
    `/api/orders/${orderId}/cancel`,
    cancelOrderFetcher,
    {
      onSuccess: () => {
        mutate(`/api/orders/${orderId}`);

        // اگر لیست کل سفارشات را هم در جایی رندر می‌کنی، می‌توانی کش آن را هم نامعتبر کنی:
        mutate("/api/orders");
      },
    },
  );

  return {
    cancelOrder: trigger,
    isCancelling: isMutating,
    error: error,
  };
}
