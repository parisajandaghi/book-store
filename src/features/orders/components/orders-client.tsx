"use client";

import EmptyOrderState from "@/features/orders/components/empty-order-state";
import OrderCard from "@/features/orders/components/order-card";
import { useOrderHistory } from "@/features/orders/hooks/use-order-history";
import { Order } from "@/features/orders/order.type";
import { filterStatusAtom } from "@/store/order-atom";
import { Box, Container, Group, Select, Title } from "@mantine/core";
import { IconPackage } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useTranslations } from "next-intl";

interface OrdersClientProps {
  initialOrders: Order[];
}

export default function OrdersClient({ initialOrders }: OrdersClientProps) {
  const t = useTranslations("Orders");

  const [filterStatus, setFilterStatus] = useAtom(filterStatusAtom);

  const { orders, isLoading } = useOrderHistory(initialOrders);

  if (!isLoading && orders.length === 0) {
    return <EmptyOrderState />;
  }

  return (
    <Container
      size="55rem"
      w="100%"
      pt={{ base: 16, sm: 32 }}
      pb={{ base: 24, sm: 40 }}
      px={{ base: "xs", sm: "md" }}
    >
      <Group
        justify="space-between"
        align="center"
        wrap="nowrap"
        mb="3rem"
        // mt={"lg"}
        style={{
          position: "sticky",
          top: "95px",
          zIndex: 100,
          width: "100%",
          padding: "8px 16px",
          borderRadius: "999px",
          background: "rgba(25, 12, 26, 0.88)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid #7b6210",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.35)",
        }}
      >
        <Group
          gap={8}
          align="center"
          wrap="nowrap"
          style={{ flexShrink: 1, minWidth: 0 }}
        >
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
              minWidth: 32,
              borderRadius: "50%",
              background:
                "linear-gradient(135deg, rgba(230, 180, 230, 0.25), rgba(255, 255, 255, 0.05))",
              border: "1px solid rgba(255, 255, 255, 0.18)",
              color: "#f3d9fa",
            }}
          >
            <IconPackage size={18} stroke={1.7} />
          </Box>

          <Title
            order={2}
            c="white"
            fz={{ base: "0.92rem", xs: "1.05rem", sm: "1.2rem" }}
            style={{
              fontWeight: 700,
              letterSpacing: "-0.2px",
              lineHeight: 1,
              whiteSpace: "nowrap",
            }}
          >
            {t("Title")}
          </Title>
        </Group>

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
          w={{ base: 110, xs: 130, sm: 160 }}
          style={{ flexShrink: 0 }}
          classNames={{
            input: "custom-select-input",
            dropdown: "custom-select-dropdown",
            option: "custom-select-option",
          }}
        />
      </Group>

      <OrderCard orders={orders} isLoading={isLoading} />
    </Container>
  );
}
