"use client";
import GlassPanel from "@/components/ui/glass/glass-panel";
import { Badge, Box, Group, Text } from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function OrderSuccessPage() {
  const t = useTranslations("Cart");
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <Group
      w="100%"
      h="100%"
      justify="center"
      align="center"
      flex={1}
      px="md"
      py={{ base: "xl", sm: "2xl" }}
    >
      <GlassPanel
        w="100%"
        maw={{ base: 340, sm: 480 }}
        justify="center"
        align="center"
        p={{ base: "lg", sm: "xl" }}
      >
        <Box
          display="flex"
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box hiddenFrom="sm">
            <IconCircleCheck size={80} color="green" stroke={1.5} />
          </Box>
          <Box visibleFrom="sm">
            <IconCircleCheck size={110} color="green" stroke={1.5} />
          </Box>
        </Box>

        <Text
          c="surface.6"
          fz={{ base: "md", sm: "xl" }}
          fw="bold"
          ta="center"
          mt="xs"
        >
          {t("OrderPlacedSuccessfully")}
        </Text>

        {orderId && (
          <Group gap="xs" mt="sm" justify="center" wrap="wrap">
            <Text c="dimmed" fz={{ base: "xs", sm: "sm" }}>
              {t("OrderId")}
            </Text>
            <Badge color="surface.7" variant="light" size="lg" radius="lg">
              {orderId}
            </Badge>
          </Group>
        )}
      </GlassPanel>
    </Group>
  );
}
