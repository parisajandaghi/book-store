import { Order } from "@/features/orders/order.type";
import { Center, Table, Text } from "@mantine/core";
import { IconShoppingCartOff } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { AdminOrderRow } from "./admin-orders-row";
import AdminOrdersTableSkeleton from "./admin-orders-table-skeleton";

interface AdminOrdersTableProps {
  orders: Order[];
  isLoading?: boolean;
}

export function AdminOrdersTable({ orders, isLoading }: AdminOrdersTableProps) {
  const t = useTranslations("Admin");

  if (!isLoading && orders.length === 0) {
    return (
      <Center h={250} style={{ flexDirection: "column" }}>
        <IconShoppingCartOff size={70} color="#a9a9a9" stroke={1.5} />
        <Text c="surface.6" size="xl" fw={600} mt="md">
          {t("NoOrdersFound")}
        </Text>
      </Center>
    );
  }

  return (
    <Table.ScrollContainer minWidth={850}>
      <Table
        verticalSpacing="sm"
        highlightOnHover
        borderColor="rgba(255, 255, 255, 0.08)"
        highlightOnHoverColor="rgba(255, 255, 255, 0.04)"
      >
        <Table.Thead>
          <Table.Tr c="textMain.0" fz="xs">
            <Table.Th ta={"center"}>{t("OrderId")}</Table.Th>
            <Table.Th ta={"center"}>{t("Customer")}</Table.Th>
            <Table.Th ta={"center"}>{t("Date")}</Table.Th>
            <Table.Th ta={"center"}>{t("TotalAmount")}</Table.Th>
            <Table.Th ta={"center"}>{t("Status")}</Table.Th>
            <Table.Th ta={"center"}>{t("TrackingCode")}</Table.Th>
            <Table.Th ta={"center"}>{t("Actions")}</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {isLoading ? (
            <AdminOrdersTableSkeleton />
          ) : (
            orders.map((order) => (
              <AdminOrderRow key={order.id} order={order} />
            ))
          )}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
