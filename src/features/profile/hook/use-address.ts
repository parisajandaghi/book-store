import { Address } from "@/features/carts/cart.type";
import useSWR from "swr";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch addresses");
  return res.json();
};

export function useAddresses() {
  const { data, error, isLoading, mutate } = useSWR<Address[]>(
    "/api/users/addresses",
    fetcher,
  );

  return {
    addresses: data || [],
    isLoading,
    isError: error,
    mutate,
  };
}
