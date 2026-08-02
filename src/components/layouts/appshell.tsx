"use client";

import { ReactNode } from "react";
import Header from "./header/header";
import { Stack } from "@mantine/core";
import { usePathname } from "@/navigation";

type AppShellProps = {
  children: ReactNode;
};

function AppShellLayout({ children }: AppShellProps) {
  const pathname = usePathname();

  const hideHeader =
    pathname.endsWith("/login") ||
    pathname.endsWith("/signup") ||
    pathname.endsWith("/forgot-password") ||
    pathname.endsWith("/reset-password");

  return (
    <Stack mih="100vh">
      {!hideHeader && <Header />}

      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {children}
      </main>
    </Stack>
  );
}

export default AppShellLayout;
