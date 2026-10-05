import { User } from "@/types/user.type";
import { useState } from "react";
import useSWR from "swr";

import { useTranslations } from "next-intl";

interface UsersResponse {
  data: (User & { orders_count?: number })[];
  total: number;
  page: number;
  totalPages: number;
}
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useUsers() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const t = useTranslations("Admin");

  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: "10",
    ...(search ? { search } : {}),
  });

  const { data, error, isLoading, mutate } = useSWR<UsersResponse>(
    `/api/admin/users?${queryParams.toString()}`,
    fetcher,
    { keepPreviousData: true },
  );

  const updateUserRole = async (userId: number | string, newRole: string) => {
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });

      if (!res.ok) throw new Error("Failed to update user");

      // notifications.show({
      //   title: t("Success"),
      //   message: t("UserRoleUpdatedSuccessfully"),
      //   color: "teal",
      // });

      mutate();
      return true;
    } catch {
      // notifications.show({
      //   title: t("Error"),
      //   message: t("UserRoleUpdateFailed"),
      //   color: "red",
      // });
      return false;
    }
  };

  return {
    users: data?.data ?? [],
    total: data?.total ?? 0,
    totalPages: data?.totalPages ?? 1,
    page,
    setPage,
    search,
    setSearch,
    isLoading,
    isError: error,
    updateUserRole,
    refresh: mutate,
  };
}
