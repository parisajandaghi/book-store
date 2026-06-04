import { FeaturedBooksProp } from "@/features/books/book.type";
import { Group, SimpleGrid, Stack, Text } from "@mantine/core";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { Link } from "../../../navigation";
import BookCard from "./book-card";
import style from "../featured-books.module.css";
import { useLocale, useTranslations } from "next-intl";
export default function FeaturedBooks({ books }: FeaturedBooksProp) {
  const t = useTranslations("Home");
  const locale = useLocale();

  return (
    <Stack h={350} w={"60rem"} className={style.featuredBook} gap={"xs"}>
      <Group c={"#d4af3799"} justify="space-between" ml={4}>
        <Text fz={"xs"}>{t("FeaturedBooks")}</Text>
        <Link
          href={"/books"}
          style={{ textDecoration: "none", color: "rgba(212, 175, 55, 0.6" }}
        >
          <Group gap={2}>
            <Text fz={"xs"} lh={"lg"}>
              {t("ViewAll")}
            </Text>
            {locale === "fa" ? (
              <IconArrowLeft size={13} />
            ) : (
              <IconArrowRight size={13} />
            )}
          </Group>
        </Link>
      </Group>
      <SimpleGrid cols={{ base: 2, xs: 2, sm: 3, md: 4, lg: 5 }} spacing="md">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </SimpleGrid>
    </Stack>
  );
}
