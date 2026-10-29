// src/features/books/hooks/useBooks.ts
import useSWR from "swr";
import {
  BooksApiResponse,
  CreateBookDTO,
  UpdateBookDTO,
  UseBooksParams,
} from "../book.type";
import { notifications } from "@mantine/notifications";
import { notify } from "@/utils/notification";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("Notifications");
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

      notify.success({
        title: t("Books"),
        message: t("BookCreated"),
      });

      return true;
    } catch {
      notify.error({
        title: t("Books"),
        message: t("CreateBookFaild"),
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

      notify.success({
        title: t("Books"),
        message: t("BookUpdated"),
      });

      return true;
    } catch {
      notify.error({
        title: t("Books"),
        message: t("UpdateBookFaild"),
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
