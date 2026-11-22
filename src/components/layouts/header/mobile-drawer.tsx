"use client";
import HorizontalDivider from "@/components/ui/elements/horizontal-divider";
import { useUser } from "@/features/profile/hook/use-user";
import { Link, useRouter } from "@/navigation";
import {
  Button,
  Center,
  Drawer,
  Group,
  Loader,
  Stack,
  Text,
} from "@mantine/core";
import {
  IconBook,
  IconHome,
  IconLogout,
  IconReceipt,
  IconUser,
} from "@tabler/icons-react";
import { useLocale, useTranslations } from "next-intl";
import style from "./header.module.css";
import LanguageSwitcher from "./language-switcher";
type MobileDrawerProps = {
  mobileMenuOpened: boolean;
  handleNavigation: () => void;
  isActive: (path: string) => boolean;
};
export default function MobileDrawer({
  mobileMenuOpened,
  handleNavigation,
  isActive,
}: MobileDrawerProps) {
  const { isLoading, user, logout } = useUser();
  const t = useTranslations("Header");
  const t1 = useTranslations("Login");
  const router = useRouter();
  const locale = useLocale();
  return (
    <Drawer
      opened={mobileMenuOpened}
      onClose={handleNavigation}
      dir="ltr"
      position={locale === "fa" ? "left" : "right"}
      transitionProps={{
        duration: 250,
        timingFunction: "ease",
      }}
      size="min(82vw, 320px)"
      withCloseButton={false}
      zIndex={3000}
      withinPortal={true}
      classNames={{
        content: style.mobileDrawer,
        header: style.mobileDrawerHeader,
        title: style.mobileDrawerTitle,
        close: style.mobileDrawerClose,
        body: style.mobileDrawerBody,
      }}
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 4,
      }}
    >
      <div dir={locale === "fa" ? "rtl" : "ltr"}>
        <Stack gap={4}>
          <Group mb={"lg"}>
            <LanguageSwitcher />
          </Group>
          <Link
            href="/"
            onClick={handleNavigation}
            className={
              isActive("/") ? style.mobileActiveLink : style.mobileLink
            }
          >
            <Group gap={"xs"}>
              <IconHome size={18} color="var(--mantine-color-surface-9)" />
              <Text size="sm" c="textMain.2">
                {t("Home")}
              </Text>
            </Group>
          </Link>

          <Link
            href="/books"
            onClick={handleNavigation}
            className={
              isActive("/books") ? style.mobileActiveLink : style.mobileLink
            }
          >
            <Group gap={"xs"}>
              <IconBook size={18} color="var(--mantine-color-surface-9)" />
              <Text size="sm" c="textMain.2">
                {t("Books")}
              </Text>
            </Group>
          </Link>

          {user && (
            <Link
              href="/orders"
              onClick={handleNavigation}
              className={
                isActive("/orders") ? style.mobileActiveLink : style.mobileLink
              }
            >
              <Group gap={"xs"}>
                <IconReceipt size={18} color="var(--mantine-color-surface-9)" />
                <Text size="sm" c="textMain.2">
                  {t("Orders")}
                </Text>
              </Group>
            </Link>
          )}

          <HorizontalDivider my="md" />
          {isLoading ? (
            <Center h={40}>
              <Loader size="sm" type="dots" color="surface.9" />
            </Center>
          ) : user ? (
            <Stack gap={4} w="100%">
              <Link
                href="/profile"
                onClick={handleNavigation}
                className={
                  isActive("/profile")
                    ? style.mobileActiveLink
                    : style.mobileLink
                }
              >
                <Group gap="xs">
                  <IconUser size={18} color="var(--mantine-color-surface-9)" />
                  <Text size="sm" c="textMain.2">
                    {user.name || t("Profile")}
                  </Text>
                </Group>
              </Link>

              <Button
                variant="subtle"
                color="textMain.2"
                fw={"normal"}
                fullWidth
                justify="flex-start"
                leftSection={
                  <IconLogout
                    size={18}
                    color="var(--mantine-color-surface-9)"
                  />
                }
                onClick={() => {
                  handleNavigation();
                  logout();
                }}
              >
                {t("Logout")}
              </Button>
            </Stack>
          ) : (
            <Button
              variant="subtle"
              color="textMain.2"
              fw={"normal"}
              fullWidth
              justify="flex-start"
              leftSection={
                <IconLogout size={18} color="var(--mantine-color-surface-9)" />
              }
              onClick={() => {
                handleNavigation();
                router.push("/login");
              }}
            >
              {t1("SignIn")}
            </Button>
          )}
        </Stack>
      </div>
    </Drawer>
  );
}
