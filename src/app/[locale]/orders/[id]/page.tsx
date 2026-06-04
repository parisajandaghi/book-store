"use client";
import OrderItems from "@/features/orders/components/order-items";
import OrderSummary from "@/features/orders/components/order-summary";
import ShoppingInfo from "@/features/orders/components/shopping-info";
import {
  Badge,
  Button,
  Container,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  IconCalendarWeek,
  IconDownload,
  IconPackage,
  IconTrash,
} from "@tabler/icons-react";
import { useTranslations } from "next-intl";
const getStatusProps = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return { color: "yellow", label: "در حال پردازش (Pending)" };
    case "shipped":
      return { color: "blue", label: "ارسال شده (Shipped)" };
    case "delivered":
      return { color: "green", label: "تحویل داده شده (Delivered)" };
    case "canceled":
      return { color: "red", label: "لغو شده (Canceled)" };
    default:
      return { color: "gray", label: "نامشخص" };
  }
};
export default function OrderDetails() {
  const t = useTranslations("OrderDetails");
  const t1 = useTranslations("Orders");
  const Status: string = "Delivered";
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
          <Group>
            <Title c={"textMain.2"} order={2}>
              assjad
            </Title>
            <Title c={"surface.9"} order={5}>
              234772347
            </Title>
          </Group>
          <Group gap={5} c={"textMain.3"}>
            <IconCalendarWeek color="var(--mantine-color-surface-9)" />
            <Text fz={"xs"}>{t("OrderDate")}</Text>
            <Text>:</Text>
            <Text fz={"xs"}>2015-20-01</Text>
          </Group>
          <Group gap={5} c={"textMain.3"}>
            <IconPackage color="var(--mantine-color-surface-9)" />
            <Text fz={"xs"}>{t("OrderStatus")}</Text>
            <Text>:</Text>
            <Badge
              color={getStatusProps(Status).color}
              variant="light"
              size="md"
              radius="md"
            >
              <Text fz={"xs"} mt={2} fw={"bold"}>
                {t1(`Status.${Status}`)}
              </Text>
            </Badge>
          </Group>
        </Stack>
        <OrderSummary
          shippingFee="340000 تومان"
          subtotal="120000 تومان"
          totalAmount="540000 تومان"
        />
        <Stack flex={1} p={"xs"}>
          <Button
            color="secondary.0"
            bd={"1px solid #7b6210"}
            leftSection={
              <IconDownload size={16} color="var(--mantine-color-surface-9)" />
            }
          >
            <Text fz={"xs"} c={"surface.9"}>
              {t("DownloadInvoice")}
            </Text>
          </Button>
          <Button
            color="secondary.0"
            bd={"1px solid #C5705D"}
            leftSection={<IconTrash size={16} color="#C5705D" />}
          >
            <Text fz={"xs"} c={"#C5705D"}>
              {t("CancelOrder")}
            </Text>
          </Button>
        </Stack>
      </Stack>

      <Stack flex={3} p={"xs"}>
        <OrderItems />
        <ShoppingInfo
          name="pary"
          address="abfsdf kfsdf sdjsdf"
          phone_number="09124080426"
          tracking_code="3764234234"
        />
      </Stack>
    </Container>
  );
}
