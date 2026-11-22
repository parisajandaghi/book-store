import { Address } from "@/features/carts/cart.type";
import { notify } from "@/utils/notification";
import { useTranslations } from "next-intl";
import useSWR from "swr";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch addresses");
  return res.json();
};

export function useAddresses() {
  const t = useTranslations("Notifications");
  const { data, error, isLoading, mutate } = useSWR<Address[]>(
    "/api/users/addresses",
    fetcher,
  );
  const deleteAddress = async (id: number) => {
    try {
      const res = await fetch(`/api/users/addresses/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.error || "Failed to delete address");
      }

      await mutate();
      notify.success({
        title: t("SuccessTitle"),
        message: t("AddressDeleteSuccess"),
      });

      return true;
    } catch (err) {
      console.error("Delete address error:", err);
      return false;
    }
  };
  return {
    addresses: data || [],
    isLoading,
    isError: error,
    mutate,
    deleteAddress,
  };
}
