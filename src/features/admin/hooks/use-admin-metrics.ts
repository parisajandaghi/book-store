"use client";
import useSWR from "swr";

export interface AdminMetrics {
  booksInStock: number;
  newCustomers: number;
  activeOrders: number;
  totalRevenue: number;
  revenueHistory: number[];
  booksHistory: number[];
  customersHistory: number[];
  ordersHistory: number[];
}

const fetcher = async (url: string): Promise<AdminMetrics> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("خطا در دریافت اطلاعات داشبورد");
  }
  return res.json();
};

export function useAdminMetrics() {
  const { data, error, isLoading, mutate } = useSWR<AdminMetrics>(
    "/api/admin/metrics",
    fetcher,
    {
      revalidateOnFocus: true,
    },
  );

  return {
    metrics: data,
    isLoading,
    isError: error,
    refreshMetrics: mutate,
  };
}
