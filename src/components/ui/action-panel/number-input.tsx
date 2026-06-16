"use client";
import { useCart } from "@/features/carts/hooks/use-cart";
import { ActionIcon, Group, Text } from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useLocale } from "next-intl";
import React from "react";
interface NumberInputProps {
  bookId: number;
  quantity: number;
  compact?: boolean;
}

export default function NumberInput({
  bookId,
  quantity,
  compact = false,
}: NumberInputProps) {
  const { decreaseQuantity, increaseQuantity } = useCart();
  const locale = useLocale();
  return (
    <Group
      w={compact ? 70 : 80}
      p={compact ? 3 : 5}
      justify="space-between"
      wrap="nowrap"
      align="center"
      bg="#1f0f1fa8"
      style={{
        borderRadius: 8,
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <ActionIcon
        variant="transparent"
        size={compact ? 10 : 12}
        c={"surface.4"}
        onClick={() => decreaseQuantity(bookId)}
      >
        <IconMinus size={compact ? 10 : 14} />
      </ActionIcon>

      <Text
        fz={compact ? 10 : "xs"}
        c={"textMain.0"}
        ff={locale === "en" ? "system-ui, sans-serif" : "inherit"}
      >
        {quantity}
      </Text>

      <ActionIcon
        variant="transparent"
        size={compact ? 10 : 12}
        c={"surface.4"}
        onClick={() => increaseQuantity(bookId)}
      >
        <IconPlus size={compact ? 10 : 14} />
      </ActionIcon>
    </Group>
  );
}
