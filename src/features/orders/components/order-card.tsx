"use client";
import { Link } from "@/navigation";
import { getFormattedPrice } from "@/utils/book.utils";
import {
  Badge,
  Card,
  Group,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import {
  IconChevronLeft,
  IconChevronRight,
  IconCircleCheck,
  IconCircleX,
  IconClock,
  IconLoader,
  IconShoppingBag,
} from "@tabler/icons-react";
import { useLocale, useTranslations } from "next-intl";
import style from "../order-card.module.css";
import { mockOrders, OrderStatus } from "../order.type";
const statusConfig: Record<
  OrderStatus,
  { icon: React.ElementType; color: string }
> = {
  Pending: { icon: IconClock, color: "surface" },
  Processing: { icon: IconLoader, color: "surface" },
  Delivered: { icon: IconCircleCheck, color: "#86A789" },
  Cancelled: { icon: IconCircleX, color: "#C5705D" },
};
export default function OrderCard() {
  const t1 = useTranslations("Orders");
  const t2 = useTranslations("Product");
  const locale = useLocale();
  const ChevronIcon = locale === "fa" ? IconChevronLeft : IconChevronRight;
  return (
    <SimpleGrid cols={{ base: 1 }}>
      {mockOrders.map((item) => {
        const formattedPrice = getFormattedPrice(item.total, locale);

        const currentStatus = statusConfig[item.status] || {
          icon: IconShoppingBag,
          color: "surface",
        };
        const StatusIcon = currentStatus.icon;
        return (
          <Link
            href={`/orders/${item.id}`}
            key={item.id}
            style={{ textDecoration: "none" }}
          >
            <Card
              shadow="sm"
              radius="md"
              w={700}
              h={100}
              className={style.card}
            >
              <Group w={"100%"} align="center" justify="space-around">
                <Group>
                  <ThemeIcon
                    size={35}
                    radius="md"
                    variant="light"
                    color="surface"
                  >
                    <IconShoppingBag
                      size={23}
                      color="var(--mantine-color-surface-8)"
                    />
                  </ThemeIcon>
                </Group>
                <Group flex={1}>
                  <Stack justify="center" align="center">
                    <Text size="sm" c={"surface.9"}>
                      {t1("TableHeaders.OrderId")}
                    </Text>
                    <Text size="sm" c={"textMain.2"}>
                      {item.id}
                    </Text>
                  </Stack>
                  <Stack flex={2} justify="center" align="center">
                    <Text size="sm" c={"surface.9"}>
                      {t1("TableHeaders.Date")}
                    </Text>
                    <Text size="sm" c={"textMain.2"}>
                      {item.created_at}
                    </Text>
                  </Stack>
                  <Stack flex={1} justify="center" align="center">
                    <Text size="sm" c={"surface.9"}>
                      {t1("TableHeaders.Total")}
                    </Text>
                    <Text
                      size="sm"
                      c={"textMain.2"}
                      ff={locale === "en" ? "system-ui, sans-serif" : "inherit"}
                    >
                      {locale === "en"
                        ? `${t2("CurrencySymbol")} ${formattedPrice}`
                        : `${formattedPrice} ${t2("CurrencySymbol")}`}
                    </Text>
                  </Stack>
                </Group>
                <Group justify="center">
                  <Badge
                    variant="light"
                    color={currentStatus.color}
                    w={125}
                    h={30}
                    radius={"md"}
                    leftSection={<StatusIcon size={16} />}
                  >
                    <Text size="xs" fw={"bold"}>
                      {t1(`Status.${item.status}`)}
                    </Text>
                  </Badge>
                </Group>
                <Group>
                  <ChevronIcon
                    size={20}
                    color="var(--mantine-color-surface-9)"
                    cursor={"pointer"}
                  />
                </Group>
              </Group>
            </Card>
          </Link>
        );
      })}
    </SimpleGrid>
  );
}
