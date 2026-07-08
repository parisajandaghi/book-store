"use client";
import PrimaryButton from "@/components/ui/action-panel/primary-button";
import { useCart } from "@/features/carts/hooks/use-cart";
import { Group } from "@mantine/core";
import { useTranslations } from "next-intl";
type AddToCartProps = {
  bookId: number;
};

export default function AddToCartButton({ bookId }: AddToCartProps) {
  const t = useTranslations("BooksDetails");
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    await addToCart(bookId);
  };

  return (
    <Group justify="center" mt={25}>
      <PrimaryButton btnText={t("AddToCart")} onClick={handleAddToCart} />
    </Group>
  );
}
