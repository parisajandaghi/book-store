import useSWR from "swr";
import { useCallback, useEffect } from "react";
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

  useEffect(() => {
    if (error && (error.status === 401 || error.status === 404)) {
      logout("/login");
    }
  }, [error, logout]);

  return {
    user,
    isLoading,
    error,
    logout,
    refetch: mutate,
  };
}
