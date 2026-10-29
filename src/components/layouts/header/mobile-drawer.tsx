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
import React from "react";
import LanguageSwitcher from "./language-switcher";
import { IconLogout, IconUser } from "@tabler/icons-react";
import { useUser } from "@/features/profile/hook/use-user";
import style from "./header.module.css";
import { useLocale, useTranslations } from "next-intl";
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
      onClose={close}
      position={locale === "fa" ? "right" : "left"}
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
      transitionProps={{
        duration: 220,
        timingFunction: "ease",
      }}
    >
      <Stack gap={4}>
        <Link
          href="/"
          onClick={handleNavigation}
          className={isActive("/") ? style.mobileActiveLink : style.mobileLink}
        >
          <Text size="sm" c="textMain.2">
            {t("Home")}
          </Text>
        </Link>

        <Link
          href="/books"
          onClick={handleNavigation}
          className={
            isActive("/books") ? style.mobileActiveLink : style.mobileLink
          }
        >
          <Text size="sm" c="textMain.2">
            {t("Books")}
          </Text>
        </Link>

        {user && (
          <Link
            href="/orders"
            onClick={handleNavigation}
            className={
              isActive("/orders") ? style.mobileActiveLink : style.mobileLink
            }
          >
            <Text size="sm" c="textMain.2">
              {t("Orders")}
            </Text>
          </Link>
        )}

        <LanguageSwitcher />
        <div className={style.mobileDivider} />

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
                isActive("/profile") ? style.mobileActiveLink : style.mobileLink
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
                <IconLogout size={18} color="var(--mantine-color-surface-9)" />
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
    </Drawer>
  );
}
