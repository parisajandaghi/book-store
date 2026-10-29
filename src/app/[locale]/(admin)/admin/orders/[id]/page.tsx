"use client";

import PrimaryButton from "@/components/ui/action-panel/primary-button";
import GlassPanel from "@/components/ui/glass/glass-panel";
import CostumerInformation from "@/features/admin/components/costumer-information";
import { useAdminOrder } from "@/features/admin/hooks/use-admin-orders";
import { useStatusBadge } from "@/features/admin/hooks/use-status-badge";
import OrderItems from "@/features/orders/components/order-items";
import OrderSummary from "@/features/orders/components/order-summary";
import { useRouter } from "@/navigation";
import {
  ActionIcon,
  Center,
  Grid,
  Group,
  Loader,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconArrowRight,
  IconCheck,
  IconEdit,
} from "@tabler/icons-react";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useState } from "react";
import style from "../../../../../../features/carts/cart.module.css";

export default function AdminOrderDetailsPage() {
  const t = useTranslations("Admin");
  const t1 = useTranslations("Orders");
  const t2 = useTranslations("Notifications");
  const locale = useLocale();
  const router = useRouter();
  const params = useParams();

  const orderId = params.id as string;

  const { order, error, isLoading, updateOrder } = useAdminOrder(orderId);

  const { getStatusBadge } = useStatusBadge();

  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [trackingCodeInput, setTrackingCodeInput] = useState<string | null>(
    null,
  );

  if (isLoading) {
    return (
      <Center h={400}>
        <Loader size="lg" color="surface.9" />
      </Center>
    );
  }

  if (error || !order) {
    return (
      <Center h={400}>
        <GlassPanel p="xl" style={{ textAlign: "center", maxWidth: 400 }}>
          <Stack align="center" gap="sm">
            <Text fw={600} size="lg" c="red.4">
              {t2("SomethingWentWrong")}
            </Text>
            <Text size="sm" c="dimmed">
              {t1("OrderNotFound") || t("Order")}
            </Text>
          </Stack>
        </GlassPanel>
      </Center>
    );
  }

  const currentStatus = (
    selectedStatus ??
    order.status ??
    "pending"
  ).toLowerCase();
  const originalStatus = (order.status ?? "pending").toLowerCase();

  const currentTrackingCode = (
    trackingCodeInput ??
    order.tracking_code ??
    ""
  ).trim();
  const originalTrackingCode = (order.tracking_code ?? "").trim();

  const hasChanges =
    currentStatus !== originalStatus ||
    currentTrackingCode !== originalTrackingCode;
  const handleUpdateOrder = async () => {
    if (!hasChanges) return;

    setIsUpdating(true);

    try {
      await updateOrder({
        status: currentStatus,
        tracking_code: currentTrackingCode,
      });

      setSelectedStatus(null);
      setTrackingCodeInput(null);
    } catch {
    } finally {
      setIsUpdating(false);
    }
  };
  const isRtl = locale === "fa";
  const BackIcon = isRtl ? IconArrowLeft : IconArrowRight;
  const fontStyle = locale === "en" ? "system-ui, sans-serif" : "inherit";

  return (
    <Stack
      gap="lg"
      w="100%"
      maw={1400}
      mx="auto"
      px={{
        base: 0,
        sm: "xs",
      }}
    >
      <GlassPanel p={{ base: "sm", sm: "md" }}>
        <Group justify="space-between" align="center" wrap="nowrap">
          <Stack gap={4}>
            <Text
              size="lg"
              fz={{ base: "md", sm: "xl" }}
              fw={700}
              c="textMain.0"
              ff={fontStyle}
            >
              {t("Order")} : {orderId}
            </Text>

            <Group gap="xs" wrap="wrap">
              {getStatusBadge(order.status)}

              <Text
                size="xs"
                fz={{ base: "xs", sm: "sm" }}
                c="#ffffffd9"
                dir="ltr"
                ff={fontStyle}
              >
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
            </Group>
          </Stack>

          <ActionIcon
            variant="outline"
            color="var(--mantine-color-surface-9)"
            size="lg"
            onClick={() => router.back()}
          >
            <BackIcon size={20} />
          </ActionIcon>
        </Group>
      </GlassPanel>

      <Grid gutter={{ base: "md", md: "lg" }} align="stretch" w="100%">
        <Grid.Col span={{ base: 12, md: 8 }}>
          <OrderItems items={order.order_items || []} />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <GlassPanel
            p={{ base: "md", sm: "lg" }}
            style={{ width: "100%", height: "100%" }}
          >
            <Group gap="sm" mb="md">
              <IconEdit size={20} color="var(--mantine-color-surface-9)" />
              <Text c="textMain.0" fw={500}>
                {t("AdminActions")}
              </Text>
            </Group>

            <Stack gap="md">
              <Select
                label={t("Status")}
                placeholder={t("Status")}
                value={currentStatus}
                onChange={setSelectedStatus}
                data={[
                  { value: "pending", label: t1("Status.pending") },
                  { value: "processing", label: t1("Status.processing") },
                  { value: "delivered", label: t1("Status.delivered") },
                  { value: "cancelled", label: t1("Status.cancelled") },
                ]}
                classNames={{
                  dropdown: "custom-select-dropdown",
                  option: "custom-select-option",
                  input: style.input,
                  label: style.label,
                }}
              />

              <TextInput
                label={t("TrackingCode")}
                placeholder={t("TrackingCode")}
                value={currentTrackingCode}
                classNames={{
                  input: style.input,
                  label: style.label,
                }}
                onChange={(e) => setTrackingCodeInput(e.currentTarget.value)}
              />

              <PrimaryButton
                btnText={t("UpdateOrder")}
                icon={
                  <IconCheck size={18} color="var(--mantine-color-surface-9)" />
                }
                isLoading={isUpdating}
                onClick={handleUpdateOrder}
                mt="sm"
              />
            </Stack>
          </GlassPanel>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 8 }}>
          <OrderSummary
            subtotal={order.subtotal}
            shippingFee={order.shipping_fee}
            totalAmount={order.total}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <CostumerInformation
            address={order.address}
            email={order.customer_email}
            name={order.customer_name}
            phone={order.phone}
          />
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
