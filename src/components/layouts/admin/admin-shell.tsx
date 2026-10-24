"use client";

import { Link, usePathname } from "@/navigation";
import {
  Box,
  Burger,
  Drawer,
  Flex,
  Group,
  NavLink,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import {
  IconBooks,
  IconBuildingStore,
  IconDashboard,
  IconSettings,
  IconShoppingCart,
  IconUsers,
} from "@tabler/icons-react";
import { useLocale, useTranslations } from "next-intl";
import { ReactNode } from "react";
import LanguageDropdown from "../header/language-dropdown";

type AdminLayoutProps = {
  children: ReactNode;
};

export default function AdminShell({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const locale = useLocale();
  const [opened, { toggle, close }] = useDisclosure(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const t = useTranslations("Admin");

  const navItems = [
    { label: t("Dashboard"), icon: IconDashboard, href: "/admin" },
    { label: t("Books"), icon: IconBooks, href: "/admin/books" },
    { label: t("Orders"), icon: IconShoppingCart, href: "/admin/orders" },
    { label: t("Users"), icon: IconUsers, href: "/admin/users" },
    { label: t("Setting"), icon: IconSettings, href: "/admin/settings" },
  ];

  const renderNavLinks = () => (
    <Stack h="100%" justify="space-between" py="md">
      <Box>
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

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
                  backgroundColor: isActive ? "#7b62101a" : "transparent",
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
        onClick={close}
        label={t("BacktoStore")}
        leftSection={
          <IconBuildingStore size="1.2rem" stroke={1.5} color="#bc982a" />
        }
        styles={{
          root: {
            borderRadius: "8px",
            color: "#fefaf4",
          },
        }}
      />
    </Stack>
  );

  return (
    <Flex h="100vh" direction="column" bg="#1f0f1f34">
      {/* Header */}
      <Group
        h={65}
        px={{ base: "xs", sm: "xl" }}
        justify="space-between"
        align="center"
        wrap="nowrap"
        bg="linear-gradient(rgb(31, 15, 31), rgba(31, 15, 31, 0.45))"
      >
        <Group gap="xs" wrap="nowrap" style={{ minWidth: 0, flexShrink: 1 }}>
          <Burger
            opened={opened}
            onClick={toggle}
            color="var(--mantine-color-surface-9)"
            size="sm"
            style={{ flexShrink: 0 }}
          />
          <Text
            c="surface.6"
            fw={700}
            size="md"
            truncate="end"
            style={{ minWidth: 0 }}
          >
            {t("BookStoreDashboard")}
          </Text>
        </Group>

        <Box style={{ flexShrink: 0 }}>
          <LanguageDropdown />
        </Box>
      </Group>

      <Flex flex={1} style={{ overflow: "hidden", position: "relative" }}>
        {/* Mobile Drawer Navigation */}
        {isMobile ? (
          <Drawer
            opened={opened}
            onClose={close}
            position={locale === "fa" ? "right" : "left"}
            size={260}
            withCloseButton={false}
            styles={{
              content: {
                background: "linear-gradient(180deg, #1f0f1f, #170b17)",
                borderInline: "1px solid rgba(255, 255, 255, 0.08)",
              },
              body: {
                height: "100%",
                padding: "16px",
              },
            }}
          >
            {renderNavLinks()}
          </Drawer>
        ) : (
          /* Desktop Collapsible Sidebar */
          <Box
            w={opened ? 260 : 0}
            bg="linear-gradient(rgba(31, 15, 31, 0.45), rgb(31, 15, 31))"
            style={{
              transition: "width 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
              overflow: "hidden",
            }}
          >
            <Box w={260} p="md" h="100%">
              {renderNavLinks()}
            </Box>
          </Box>
        )}

        {/* Main Content Area */}
        <Box
          flex={1}
          p={{ base: "xs", sm: "xl" }}
          style={{ overflowY: "auto", overflowX: "hidden" }}
        >
          {children}
        </Box>
      </Flex>
    </Flex>
  );
}
