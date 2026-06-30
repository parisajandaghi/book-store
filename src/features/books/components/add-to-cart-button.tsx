"use client";
import PrimaryButton from "@/components/ui/action-panel/primary-button";
import { CartItem } from "@/features/carts/cart.type";
import { useCart } from "@/features/carts/hooks/use-cart";
import { Group } from "@mantine/core";
import { useTranslations } from "next-intl";
import React from "react";
type AddToCartProps = {
  bookData: Omit<CartItem, "quantity">;
};
export default function AddToCartButton({ bookData }: AddToCartProps) {
  const t = useTranslations("BooksDetails");
  const { addToCart } = useCart();

  return (
    <Group justify="center" mt={25} onClick={() => addToCart(bookData.id)}>
      <PrimaryButton btnText={t("AddToCart")} />
    </Group>
  );
}
