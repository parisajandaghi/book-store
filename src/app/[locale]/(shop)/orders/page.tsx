"use client";
import EmptyOrderState from "@/features/orders/components/empty-order-state";
import OrderCard from "@/features/orders/components/order-card";
import { useOrderHistory } from "@/features/orders/hooks/use-order-history";
import { filterStatusAtom } from "@/store/order-atom";
import { Container, Group, Select, Stack, Title } from "@mantine/core";
import { useAtom } from "jotai";
import { useTranslations } from "next-intl";

export default function Orders() {
  const t = useTranslations("Orders");
  const [filterStatus, setFilterStatus] = useAtom(filterStatusAtom);
  const { orders } = useOrderHistory();

  return (
    <>
      {orders.length !== 0 ? (
        <Container
          size="md"
          w="100%"
          pt={{ base: 16, sm: 32 }}
          pb={{ base: 24, sm: 40 }}
          px={{ base: "xs", sm: "md" }}
        >
          <Group
            justify="space-between"
            align="center"
            mb={{ base: "md", sm: "xl" }}
            wrap="nowrap"
            gap="xs"
          >
            <Title
              order={2}
              fz={{ base: "h5", xs: "h3", sm: "h2" }}
              c="textMain.2"
            >
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
              w={{ base: 130, sm: 160 }}
              classNames={{
                input: "custom-select-input",
                dropdown: "custom-select-dropdown",
                option: "custom-select-option",
              }}
            />
          </Group>

          <Stack align="stretch" w="100%">
            <OrderCard />
          </Stack>
        </Container>
      ) : (
        <EmptyOrderState />
      )}
    </>
  );
}
