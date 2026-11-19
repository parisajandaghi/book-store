"use client";
import { Book } from "@/features/books/book.type";
import { Badge, Card, Group, Image, Stack, Text } from "@mantine/core";
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

  const handleAddToCart = async (e: MouseEvent<SVGSVGElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("add");

    try {
      await addToCart(book.id);
    } catch (error) {
      console.error(error);
    }
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
        <Card.Section
          p="xs"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.15)",
            height: 200,
          }}
        >
          <Image
            src={book.image_url}
            h="100%"
            w="auto"
            fit="contain"
            alt={localizedBook.title}
          />
        </Card.Section>

        <Stack gap={4} mt="xs" className={style.bookCardContent}>
          <Text fw={600} c="dimmed" lineClamp={1} size="sm">
            {localizedBook.title}
          </Text>
          <Text fw={400} c="dimmed" lineClamp={1} size="xs" opacity={0.85}>
            {localizedBook.author}
          </Text>
          <Group
            justify="space-between"
            wrap="nowrap"
            c="rgba(212, 175, 55, 0.6)"
            mt={2}
          >
            <Text
              size="11px"
              ff={locale === "en" ? "system-ui, sans-serif" : "inherit"}
            >
              {locale === "en"
                ? `${t("CurrencySymbol")} ${formattedPrice}`
                : `${formattedPrice} ${t("CurrencySymbol")}`}
            </Text>
            {book.stock === 0 ? (
              <Badge
                color="gray"
                variant="light"
                styles={{
                  label: {
                    textTransform: "none",
                  },
                }}
              >
                <Text fz={"xs"}>{t("OutOfStock")}</Text>
              </Badge>
            ) : (
              <IconShoppingCart
                size={18}
                color="rgba(212, 175, 55, 0.6)"
                onClick={handleAddToCart}
                style={{ cursor: "pointer" }}
              />
            )}
          </Group>
        </Stack>
      </Card>
    </Link>
  );
}
