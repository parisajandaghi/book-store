import SortSelect from "@/components/ui/sort/sort-select";
import BookCard from "@/features/books/components/book-card";
import { getBooks } from "@/services/book.service";
import { Box, Container, Group, SimpleGrid, Title } from "@mantine/core";
import { IconBook } from "@tabler/icons-react";
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
  const t = await getTranslations({ locale, namespace: "Books" });
  const { search = "", sort = "most_popular" } = await searchParams;

  const { data: books } = getBooks(1, 40, search, sort, locale);

  return (
    <Container size="55rem" pt={40} pb={40} className={style.booksContainer}>
      <Group
        justify="space-between"
        align="center"
        mb="3rem"
        mt={"lg"}
        className={style.booksHeader}
        style={{
          width: "100%",
          padding: "8px 16px",
          borderRadius: "999px",
          background: "rgba(30, 16, 32, 0.65)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          border: "1px solid #7b6210",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.35)",
        }}
      >
        <Group gap="xs" align="center">
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 36,
              borderRadius: "50%",
              background:
                "linear-gradient(135deg, rgba(230, 180, 230, 0.25), rgba(255, 255, 255, 0.05))",
              border: "1px solid rgba(255, 255, 255, 0.18)",
              color: "#f3d9fa",
            }}
          >
            <IconBook size={20} stroke={1.7} />
          </Box>

          <Title
            order={2}
            c="white"
            style={{
              fontSize: "1.2rem",
              fontWeight: 700,
              letterSpacing: "-0.2px",
              lineHeight: 1,
            }}
          >
            {t("AllBooks")}
          </Title>
        </Group>

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
