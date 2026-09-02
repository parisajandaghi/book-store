import { ActionIcon, Table, Text } from "@mantine/core";
import { IconEye } from "@tabler/icons-react";
import { Link } from "@/navigation";
import { Order } from "@/features/orders/order.type";
import { getFormattedPrice } from "@/utils/book.utils";
import { useStatusBadge } from "@/features/admin/hooks/use-status-badge";
import { useLocale, useTranslations } from "next-intl";

interface AdminOrderRowProps {
  order: Order;
}

export function AdminOrderRow({ order }: AdminOrderRowProps) {
  const locale = useLocale();
  const t1 = useTranslations("Product");
  const { getStatusBadge } = useStatusBadge();

  const formattedPrice = getFormattedPrice(order.total, locale);
  const fontStyle = locale === "en" ? "system-ui, sans-serif" : "inherit";

  return (
    <Table.Tr>
      <Table.Td ta={"center"}>
        <Text size="sm" fw={500} c="#ffffffd9">
          {order.id}
        </Text>
      </Table.Td>

      <Table.Td ta={"center"}>
        <Text size="sm" fw={500} c="#ffffffd9" ff={fontStyle}>
          {order.customer_name}
        </Text>
        <Text size="xs" c="dimmed" ff={fontStyle}>
          {order.customer_email}
        </Text>
      </Table.Td>

      <Table.Td ta={"center"}>
        <Text size="sm" c="#ffffffd9" dir="ltr" ff={fontStyle}>
          {order.created_at ? (
            <>
              {new Date(order.created_at).toLocaleDateString(
                locale === "fa" ? "fa-IR" : "en-US",
              )}
              {" - "}
              {new Date(order.created_at).toLocaleTimeString(
                locale === "fa" ? "fa-IR" : "en-US",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                },
              )}
            </>
          ) : (
            "---"
          )}
        </Text>
      </Table.Td>

      <Table.Td ta={"center"}>
        <Text size="sm" c="#ffffffd9" ff={fontStyle}>
          {locale === "en"
            ? `${t1("CurrencySymbol")} ${formattedPrice}`
            : `${formattedPrice} ${t1("CurrencySymbol")}`}
        </Text>
      </Table.Td>

      <Table.Td ta={"center"}>{getStatusBadge(order.status)}</Table.Td>

      <Table.Td ta={"center"} ff={fontStyle}>
        {order.tracking_code ? (
          <Text size="sm" fw={600} c="surface.9">
            {order.tracking_code}
          </Text>
        ) : (
          <Text size="sm" c="dimmed">
            -
          </Text>
        )}
      </Table.Td>

      <Table.Td ta={"center"}>
        <ActionIcon
          component={Link}
          href={`/admin/orders/${order.id}`}
          variant="light"
          color="surface.9"
          radius="md"
        >
          <IconEye size={18} />
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  );
}
