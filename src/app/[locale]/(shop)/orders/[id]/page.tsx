"use client";
import { useStatusBadge } from "@/features/admin/hooks/use-status-badge";
import OrderItems from "@/features/orders/components/order-items";
import OrderSummary from "@/features/orders/components/order-summary";
import ShoppingInfo from "@/features/orders/components/shopping-info";
import { useCancelOrder } from "@/features/orders/hooks/use-cancel-order";
import { useOrderDetails } from "@/features/orders/hooks/use-order.details";
import { useReOrder } from "@/features/orders/hooks/use-reorders";
import { notify } from "@/utils/notification";
import {
  Badge,
  Button,
  Center,
  Container,
  Flex,
  Group,
  Loader,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  IconCalendarWeek,
  IconPackage,
  IconRefresh,
  IconTrash,
} from "@tabler/icons-react";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";

export default function OrderDetails() {
  const t = useTranslations("OrderDetails");
  const t1 = useTranslations("Notifications");
  const params = useParams();
  const locale = useLocale();
  const { reorder, isReordering } = useReOrder();
  const orderId = params.id as string;
  const { cancelOrder, isCancelling } = useCancelOrder(orderId);
  const { error, isLoading, order } = useOrderDetails(orderId);
  const { getStatusBadge } = useStatusBadge();

  if (isLoading) {
    return (
      <Center h={400}>
        <Loader color="surface.9" />
      </Center>
    );
  }

  if (error || !order) {
    return (
      <Center h={400}>
        <Text c="red">{error || t("OrderNotFound")}</Text>
      </Center>
    );
  }

  const handleCancelClick = async () => {
    try {
      await cancelOrder();
      notify.success({
        title: t1("SuccessTitle"),
        message: t1("CancelSuccess"),
      });
    } catch (err: unknown) {
      console.error(err);
      const message = err instanceof Error ? err.message : t1("CancelError");
      notify.error({
        title: t1("ErrorTitle"),
        message,
      });
    }
  };

  const handleReorderClick = async () => {
    if (!order.order_items || order.order_items.length === 0) return;

    try {
      await reorder(order.order_items);
      notify.success({
        title: t("SuccessTitle"),
        message: t("ReorderSuccess"),
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : t("ReorderError");
      notify.error({
        title: t("ErrorTitle"),
        message,
      });
    }
  };
  const isCancelDisabled = order.status !== "pending" || isCancelling;

  return (
    <Container
      w="100%"
      maw="75rem"
      p={{ base: "xs", sm: "md" }}
      style={{
        backgroundColor: "#1f0f1fa8",
        borderRadius: 8,
      }}
      styles={{
        root: {
          borderColor: "rgba(255,255,255,0.08)",
        },
      }}
    >
      <Flex direction={{ base: "column", md: "row" }} gap="md" align="stretch">
        <Stack flex={{ base: "1 1 auto", md: 1 }} p="xs">
          <Stack flex={1}>
            <Group gap="xl">
              <Title c="textMain.2" order={2}>
                {t("Order")}
              </Title>
              <Badge color="surface.7" variant="light" size="xl" radius="lg">
                <Center>
                  <Title
                    c="surface.6"
                    order={3}
                    style={{
                      fontFamily:
                        locale === "en"
                          ? "system-ui, -apple-system, sans-serif"
                          : undefined,
                    }}
                  >
                    {order.id}
                  </Title>
                </Center>
              </Badge>
            </Group>
            <Group gap={5} c="textMain.3">
              <IconCalendarWeek color="var(--mantine-color-surface-9)" />
              <Text fz="xs">{t("OrderDate")}</Text>
              <Text>:</Text>
              <Text
                fz="xs"
                style={{
                  fontFamily:
                    locale === "en"
                      ? "system-ui, -apple-system, sans-serif"
                      : undefined,
                }}
              >
                {order.created_at
                  ? new Date(order.created_at).toLocaleDateString(
                      locale === "fa" ? "fa-IR" : "en-US",
                    )
                  : "---"}
              </Text>
            </Group>
            <Group gap={5} c="textMain.3">
              <IconPackage color="var(--mantine-color-surface-9)" />
              <Text fz="xs">{t("OrderStatus")}</Text>
              <Text>:</Text>
              {getStatusBadge(order.status)}
            </Group>
          </Stack>

          <OrderSummary
            subtotal={order.subtotal}
            shippingFee={order.shipping_fee}
            totalAmount={order.total}
          />

          <Stack p="xs" justify="center">
            {order.status.toLocaleLowerCase() === "cancelled" ? (
              <Button
                onClick={handleReorderClick}
                bg="secondary.0"
                bd="1px solid #7b6210"
                leftSection={
                  <IconRefresh
                    size={16}
                    color="var(--mantine-color-surface-9)"
                  />
                }
                loading={isReordering}
              >
                <Text fz="xs" c="surface.9">
                  {t("ReOrder")}
                </Text>
              </Button>
            ) : (
              <Button
                onClick={handleCancelClick}
                bg={isCancelDisabled ? "#f1f3f542" : "secondary.0"}
                bd={
                  isCancelDisabled ? "1px solid #e9ecef56" : "1px solid #C5705D"
                }
                leftSection={
                  <IconTrash
                    size={16}
                    color={isCancelDisabled ? "#adb5bd" : "#C5705D"}
                  />
                }
                disabled={isCancelDisabled}
                loading={isCancelling}
              >
                <Text fz="xs" c={isCancelDisabled ? "#adb5bd" : "#C5705D"}>
                  {t("CancelOrder")}
                </Text>
              </Button>
            )}
          </Stack>
        </Stack>

        <Stack
          flex={{ base: "1 1 auto", md: 3 }}
          p="xs"
          style={{ minWidth: 0 }}
        >
          <OrderItems items={order.order_items || []} />
          <ShoppingInfo
            name={order.recipient_name}
            address={order.address}
            phone_number={order.phone}
            tracking_code={order.tracking_code}
          />
        </Stack>
      </Flex>
    </Container>
  );
}
