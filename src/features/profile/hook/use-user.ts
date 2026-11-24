import useSWR from "swr";
import { useCallback } from "react";
import { User } from "@/types/user.type";
import { useRouter } from "@/navigation";

class FetchError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "FetchError";
    this.status = status;
  }
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new FetchError("خطا در دریافت اطلاعات کاربری", res.status);
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
  } = useSWR<User, FetchError>("/api/users", fetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,

    onError: (err) => {
      if (err instanceof FetchError && err.status === 401) {
        mutate(undefined, false);
      }
    },
  });

  const logout = useCallback(
    async (redirectTo: string = "/login") => {
      try {
        await fetch("/api/auth/logout", {
          method: "POST",
        });
      } catch (err) {
        console.error("Error during logout:", err);
      } finally {
        await mutate(undefined, false);
        router.push(redirectTo);
        router.refresh();
      }
    },
    [router, mutate],
  );

  const isGuest =
    !isLoading && (error?.status === 401 || error?.status === 404 || !user);

  return {
    user: isGuest ? null : user,
    isLoading,

    error: error?.status === 401 || error?.status === 404 ? null : error,
    logout,
    refetch: mutate,
  };
}
