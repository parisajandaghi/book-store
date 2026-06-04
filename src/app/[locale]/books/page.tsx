import BookCard from "@/features/books/components/book-card";
import { getBooks } from "@/services/book.service";
import { SimpleGrid, Group, Title, Select, Container } from "@mantine/core";
import { getTranslations } from "next-intl/server";

export default async function Books({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const t = await getTranslations("Books");
  const { search = "" } = await searchParams;
  const { data: books } = await getBooks(1, 12, search);

  return (
    <Container size={"55rem"} pt={40} pb={40}>
      <Group justify="space-between" align="center" mb="xl">
        <Title order={2} c="textMain.2">
          {t("AllBooks")}
        </Title>
        <Select
          placeholder={`${t("Sort")}`}
          data={[
            `${t("MostPopular")}`,
            `${t("MostExpensive")}`,
            `${t("Cheapest")}`,
          ]}
          w={150}
          classNames={{
            input: "custom-select-input",
            dropdown: "custom-select-dropdown",
            option: "custom-select-option",
          }}
        />
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
