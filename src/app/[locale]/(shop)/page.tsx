import FeaturedBooks from "@/features/books/components/featured-books";
import QuoteBox from "@/components/ui/quote/quote";
import Search from "@/components/ui/search/search";
import { getBooks } from "@/services/book.service";
import { Stack } from "@mantine/core";
import { getTranslations } from "next-intl/server";
import style from "./page.module.css";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const { data: rawBooks } = getBooks(1, 5, "", "most_popular", locale);
  const books = JSON.parse(JSON.stringify(rawBooks));
  const t = await getTranslations({ locale, namespace: "Home" });

  return (
    <Stack
      w="100%"
      justify="center"
      align="center"
      gap={50}
      className={style.home}
    >
      <QuoteBox quote={t("Quote")} author={t("Author")} />

      <Search
        placeholder={t("SearchPlaceHolder")}
        buttonText={t("DiscoverAllBooks")}
        buttonLink="/books"
      />

      <FeaturedBooks books={books} />
    </Stack>
  );
}
