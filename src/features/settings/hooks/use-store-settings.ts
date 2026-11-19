import useSWR from "swr";

export interface PublicStoreSettings {
  store_name: string;
  shipping_rate: number;
  free_shipping_threshold: number;
}

const fetcher = async (url: string): Promise<PublicStoreSettings> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("خطا در دریافت تنظیمات فروشگاه");
  }
  return res.json();
};

export function useStoreSettings() {
  const { data, error, isLoading, mutate } = useSWR<PublicStoreSettings>(
    "/api/settings",
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60 * 1000,
    },
  );

  return {
    settings: data,
    isLoading,
    isError: error,
    refetch: mutate,
  };
}
