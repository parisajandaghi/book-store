"use client";

import { ReactNode } from "react";
import { Flex, Box, Stack, NavLink, Group, Text, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { usePathname, Link } from "@/navigation";
import {
  IconDashboard,
  IconBooks,
  IconShoppingCart,
  IconUsers,
  IconSettings,
  IconLogout,
} from "@tabler/icons-react";

type AdminLayoutProps = {
  children: ReactNode;
};

const navItems = [
  { label: "داشبورد", icon: IconDashboard, href: "/admin" },
  { label: "مدیریت کتاب‌ها", icon: IconBooks, href: "/admin/books" },
  { label: "سفارش‌ها", icon: IconShoppingCart, href: "/admin/orders" },
  { label: "کاربران", icon: IconUsers, href: "/admin/users" },
  { label: "تنظیمات", icon: IconSettings, href: "/admin/settings" },
];

export default function AdminShell({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  // در حالت پیش‌فرض می‌تونی true بذاری که منو باز باشه، یا false که بسته باشه
  const [opened, { toggle, close }] = useDisclosure(false);

  return (
    <Flex h="100vh" direction="column" bg="#1f0f1f34">
      {/* هدر بالایی */}
      <Group
        h={70}
        px="xl"
        justify="space-between"
        bg="linear-gradient(rgb(31, 15, 31), rgba(31, 15, 31, 0.45))"
      >
        <Group>
          <Burger
            opened={opened}
            onClick={toggle}
            color="surface.9"
            size="sm"
          />
          <Text c="surface.9" fw={700} size="lg">
            کتاب‌خانه
          </Text>
        </Group>
      </Group>

      <Flex flex={1} style={{ overflow: "hidden" }}>
        <Box
          mt={5}
          w={opened ? 260 : 0}
          bg="linear-gradient( rgba(31, 15, 31, 0.45),rgb(31, 15, 31))"
          style={{
            transition: "width 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
            overflow: "hidden",
          }}
        >
          <Box w={260} p="md">
            <Text c="surface.9" fw={700} size="1.2rem" mb="xl" px="sm">
              منوی مدیریت
            </Text>
            <Stack h="calc(100vh - 160px)" justify="space-between">
              <Box>
                {navItems.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);

                  return (
                    <NavLink
                      key={item.href}
                      component={Link}
                      href={item.href}
                      label={item.label}
                      leftSection={<item.icon size="1.2rem" stroke={1.5} />}
                      active={isActive}
                      color="surface.9"
                      variant="filled"
                      mb="sm"
                      onClick={close}
                      styles={{
                        root: {
                          borderRadius: "8px",
                          color: isActive ? "#1F0F1F" : "#fefaf4",
                          backgroundColor: isActive
                            ? "#d4af37b2"
                            : "transparent",
                          whiteSpace: "nowrap",
                        },
                      }}
                    />
                  );
                })}
              </Box>

              <NavLink
                component={Link}
                href="/"
                label="بازگشت به فروشگاه"
                leftSection={<IconLogout size="1.2rem" stroke={1.5} />}
                styles={{
                  root: {
                    borderRadius: "8px",
                    color: "#fefaf4",
                    whiteSpace: "nowrap",
                  },
                }}
              />
            </Stack>
          </Box>
        </Box>

        {/* محتوای اصلی که هول داده میشه */}
        <Box flex={1} p="xl" style={{ overflowY: "auto" }}>
          {children}
        </Box>
      </Flex>
    </Flex>
  );
}
