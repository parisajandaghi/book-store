"use client";
import GlassPanel from "@/components/ui/glass/glass-panel";
import { Badge, Group, Text } from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function OrderSuccessPage() {
  const t = useTranslations("Cart");
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  return (
    <Group w={"100%"} h={"100%"} justify="center" align="center" flex={1}>
      <GlassPanel h={300} w={500} justify="center" align="center" p={"md"}>
        <IconCircleCheck size={120} color="green" stroke={1.5} />
        <Text c="surface.6" size="xl" fw={"bold"}>
          {t("OrderPlacedSuccessfully")}
        </Text>

        {orderId && (
          <Group gap="xs" mt="sm">
            <Text c="dimmed">{t("OrderId")}</Text>
            <Badge color="surface.7" variant="light" size="xl" radius={"lg"}>
              {orderId}
            </Badge>
          </Group>
        )}
      </GlassPanel>
    </Group>
  );
}
