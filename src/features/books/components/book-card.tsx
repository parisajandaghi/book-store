"use client";
import { Book } from "@/features/books/book.type";
import { Card, Group, Image, Stack, Text } from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons-react";
import { Link } from "../../../navigation";
import style from "../featured-books.module.css";
import { useLocale, useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import { getFormattedPrice, getLocalizedBook } from "@/utils/book.utils";
import { useCart } from "@/features/carts/hooks/use-cart";
import { MouseEvent } from "react";
interface BookCardProps {
  book: Book;
}
export default function BookCard({ book }: BookCardProps) {
  const { addToCart } = useCart();
  const t = useTranslations("Product");
  const locale = useLocale();
  const localizedBook = getLocalizedBook(book, locale);
  if (!localizedBook) {
    notFound();
  }

  const formattedPrice = getFormattedPrice(book.price, locale);
  const bookData = {
    book_id: book.id,
    title: localizedBook.title,
    price: book.price,
    image_url: book.image_url,
    author: localizedBook.author,
    translations: book.translations,
  };
  const handleAddToCart = (e: MouseEvent<SVGSVGElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(bookData);
  };
  return (
    <Link href={`/books/${book.id}`} style={{ textDecoration: "none" }}>
      <Card
        shadow="sm"
        radius="md"
        className={style.bookCard}
        style={{
          backgroundColor: "#1f0f1fbe",
          transition: "all 0.25s ease",
          cursor: "pointer",
        }}
        styles={{
          root: {
            borderColor: "rgba(255,255,255,0.08)",
          },
        }}
      >
        <Card.Section p={"sm"}>
          <Image src={book.image_url} h={200} fit="fill" alt={book.image_url} />
        </Card.Section>

        <Stack gap={3}>
          {" "}
          <Text fw={600} c="dimmed" lineClamp={1} size="sm">
            {localizedBook.title}
          </Text>
          <Text fw={400} c="dimmed" lineClamp={1} size="xs">
            {localizedBook.author}
          </Text>
          <Group justify="space-between" c="rgba(212, 175, 55, 0.6)">
            <Text
              size="xs"
              ff={locale === "en" ? "system-ui, sans-serif" : "inherit"}
            >
              {" "}
              {locale === "en"
                ? `${t("CurrencySymbol")} ${formattedPrice}`
                : `${formattedPrice} ${t("CurrencySymbol")}`}
            </Text>

            <IconShoppingCart
              size={18}
              color="rgba(212, 175, 55, 0.6)"
              onClick={handleAddToCart}
            />
          </Group>
        </Stack>
      </Card>
    </Link>
  );
}
