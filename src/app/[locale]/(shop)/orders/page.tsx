"use client";
import EmptyOrderState from "@/features/orders/components/empty-order-state";
import OrderCard from "@/features/orders/components/order-card";
import { useOrderHistory } from "@/features/orders/hooks/use-order-history";
import { filterStatusAtom } from "@/store/order-atom";
import {
  Container,
  Group,
  ScrollArea,
  Select,
  Stack,
  Title,
} from "@mantine/core";
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
          // pt={{ base: 20, sm: 40 }}
          // pb={{ base: 20, sm: 40 }}
          // px={{ base: "xs", sm: "md" }}
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
              w={{ base: 110, sm: 150 }}
              classNames={{
                input: "custom-select-input",
                dropdown: "custom-select-dropdown",
                option: "custom-select-option",
              }}
            />
          </Group>

          <ScrollArea offsetScrollbars scrollbarSize={6} w="100%">
            <Stack align="center" w="100%" pb="xs" >
              <OrderCard />
            </Stack>
          </ScrollArea>
        </Container>
      ) : (
        <EmptyOrderState />
      )}
    </>
  );
}
