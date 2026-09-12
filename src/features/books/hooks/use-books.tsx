// src/features/books/hooks/useBooks.ts
import useSWR from "swr";
import {
  BooksApiResponse,
  CreateBookDTO,
  UpdateBookDTO,
  UseBooksParams,
} from "../book.type";
import { notifications } from "@mantine/notifications";

const fetcher = async (url: string): Promise<BooksApiResponse> => {
  const res = await fetch(url);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "خطا در دریافت اطلاعات کتاب‌ها");
  }
  return res.json();
};

export function useBooks({
  page = 1,
  limit = 4,
  search = "",
  sort = "most_popular",
}: UseBooksParams = {}) {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(search.trim() ? { search: search.trim() } : {}),
    ...(sort ? { sort } : {}),
  });

  const { data, error, isLoading, isValidating, mutate } =
    useSWR<BooksApiResponse>(`/api/books?${queryParams.toString()}`, fetcher, {
      revalidateOnFocus: false,
      keepPreviousData: true,
    });

  const createBook = async (payload: CreateBookDTO) => {
    try {
      const res = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error();

      await mutate();

      notifications.show({
        color: "green",
        message: "کتاب با موفقیت افزوده شد",
      });

      return true;
    } catch {
      notifications.show({
        color: "red",
        message: "خطا در ثبت کتاب",
      });

      return false;
    }
  };

  const updateBook = async (id: number, payload: UpdateBookDTO) => {
    try {
      const res = await fetch(`/api/books/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error();

      await mutate();

      notifications.show({
        color: "green",
        message: "تغییرات ذخیره شد",
      });

      return true;
    } catch {
      notifications.show({
        color: "red",
        message: "خطا در ویرایش کتاب",
      });

      return false;
    }
  };

  return {
    books: data?.data ?? [],
    total: data?.total ?? 0,
    totalPages: data?.totalPages ?? 1,
    currentPage: data?.page ?? page,

    isLoading,
    isValidating,
    isError: !!error,
    error,

    createBook,
    updateBook,

    mutate,
  };
}
