import { Center, ScrollArea, Table, Text } from "@mantine/core";
import { IconShoppingCartOff } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { Order } from "@/features/orders/order.type";
import { AdminOrderRow } from "./admin-orders-row";

interface AdminOrdersTableProps {
  orders: Order[];
}

export function AdminOrdersTable({ orders }: AdminOrdersTableProps) {
  const t = useTranslations("Admin");

  return (
    <ScrollArea type="auto" offsetScrollbars>
      <Table
        verticalSpacing="sm"
        highlightOnHover
        borderColor="rgba(255, 255, 255, 0.08)"
        highlightOnHoverColor="rgba(255, 255, 255, 0.04)"
      >
        <Table.Thead>
          <Table.Tr c="textMain.0">
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
          {orders.length > 0 ? (
            orders.map((order) => (
              <AdminOrderRow key={order.id} order={order} />
            ))
          ) : (
            <Table.Tr>
              <Table.Td colSpan={7}>
                <Center h={150} style={{ flexDirection: "column" }}>
                  <IconShoppingCartOff size={80} color="#a9a9a9" stroke={1.5} />
                  <Text c="surface.6" size="lg" fw={600} mt="md">
                    {t("NoOrdersFound")}
                  </Text>
                </Center>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
