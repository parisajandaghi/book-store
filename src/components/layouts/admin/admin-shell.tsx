"use client";

import { Link, usePathname } from "@/navigation";
import { Box, Burger, Flex, Group, NavLink, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconBooks,
  IconBuildingStore,
  IconDashboard,
  IconSettings,
  IconShoppingCart,
  IconUsers,
} from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";
import LanguageDropdown from "../header/language-dropdown";

type AdminLayoutProps = {
  children: ReactNode;
};

export default function AdminShell({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const [opened, { toggle, close }] = useDisclosure(false);
  const t = useTranslations("Admin");
  const navItems = [
    { label: t("Dashboard"), icon: IconDashboard, href: "/admin" },
    { label: t("Books"), icon: IconBooks, href: "/admin/books" },
    { label: t("Orders"), icon: IconShoppingCart, href: "/admin/orders" },
    { label: t("Users"), icon: IconUsers, href: "/admin/users" },
    { label: t("Setting"), icon: IconSettings, href: "/admin/settings" },
  ];
  return (
    <Flex h="100vh" direction="column" bg="#1f0f1f34" >
      <Group
        h={70}
        px="xl"
        justify="space-between"
        bg="linear-gradient(rgb(31, 15, 31), rgba(31, 15, 31, 0.45))"
      >
        <Group justify="space-between">
          <Burger
            opened={opened}
            onClick={toggle}
            color="surface.9"
            size="sm"
          />
          <Text c="surface.6" fw={700} size="lg">
            {t("BookStoreDashboard")}
          </Text>
        </Group>
        <LanguageDropdown />
      </Group>

      <Flex flex={1} style={{ overflow: "hidden" }}>
        <Box
          
          w={opened ? 260 : 0}
          bg="linear-gradient( rgba(31, 15, 31, 0.45),rgb(31, 15, 31))"
          style={{
            transition: "width 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
            overflow: "hidden",
          }}
        >
          <Box w={260} p="md">
            <Stack h="calc(100vh - 100px)" justify="space-between" py={"md"}>
              <Box>
                {navItems.map((item) => {
                  const isActive =
                    item.href === "/admin"
                      ? pathname === "/admin"
                      : pathname === item.href ||
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
                      mb="sm"
                      onClick={close}
                      styles={{
                        root: {
                          borderRadius: "8px",
                          color: isActive ? "#bc982a" : "#fefaf4",
                          backgroundColor: isActive
                            ? "#7b62101a"
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
                label={t("BacktoStore")}
                leftSection={
                  <IconBuildingStore
                    size="1.2rem"
                    stroke={1.5}
                    color="#bc982a"
                  />
                }
                className="store-back-link"
              />
            </Stack>
          </Box>
        </Box>

        <Box flex={1} p="xl" style={{ overflowY: "auto" }}>
          {children}
        </Box>
      </Flex>
    </Flex>
  );
}
