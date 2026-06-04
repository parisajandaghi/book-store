"use client";
import { useCart } from "@/features/carts/hooks/use-cart";
import { ActionIcon, Group, Text } from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import React from "react";
type NumberInputProps = {
  bookId: number;
  quantity: number;
};
export default function NumberInput({ bookId, quantity }: NumberInputProps) {
  const { decreaseQuantity, increaseQuantity } = useCart();
  return (
    <Group
      w={80}
      p={5}
      justify="space-between"
      wrap="nowrap"
      align="center"
      bg="#1f0f1fa8"
      bdrs={8}
      style={{ border: "1px solid rgba(255, 255, 255, 0.1)" }}
    >
      <ActionIcon
        variant="transparent"
        size={12}
        c={"surface.4"}
        onClick={() => decreaseQuantity(bookId)}
      >
        <IconMinus />
      </ActionIcon>

      <Text size="xs" c={"textMain.0"}>
        {quantity}
      </Text>
      <ActionIcon
        variant="transparent"
        size={12}
        c={"surface.4"}
        onClick={() => increaseQuantity(bookId)}
      >
        <IconPlus />
      </ActionIcon>
    </Group>
  );
}
