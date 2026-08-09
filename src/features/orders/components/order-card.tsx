"use client";
import { Link } from "@/navigation";
import { getFormattedPrice } from "@/utils/book.utils";
import {
  Badge,
  Card,
  Center,
  Group,
  Loader,
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
import { useOrderHistory } from "../hooks/use-order-history";
import style from "../order-card.module.css";
import { OrderStatus } from "../order.type";
import { filterStatusAtom } from "@/store/order-atom";
import { useAtom } from "jotai";
import GlassPanel from "@/components/ui/glass/glass-panel";
const statusConfig: Record<
  OrderStatus,
  { icon: React.ElementType; color: string }
> = {
  pending: { icon: IconClock, color: "surface" },
  processing: { icon: IconLoader, color: "surface" },
  delivered: { icon: IconCircleCheck, color: "#86A789" },
  cancelled: { icon: IconCircleX, color: "#C5705D" },
};

export default function OrderCard() {
  const [filterStatus] = useAtom(filterStatusAtom);
  const t1 = useTranslations("Orders");
  const t2 = useTranslations("Product");
  const locale = useLocale();
  const ChevronIcon = locale === "fa" ? IconChevronLeft : IconChevronRight;
  const { orders, isLoading, error } = useOrderHistory();
  if (isLoading) {
    return (
      <Center h={200}>
        <Loader color="surface.9" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h={200}>
        <Text c="red">خطا در دریافت لیست سفارشات</Text>
      </Center>
    );
  }


  const filteredOrders = orders.filter((order) => {
    if (filterStatus === "all") return true;
    return order.status === filterStatus;
  });
  return (
    <SimpleGrid cols={{ base: 1 }}>
      {filteredOrders.length > 0 ? (
        filteredOrders.map((item) => {
          const formattedPrice = getFormattedPrice(item.total, locale);

          const currentStatus = statusConfig[item.status] || {
            icon: IconShoppingBag,
            color: "surface",
          };
          const StatusIcon = currentStatus.icon;
          console.log("item", item);

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
                      <Text
                        size="sm"
                        c={"textMain.2"}
                        style={{
                          fontFamily:
                            locale === "en"
                              ? "system-ui, -apple-system, sans-serif"
                              : undefined,
                        }}
                      >
                        {item.id}
                      </Text>
                    </Stack>
                    <Stack flex={2} justify="center" align="center">
                      <Text size="sm" c={"surface.9"}>
                        {t1("TableHeaders.Date")}
                      </Text>
                      <Text
                        size="sm"
                        c={"textMain.2"}
                        dir="ltr"
                        style={{
                          fontFamily:
                            locale === "en"
                              ? "system-ui, -apple-system, sans-serif"
                              : undefined,
                        }}
                      >
                        {item.created_at ? (
                          <>
                            {new Date(item.created_at).toLocaleDateString(
                              locale === "fa" ? "fa-IR" : "en-US",
                            )}
                            {" - "}
                            {new Date(item.created_at).toLocaleTimeString(
                              locale === "fa" ? "fa-IR" : "en-US",
                              { hour: "2-digit", minute: "2-digit" },
                            )}
                          </>
                        ) : (
                          "---"
                        )}
                      </Text>
                    </Stack>
                    <Stack flex={1} justify="center" align="center">
                      <Text size="sm" c={"surface.9"}>
                        {t1("TableHeaders.Total")}
                      </Text>
                      <Text
                        size="sm"
                        c={"textMain.2"}
                        ff={
                          locale === "en" ? "system-ui, sans-serif" : "inherit"
                        }
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
        })
      ) : (
        <GlassPanel h={100} w={500} justify="center" align="center" p={"md"}>
          <Text c="surface.6" size="xl" fw={"bold"}>
            {t1("Sort.NoOrdersFound")}
          </Text>
        </GlassPanel>
      )}
    </SimpleGrid>
  );
}
