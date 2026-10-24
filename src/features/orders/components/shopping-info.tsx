import HorizontalDivider from "@/components/ui/elements/horizontal-divider";
import GlassPanel from "@/components/ui/glass/glass-panel";
import { Grid, Group, Stack, Text } from "@mantine/core";
import { IconMapPin } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { ShoppingInfoProps } from "../order.type";

export default function ShoppingInfo({
  name,
  address,
  phone_number,
  tracking_code,
}: ShoppingInfoProps) {
  const t = useTranslations("OrderDetails");
  return (
    <GlassPanel w="100%" flex={1} p="xs" bd="none">
      <Group gap={5}>
        <IconMapPin size={18} color="var(--mantine-color-surface-9)" />
        <Text fz="xs" c="textMain.3">
          {t("ShippingInfo")} :
        </Text>
      </Group>
      <HorizontalDivider />

      <Grid px="xs" gutter="sm">
        <Grid.Col span={{ base: 12, xs: 6, sm: 3 }}>
          <Stack flex={1} gap="xs" justify="center">
            <Text fz="xs" c="textMain.3">
              {t("RecipientName")} :
            </Text>
            <Text fz="xs" c="textMain.3">
              {name}
            </Text>
          </Stack>
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 6, sm: 3 }}>
          <Stack flex={1} gap="xs">
            <Text fz="xs" c="textMain.3">
              {t("ContactNumber")} :
            </Text>
            <Text fz="xs" c="textMain.3" dir="ltr" ta="left">
              {phone_number}
            </Text>
          </Stack>
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 6, sm: 3 }}>
          <Stack flex={1} gap="xs">
            <Text fz="xs" c="textMain.3">
              {t("FullAddress")} :
            </Text>
            <Text fz="xs" c="textMain.3">
              {address}
            </Text>
          </Stack>
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 6, sm: 3 }}>
          <Stack flex={1} gap="xs">
            <Text fz="xs" c="textMain.3">
              {t("TrackingCode")} :
            </Text>
            <Text fz="xs" c="textMain.3" dir="ltr" ta="left">
              {tracking_code || "---"}
            </Text>
          </Stack>
        </Grid.Col>
      </Grid>
    </GlassPanel>
  );
}
