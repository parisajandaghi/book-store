import GlassPanel from "@/components/ui/glass/glass-panel";
import { Group, Text } from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import React from "react";

export default function OrderSuccessPage() {
  const t = useTranslations("Cart");
  return (
    <Group w={"100%"} h={"100%"} justify="center" align="center" flex={1}>
      <GlassPanel h={300} w={500} justify="center" align="center" p={"md"}>
        <IconCircleCheck size={120} color="green"  stroke={1.5} />
        <Text c="surface.6" size="xl" fw={"bold"}>
          {t("OrderPlacedSuccessfully")}
        </Text>
        <Text c="dimmed" size="sm">{t("OrderTrackingMessage")}</Text>
      </GlassPanel>
    </Group>
  );
}
