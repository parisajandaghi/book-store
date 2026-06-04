import { ReactNode } from "react";
import Header from "./header/header";
import { Stack } from "@mantine/core";
type AppShellProps = {
  children: ReactNode;
};

function AppShellLayout({ children }: AppShellProps) {
  return (
    <Stack mih={'100vh'} >
      <Header />
      <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {children}
      </main>
    </Stack>
  );
}

export default AppShellLayout;
