"use client";
import { useDebouncedValue } from "@mantine/hooks";
import axios from "axios";
import useSwr from "swr";
const fetcher = async (url: string) => {
  const { data } = await axios.get(url);
  return data;
};

export function useSearch(query: string) {
  const [debouncedQuery] = useDebouncedValue(query, 500);
  const shouldFetch = debouncedQuery.trim().length > 0;
  const {
    data: response,
    isLoading,
    error,
    isValidating,
  } = useSwr(
    shouldFetch
      ? `/api/books?search=${encodeURIComponent(debouncedQuery)}`
      : null,
    fetcher,
  );
  const isPending = shouldFetch && response !== undefined;
  return {
    books: response?.data ?? [],
    total: response?.total ?? 0,
    totalPages: response?.totalPages ?? 0,
    isPending,
    error,
    isLoading: isLoading || isValidating,
    isEmpty: isPending && (response?.data?.length ?? 0) === 0,
  };
}
