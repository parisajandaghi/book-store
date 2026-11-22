"use client";

import { ReactNode } from "react";
import Header from "./header/header";
import { Stack } from "@mantine/core";
import { usePathname } from "@/navigation";
import { useUser } from "@/features/profile/hook/use-user";

type AppShellProps = {
  children: ReactNode;
};

function AppShellLayout({ children }: AppShellProps) {
  const pathname = usePathname();
  useUser();
  const hideHeader =
    pathname.endsWith("/login") ||
    pathname.endsWith("/signup") ||
    pathname.endsWith("/forgot-password") ||
    pathname.endsWith("/reset-password");
  const isAuthPage = hideHeader;
  return (
    <Stack mih="100dvh" gap={0}>
      {!hideHeader && <Header />}

      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          // marginTop:isAuthPage ? "" : "30px",
          justifyContent: isAuthPage ? "center" : "flex-start",
        }}
      >
        {children}
      </main>
    </Stack>
  );
}

export default AppShellLayout;
