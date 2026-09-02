"use client";
import { useStatusBadge } from "@/features/admin/hooks/use-status-badge";
import OrderItems from "@/features/orders/components/order-items";
import OrderSummary from "@/features/orders/components/order-summary";
import ShoppingInfo from "@/features/orders/components/shopping-info";
import { useCancelOrder } from "@/features/orders/hooks/use-cancel-order";
import { useOrderDetails } from "@/features/orders/hooks/use-order.details";
import { useReOrder } from "@/features/orders/hooks/use-reorders";
import {
  Badge,
  Button,
  Center,
  Container,
  Group,
  Loader,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  IconCalendarWeek,
  IconDownload,
  IconPackage,
  IconRefresh,
  IconTrash,
} from "@tabler/icons-react";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";

export default function OrderDetails() {
  const t = useTranslations("OrderDetails");

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
        <Text c="red">{error || "سفارش یافت نشد"}</Text>
      </Center>
    );
  }

  const handleCancelClick = async () => {
    try {
      // اجرای عملیات هوک
      await cancelOrder();

      // notifications.show({
      //   title: 'موفقیت',
      //   message: 'سفارش با موفقیت لغو شد.',
      //   color: 'green',
      // });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "خطای ناشناخته‌ای رخ داد.";
      // notifications.show({
      //   title: 'خطا',
      //   message: err.message,
      //   color: 'red',
      // });
    }
  };
  const handleReorderClick = async () => {
    if (order.order_items) {
      await reorder(order.order_items);
    }
  };

  const isCancelDisabled = order.status !== "pending" || isCancelling;
  console.log("order", order);

  return (
    <Container
      w={"100%"}
      p={"md"}
      style={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#1f0f1fa8",
        borderRadius: 8,
      }}
      styles={{
        root: {
          borderColor: "rgba(255,255,255,0.08)",
        },
      }}
    >
      <Stack flex={1} p={"xs"}>
        <Stack flex={1}>
          <Group gap={"xl"}>
            <Title c={"textMain.2"} order={2}>
              {t("Order")}
            </Title>
            <Badge color="surface.7" variant="light" size="xl" radius={"lg"}>
              <Center>
                <Title
                  c={"surface.6"}
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
          <Group gap={5} c={"textMain.3"}>
            <IconCalendarWeek color="var(--mantine-color-surface-9)" />
            <Text fz={"xs"}>{t("OrderDate")}</Text>
            <Text>:</Text>
            <Text
              fz={"xs"}
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
          <Group gap={5} c={"textMain.3"}>
            <IconPackage color="var(--mantine-color-surface-9)" />
            <Text fz={"xs"}>{t("OrderStatus")}</Text>
            <Text>:</Text>

            {getStatusBadge(order.status)}
          </Group>
        </Stack>
        <OrderSummary
          subtotal={order.subtotal}
          shippingFee={order.shipping_fee}
          totalAmount={order.total}
        />
        <Stack flex={1} p={"xs"} justify="center">
          {order.status.toLocaleLowerCase() === "cancelled" ? (
            <Button
              onClick={handleReorderClick}
              bg="secondary.0"
              bd="1px solid #7b6210"
              leftSection={
                <IconRefresh size={16} color="var(--mantine-color-surface-9)" />
              }
              loading={isReordering}
            >
              <Text fz={"xs"} c={"surface.9"}>
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
              <Text fz={"xs"} c={isCancelDisabled ? "#adb5bd" : "#C5705D"}>
                {t("CancelOrder")}
              </Text>
            </Button>
          )}
        </Stack>
      </Stack>

      <Stack flex={3} p={"xs"}>
        <OrderItems items={order.order_items || []} />
        <ShoppingInfo
          name={order.recipient_name}
          address={order.address}
          phone_number={order.phone}
          tracking_code={order.tracking_code}
        />
      </Stack>
    </Container>
  );
}
