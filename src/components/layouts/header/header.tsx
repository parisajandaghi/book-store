"use client";

import {
  Badge,
  Button,
  Burger,
  Center,
  Drawer,
  Group,
  Loader,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconLogin,
  IconLogin2,
  IconShoppingCartFilled,
} from "@tabler/icons-react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "../../../navigation";
import style from "./header.module.css";
import LanguageDropdown from "./language-dropdown";

import VerticalDivider from "@/components/ui/elements/vertical-divider";
import { useCart } from "@/features/carts/hooks/use-cart";
import UserProfile from "@/features/profile/components/UserProfile";
import { useUser } from "@/features/profile/hook/use-user";

function Header() {
  const { cartCount } = useCart();
  const locale = useLocale();
  const { isLoading, user } = useUser();
  const t = useTranslations("Header");
  const t1 = useTranslations("Login");
  const pathName = usePathname();

  const [mobileMenuOpened, { open, close }] = useDisclosure(false);

  const isActive = (path: string) => {
    if (path === "/") return pathName === "/";
    return pathName.startsWith(path);
  };

  const handleNavigation = () => {
    close();
  };

  return (
    <>
      <Group className={style.header}>
        {/* Logo + Desktop Navigation */}
        <Group className={style.headerLeft}>
          <Link href="/" className={style.title}>
            <Group gap={3} wrap="nowrap">
              <Title order={4} c="surface.3">
                {t("Book")}
              </Title>

              <Title order={4} c="textMain.2">
                {t("Store")}
              </Title>
            </Group>
          </Link>

          <Group gap="xs" className={style.navigation}>
            <Link
              href="/"
              className={isActive("/") ? style.activeLink : style.link}
            >
              <Text size="sm" c="textMain.2">
                {t("Home")}
              </Text>
            </Link>

            <Link
              href="/books"
              className={isActive("/books") ? style.activeLink : style.link}
            >
              <Text size="sm" c="textMain.2">
                {t("Books")}
              </Text>
            </Link>

            {user && (
              <Link
                href="/orders"
                className={isActive("/orders") ? style.activeLink : style.link}
              >
                <Text size="sm" c="textMain.2">
                  {t("Orders")}
                </Text>
              </Link>
            )}

            <LanguageDropdown />
          </Group>
        </Group>

        {/* Desktop Actions + Mobile Actions */}
        <Group className={style.headerActions}>
          {/* Cart - visible on desktop and mobile */}
          <Link
            href="/cart"
            className={isActive("/cart") ? style.activeLink : style.link}
          >
            <Group className={style.cartWrapper} c="textMain.2">
              <IconShoppingCartFilled size={20} />

              <Badge className={style.cartBadge} color="surface.3" size="xs">
                {cartCount}
              </Badge>
            </Group>
          </Link>

          {/* Desktop authentication */}
          <Group className={style.authSection}>
            {isLoading ? (
              <Center className={style.authLoader}>
                <Loader size="sm" type="dots" color="surface.9" />
              </Center>
            ) : user ? (
              <UserProfile />
            ) : (
              <Link href="/login" className={style.authLink}>
                <Button
                  bg="#1f0f1f48"
                  className={style.authButton}
                  w={locale === "fa" ? 145 : 170}
                >
                  <Group c="surface.9" wrap="nowrap">
                    <Group gap={5} wrap="nowrap">
                      <Text c="textMain.0" fz={12}>
                        {t1("SignIn")}
                      </Text>

                      <VerticalDivider />

                      <Text c="textMain.0" fz={12}>
                        {t1("Register")}
                      </Text>
                    </Group>

                    {locale === "fa" ? (
                      <IconLogin2
                        size={20}
                        color="var(--mantine-color-surface-9)"
                      />
                    ) : (
                      <IconLogin
                        size={20}
                        color="var(--mantine-color-surface-9)"
                      />
                    )}
                  </Group>
                </Button>
              </Link>
            )}
          </Group>

          {/* Mobile menu trigger */}
          <Burger
            opened={mobileMenuOpened}
            onClick={mobileMenuOpened ? close : open}
            className={style.mobileBurger}
            size="sm"
            color="var(--mantine-color-surface-9)"
            aria-label={mobileMenuOpened ? "Close menu" : "Open menu"}
          />
        </Group>
      </Group>

      {/* Mobile Drawer */}
      <Drawer
        opened={mobileMenuOpened}
        onClose={close}
        position={locale === "fa" ? "right" : "left"}
        size="min(82vw, 320px)"
        withCloseButton={false}
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
            className={
              isActive("/") ? style.mobileActiveLink : style.mobileLink
            }
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
                isActive("/orders")
                  ? style.mobileActiveLink
                  : style.mobileLink
              }
            >
              <Text size="sm" c="textMain.2">
                {t("Orders")}
              </Text>
            </Link>
          )}

          <div className={style.mobileLanguage}>
            <LanguageDropdown />
          </div>

          <div className={style.mobileDivider} />

          <div className={style.mobileAuth}>
            {isLoading ? (
              <Center h={40}>
                <Loader size="sm" type="dots" color="surface.9" />
              </Center>
            ) : user ? (
              <UserProfile />
            ) : (
              <Link
                href="/login"
                onClick={handleNavigation}
                className={style.mobileAuthLink}
              >
                <Button
                  bg="#1f0f1f48"
                  fullWidth
                  className={style.authButton}
                >
                  <Group
                    c="surface.9"
                    wrap="nowrap"
                    justify="center"
                  >
                    <Group gap={5} wrap="nowrap">
                      <Text c="textMain.0" fz={12}>
                        {t1("SignIn")}
                      </Text>

                      <VerticalDivider />

                      <Text c="textMain.0" fz={12}>
                        {t1("Register")}
                      </Text>
                    </Group>

                    {locale === "fa" ? (
                      <IconLogin2
                        size={20}
                        color="var(--mantine-color-surface-9)"
                      />
                    ) : (
                      <IconLogin
                        size={20}
                        color="var(--mantine-color-surface-9)"
                      />
                    )}
                  </Group>
                </Button>
              </Link>
            )}
          </div>
        </Stack>
      </Drawer>
    </>
  );
}

export default Header;