import SortSelect from "@/components/ui/sort/sort-select";
import BookCard from "@/features/books/components/book-card";
import { getBooks } from "@/services/book.service";
import { SimpleGrid, Group, Title, Container } from "@mantine/core";
import { getTranslations } from "next-intl/server";

export default async function Books({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; sort?: string }>;
}) {
  const t = await getTranslations("Books");
  const { search = "", sort = "most_popular" } = await searchParams;
  const { data: books } = await getBooks(1, 12, search, sort);
console.log('books',books);

  return (
    <Container size={"55rem"} pt={40} pb={40}>
      <Group justify="space-between" align="center" mb="xl">
        <Title order={2} c="textMain.2">
          {t("AllBooks")}
        </Title>
        <SortSelect />
      </Group>
      <SimpleGrid
        cols={{ base: 2, sm: 2, md: 3, lg: 4 }}
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
