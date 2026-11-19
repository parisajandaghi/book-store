import SortSelect from "@/components/ui/sort/sort-select";
import BookCard from "@/features/books/components/book-card";
import { getBooks } from "@/services/book.service";
import { SimpleGrid, Group, Title, Container } from "@mantine/core";
import { getTranslations } from "next-intl/server";
import style from "./page.module.css";


export default async function Books({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ search?: string; sort?: string }>;
}) {
 
  const { locale } = await params;
  
  const t = await getTranslations("Books");
  const { search = "", sort = "most_popular" } = await searchParams;
  

  const { data: books } = getBooks(1, 40, search, sort, locale);

  return (
    <Container size="55rem" pt={40} pb={40} className={style.booksContainer}>
      <Group
        justify="space-between"
        align="center"
        mb="xl"
        className={style.booksHeader}
      >
        <Title order={2} c="textMain.2">
          {t("AllBooks")}
        </Title>

        <SortSelect />
      </Group>

      <SimpleGrid
        cols={{ base: 1, xs: 2, md: 3, lg: 4 }}
        spacing="xl"
        verticalSpacing="xl"
      >
        {books?.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
