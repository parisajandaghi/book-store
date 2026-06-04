import FeaturedBooks from "@/features/books/components/featured-books";
import QuoteBox from "@/components/ui/quote/quote";
import Search from "@/components/ui/search/search";
import { getBooks } from "@/services/book.service";
import { Stack } from "@mantine/core";
import { getTranslations } from "next-intl/server";
export default async function page() {
  const { data: books } = getBooks(1, 5);
  const t = await getTranslations("Home");
  return (
    <Stack w={"100%"} justify="center" align="center" gap={50} p={"lg"}>
      <QuoteBox quote={t("Quote")} author={t("Author")} />
      <Search
        placeholder={t("SearchPlaceHolder")}
        buttonText={t("DiscoverAllBooks")}
        buttonLink={"/books"}
      />
      <FeaturedBooks books={books} />
    </Stack>
  );
}
