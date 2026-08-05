"use client";
import EmptyOrderState from "@/features/orders/components/empty-order-state";
import OrderCard from "@/features/orders/components/order-card";
import { useOrderHistory } from "@/features/orders/hooks/use-order-history";
import { filterStatusAtom } from "@/store/order-atom";
import { Container, Group, Select, Title } from "@mantine/core";
import { useAtom } from "jotai";
import { useTranslations } from "next-intl";

export default function Orders() {
  const t = useTranslations("Orders");
  const [filterStatus, setFilterStatus] = useAtom(filterStatusAtom);
  const { orders } = useOrderHistory();

  return (
    <>
      {orders.length !== 0 ? (
        <Container pt={40} pb={40}>
          <Group justify="space-between" align="center" mb="xl">
            <Title order={2} c="textMain.2">
              {t("Title")}
            </Title>
            <Select
              placeholder={t("Sort.OrderStatus")}
              value={filterStatus}
              onChange={setFilterStatus}
              data={[
                { value: "all", label: t("Sort.AllOrders") },
                { value: "pending", label: t("Status.pending") },
                { value: "processing", label: t("Status.processing") },
                { value: "delivered", label: t("Status.delivered") },
                { value: "cancelled", label: t("Status.cancelled") },
              ]}
              w={150}
              classNames={{
                input: "custom-select-input",
                dropdown: "custom-select-dropdown",
                option: "custom-select-option",
              }}
            />
          </Group>

          <OrderCard />
        </Container>
      ) : (
        <EmptyOrderState />
      )}
    </>
  );
}
