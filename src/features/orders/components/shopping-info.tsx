import HorizontalDivider from "@/components/ui/elements/horizontal-divider";
import { Stack, Group, Grid, Text } from "@mantine/core";
import { IconMapPin } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import React from "react";
import { ShoppingInfoProps } from "../order.type";
import GlassPanel from "@/components/ui/glass/glass-panel";

export default function ShoppingInfo({
  name,
  address,
  phone_number,
  tracking_code,
}: ShoppingInfoProps) {
  const t = useTranslations("OrderDetails");
  return (
    <GlassPanel w={"100%"} flex={1} p={"xs"} bd={'none'}>
      <Group gap={5}>
        <IconMapPin size={18} color="var(--mantine-color-surface-9)" />
        <Text fz={"xs"} c={"textMain.3"}>
          {t("ShippingInfo")} :
        </Text>
      </Group>
      <HorizontalDivider />

      <Grid px={"xs"}>
        <Grid.Col span={3}>
          <Stack flex={1} gap={"xs"} justify="center">
            <Text fz={"xs"} c={"textMain.3"}>
              {t("RecipientName")} :
            </Text>
            <Text fz={"xs"} c={"textMain.3"}>
              {name}
            </Text>
          </Stack>
        </Grid.Col>
        <Grid.Col span={3}>
          {" "}
          <Stack flex={1} gap={"xs"}>
            <Text fz={"xs"} c={"textMain.3"}>
              {t("ContactNumber")} :
            </Text>
            <Text fz={"xs"} c={"textMain.3"}>
              {phone_number}
            </Text>
          </Stack>
        </Grid.Col>
        <Grid.Col span={3}>
          {" "}
          <Stack flex={1} gap={"xs"}>
            <Text fz={"xs"} c={"textMain.3"}>
              {t("FullAddress")} :
            </Text>
            <Text fz={"xs"} c={"textMain.3"}>
              {address}
            </Text>
          </Stack>
        </Grid.Col>
        <Grid.Col span={3}>
          {" "}
          <Stack flex={1} gap={"xs"}>
            <Text fz={"xs"} c={"textMain.3"}>
              {t("TrackingCode")} :
            </Text>
            <Text fz={"xs"} c={"textMain.3"}>
              {tracking_code}
            </Text>
          </Stack>
        </Grid.Col>
      </Grid>
    </GlassPanel>
  );
}
