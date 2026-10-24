// import useSWR from "swr";
// import { useCallback, useEffect } from "react";
// import { User } from "@/types/user.type";
// import { useRouter } from "@/navigation";

// class FetchError extends Error {
//   status: number;
//   constructor(message: string, status: number) {
//     super(message);
//     this.name = "FetchError";
//     this.status = status;
//   }
// }

// const fetcher = async (url: string) => {
//   const res = await fetch(url);
//   if (!res.ok) {
//     throw new FetchError("خطا در دریافت اطلاعات کاربری", res.status);
//   }
//   return res.json();
// };

// export function useUser() {
//   const router = useRouter();

//   const {
//     data: user,
//     error,
//     isLoading,
//     mutate,
//   } = useSWR<User, FetchError>("/api/users", fetcher, {
//     shouldRetryOnError: false,
//     revalidateOnFocus: false,
//   });

//   const logout = useCallback(
//     async (redirectTo: string = "/login") => {
//       try {
//         await fetch("/api/auth/logout", {
//           method: "POST",
//         });
//       } catch (err) {
//         console.error("Error during logout:", err);
//       } finally {
//         await mutate(undefined, false);
//         router.push(redirectTo);
//         router.refresh();
//       }
//     },
//     [router, mutate],
//   );

//   useEffect(() => {
//     if (error && (error.status === 401 || error.status === 404)) {
//       logout("/login");
//     }
//   }, [error, logout]);

//   return {
//     user,
//     isLoading,
//     error,
//     logout,
//     refetch: mutate,
//   };
// }
import useSWR from "swr";
import { useCallback, useEffect } from "react";
import { User } from "@/types/user.type";
import { useRouter, usePathname } from "@/navigation";

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
  const pathname = usePathname();

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
    // مسیرهایی که اگر کاربر لاگین نبود نباید به /login ریدایرکت شوند
    const isGuestOrAuthPage =
      pathname.endsWith("/login") ||
      pathname.endsWith("/signup") ||
      pathname.endsWith("/forgot-password") ||
      pathname.endsWith("/reset-password");

    // فقط اگر در صفحه احراز هویت نبودیم و ارور داد لاگ‌اوت کند
    if (!isGuestOrAuthPage && error && (error.status === 401 || error.status === 404)) {
      logout("/login");
    }
  }, [error, logout, pathname]);

  return {
    user,
    isLoading,
    error,
    logout,
    refetch: mutate,
  };
}
