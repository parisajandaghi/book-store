import HorizontalDivider from "@/components/ui/elements/horizontal-divider";
import VerticalDivider from "@/components/ui/elements/vertical-divider";
import AddToCartButton from "@/features/books/components/add-to-cart-button";
import TrackBookView from "@/features/books/components/track-book-view";
import { getBookById } from "@/services/book.service";
import { getFormattedPrice, getLocalizedBook } from "@/utils/book.utils";
import {
  Badge,
  Card,
  Group,
  Image,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { getLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import style from "./page.module.css";

export default async function BookDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const t = await getTranslations("BooksDetails");
  const t1 = await getTranslations("Product");
  const locale = await getLocale();
  const { id } = await params;

  let book;

  try {
    book = getBookById(id);
  } catch (error) {
    if (error) notFound();
  }

  if (!book) {
    notFound();
  }

  const localizedBook = getLocalizedBook(book, locale);

  if (!localizedBook) {
    notFound();
  }

  const formattedPrice = getFormattedPrice(book.price, locale);

  return (
    <Group
      w="100%"
      h="100%"
      justify="center"
      align="center"
      className={style.pageWrapper}
    >
      <TrackBookView bookId={book.id} />

      <Card
        shadow="sm"
        radius="md"
        className={style.bookDetailsCard}
        style={{
          backgroundColor: "#1f0f1fa8",
          transition: "all 0.25s ease",
        }}
        styles={{
          root: {
            borderColor: "rgba(255,255,255,0.08)",
          },
        }}
      >
        <Group className={style.bookDetailsContent}>
          <Group className={style.imageWrapper}>
            <Image
              src={book.image_url}
              alt={book.image_url}
              fit="fill"
              className={style.bookImage}
            />
          </Group>

          <VerticalDivider my="lg" />

          <Stack className={style.bookInfo}>
            <Stack my="lg" mx="lg">
              <Title order={2} c="textMain.2">
                {localizedBook.title}
              </Title>

              <Title order={4} c="textMain.2">
                {t("AuthorBy", {
                  authorName: localizedBook.author,
                })}
              </Title>
            </Stack>

            <HorizontalDivider />

            <Stack mx="lg">
              <Title
                order={2}
                c="surface.3"
                ff={locale === "en" ? "system-ui, sans-serif" : "inherit"}
              >
                {locale === "en"
                  ? `${t1("CurrencySymbol")} ${formattedPrice}`
                  : `${formattedPrice} ${t1("CurrencySymbol")}`}
              </Title>

              <Text size="xs" c="textMain.2">
                {localizedBook.description}
              </Text>
            </Stack>

            <HorizontalDivider my="md" />

            {book.stock === 0 ? (
              <Group justify="center" align="center" mt="xl">
                <Badge
                  color="gray"
                  variant="light"
                  size="xl"
                  bd="1px solid #7b6210"
                  styles={{
                    label: {
                      textTransform: "none",
                    },
                  }}
                >
                  <Text fz="xs">{t1("OutOfStock")}</Text>
                </Badge>
              </Group>
            ) : (
              <AddToCartButton bookId={book.id} />
            )}
          </Stack>
        </Group>
      </Card>
    </Group>
  );
}