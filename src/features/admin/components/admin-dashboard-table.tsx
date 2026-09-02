"use client";

import GlassPanel from "@/components/ui/glass/glass-panel";
import { ActionIcon, Button, Group, Table, Text } from "@mantine/core";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

import { Link } from "@/navigation";
import { getFormattedPrice } from "@/utils/book.utils";
import { useLocale } from "next-intl";
import { useTranslations } from "use-intl";
import { useOrderHistory } from "../../orders/hooks/use-order-history";
import { Order } from "../../orders/order.type";
import { useStatusBadge } from "../hooks/use-status-badge";

export default function AdminDashboardTable() {
  const { orders } = useOrderHistory();
  const { getStatusBadge } = useStatusBadge();
  const t1 = useTranslations("Admin");
  const t2 = useTranslations("Product");
  const locale = useLocale();
  const recentOrders = orders?.slice(0, 5) || [];

  const rows = recentOrders.map((order: Order) => {
    const icon =
      locale === "fa" ? (
        <IconArrowLeft size={18} stroke={1.5} color="#d4af37" />
      ) : (
        <IconArrowRight size={18} stroke={1.5} color="#d4af37" />
      );
    const formattedPrice = getFormattedPrice(order.total, locale);
    return (
      <Table.Tr key={order.id} c={"textMain.0"}>
        <Table.Td ta={"center"}>
          <Text
            fw={500}
            size="sm"
            ff={locale === "en" ? "system-ui, sans-serif" : "inherit"}
          >
            {order.id}
          </Text>
        </Table.Td>
        <Table.Td ta={"center"}>{order.recipient_name}</Table.Td>

        <Table.Td
          ta={"center"}
          dir="ltr"
          style={{
            fontFamily:
              locale === "en"
                ? "system-ui, -apple-system, sans-serif"
                : undefined,
          }}
        >
          {order.created_at ? (
            <>
              {new Date(order.created_at).toLocaleDateString(
                locale === "fa" ? "fa-IR" : "en-US",
              )}
              {" - "}
              {new Date(order.created_at).toLocaleTimeString(
                locale === "fa" ? "fa-IR" : "en-US",
                { hour: "2-digit", minute: "2-digit" },
              )}
            </>
          ) : (
            "---"
          )}
        </Table.Td>
        <Table.Td
          ta={"center"}
          ff={locale === "en" ? "system-ui, sans-serif" : "inherit"}
        >
          {locale === "en"
            ? `${t2("CurrencySymbol")} ${formattedPrice}`
            : `${formattedPrice} ${t2("CurrencySymbol")}`}
        </Table.Td>
        <Table.Td ta={"center"}>{getStatusBadge(order.status)}</Table.Td>
        <Table.Td ta={"center"}>
          <ActionIcon
            component={Link}
            href={`/admin/orders/${order.id}`}
            variant="filled"
            color="#d4af3731"
          >
            {icon}
          </ActionIcon>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <GlassPanel p={"md"} maw={800} mx="auto">
      <Group justify="space-between" mb="md">
        <Text size="lg" fw={600} c={"surface.9"}>
          {t1("RecentOrders")}
        </Text>
        <Button
          component={Link}
          href="/admin/orders"
          variant="outline"
          size="xs"
          color="#9b7d1b"
        >
          {t1("ViewAllOrders")}
        </Button>
      </Group>

      <Table.ScrollContainer minWidth={700}>
        <Table
          verticalSpacing="sm"
          highlightOnHover
          borderColor="rgba(255, 255, 255, 0.08)"
          highlightOnHoverColor="rgba(255, 255, 255, 0.04)"
        >
          <Table.Thead>
            <Table.Tr c={"textMain.0"} fz={"xs"}>
              <Table.Th ta={"center"}>{t1("OrderId")}</Table.Th>
              <Table.Th ta={"center"}>{t1("Customer")}</Table.Th>
              <Table.Th ta={"center"}>{t1("Date")}</Table.Th>
              <Table.Th ta={"center"}>{t1("TotalAmount")}</Table.Th>
              <Table.Th ta={"center"}>{t1("Status")}</Table.Th>
              <Table.Th ta={"center"}></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </GlassPanel>
  );
}
