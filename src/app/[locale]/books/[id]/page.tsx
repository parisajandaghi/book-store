import HorizontalDivider from "@/components/ui/elements/horizontal-divider";
import VerticalDivider from "@/components/ui/elements/vertical-divider";
import AddToCartButton from "@/features/books/components/add-to-cart-button";
import { getBookById } from "@/services/book.service";
import { getFormattedPrice, getLocalizedBook } from "@/utils/book.utils";
import { Card, Group, Image, Stack, Text, Title } from "@mantine/core";
import { getLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

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
      w={"100%"}
      h={"100%"}
      justify="center"
      align="center"
      style={{ flex: 1 }}
    >
      <Card
        shadow="sm"
        radius="md"
        w={700}
        h={450}
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
        <Group h={"100%"} w={"100%"}>
          <Group flex={"2"}>
            <Image src={book.image_url} alt={book.image_url} fit="fill" />
          </Group>
          <VerticalDivider my="lg" />
          <Stack flex={"3"} h={"100%"}>
            <Stack my={"lg"} mx={"lg"}>
              <Title order={2} c={"textMain.2"}>
                {localizedBook.title}
              </Title>
              <Title order={4} c={"textMain.2"}>
                {t("AuthorBy", { authorName: localizedBook.author })}
              </Title>
            </Stack>
            <HorizontalDivider />

            <Stack mx={"lg"}>
              <Title
                order={2}
                c={"surface.3"}
                ff={locale === "en" ? "system-ui, sans-serif" : "inherit"}
              >
                {locale === "en"
                  ? `${t1("CurrencySymbol")} ${formattedPrice}`
                  : `${formattedPrice} ${t1("CurrencySymbol")}`}
              </Title>
              <Text size="xs" c={"textMain.2"}>
                {localizedBook.description}
              </Text>
            </Stack>
            <HorizontalDivider my="md" />

            <AddToCartButton
              bookData={{
                book_id: book.id,
                title: localizedBook.title,
                price: book.price,
                image_url: book.image_url,
                author: localizedBook.author,
                translations: book.translations,
              }}
            />
          </Stack>
        </Group>
      </Card>
    </Group>
  );
}
