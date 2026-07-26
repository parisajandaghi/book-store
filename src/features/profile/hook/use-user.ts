"use client";

import useSWR from "swr";

import { useCallback } from "react";
import { User } from "@/types/user.type";
import { useRouter } from "@/navigation";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("خطا در دریافت اطلاعات کاربری یا کاربر لاگین نیست");
  }
  return res.json();
};

export function useUser() {
  const router = useRouter();

  const {
    data: user,
    error,
    isLoading,
    mutate,
  } = useSWR<User>("/api/users", fetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
  });

  const logout = useCallback(
    async (redirectTo: string = "/login") => {
      try {
        const res = await fetch("/api/auth/logout", {
          method: "POST",
        });

        if (res.ok) {
          mutate(undefined, false);

          router.push(redirectTo);
          router.refresh();
        }
      } catch (err) {
        console.error("Error during logout:", err);
      }
    },
    [router, mutate],
  );

  return {
    user,
    isLoading,
    error,
    logout,
    refetch: mutate,
  };
}
