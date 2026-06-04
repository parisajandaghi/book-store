"use client";
import { Badge, Group, Text, Title } from "@mantine/core";
import { IconLogin, IconShoppingCartFilled } from "@tabler/icons-react";
import { usePathname, Link } from "../../../navigation";
import style from "./header.module.css";
import LanguageDropdown from "./language-dropdown";
import { useTranslations } from "next-intl";
import { useAtomValue } from "jotai";
import { cartCountAtom } from "@/store/cart-atom";
function Header() {
  const cartCount = useAtomValue(cartCountAtom);
  const t = useTranslations("Header");
  const pathName = usePathname();

  const isActive = (path: string) => {
    if (path === "/") return pathName === "/";
    return pathName.startsWith(path);
  };

  return (
    <Group className={style.header}>
      <Group>
        <Link href="/" className={style.title}>
          <Group gap={3}>
            <Title order={4} c="surface.3">
              {t("Book")}
            </Title>
            <Title order={4} c="textMain.2">
              {t("Store")}
            </Title>
          </Group>
        </Link>
        <Group gap={"xs"}>
          <Link
            href={"/"}
            className={isActive("/") ? style.activeLink : style.link}
          >
            <Text size="sm" c="textMain.2">
              {t("Home")}
            </Text>
          </Link>
          <Link
            href={"/books"}
            className={isActive("/books") ? style.activeLink : style.link}
          >
            <Text size="sm" c="textMain.2">
              {t("Books")}
            </Text>
          </Link>

          <Link
            href={"/orders"}
            className={isActive("/orders") ? style.activeLink : style.link}
          >
            <Text size="sm" c="textMain.2">
              {t("Orders")}
            </Text>
          </Link>
          <LanguageDropdown />
        </Group>
      </Group>

      <Group>
        <Link
          href={"/cart"}
          className={isActive("/cart") ? style.activeLink : style.link}
        >
          <Group className={style.cartWrapper} c="textMain.2">
            <IconShoppingCartFilled size={20} />
            <Badge className={style.cartBadge} color="surface.3" size="xs">
              {cartCount}
            </Badge>
          </Group>
        </Link>

        <Group c="surface.3">
          <IconLogin />
        </Group>
      </Group>
    </Group>
  );
}

export default Header;
