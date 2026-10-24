import { Book } from "@/features/books/book.type";
import { getFormattedPrice, getLocalizedBook } from "@/utils/book.utils";
import {
  ActionIcon,
  Center,
  Group,
  Loader,
  Table,
  Text,
  Image,
} from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import { useLocale, useTranslations } from "next-intl";
import React from "react";

type AdminBooksTableProps = {
  books: Book[];
  isLoading: boolean;
  handleOpenEdit: (book: Book) => void;
};

export default function AdminBooksTable({
  books,
  isLoading,
  handleOpenEdit,
}: AdminBooksTableProps) {
  const t = useTranslations("Admin");
  const t2 = useTranslations("Product");
  const locale = useLocale();

  if (isLoading && books.length === 0) {
    return (
      <Center py="xl">
        <Loader size="sm" color="var(--mantine-color-surface-9)" />
      </Center>
    );
  }

  if (books.length === 0) {
    return (
      <Center py="xl">
        <Text c="surface.6" size="sm" fw={600}>
          {t("Book.NoBookFound")}
        </Text>
      </Center>
    );
  }

  return (
    <Table.ScrollContainer minWidth={580} maxHeight={360}>
      <Table
        layout="fixed"
        verticalSpacing="sm"
        highlightOnHover
        borderColor="rgba(255, 255, 255, 0.08)"
        highlightOnHoverColor="rgba(255, 255, 255, 0.04)"
      >
        <Table.Thead>
          <Table.Tr
            style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}
          >
            <Table.Th c={"textMain.0"} fw={600} style={{ width: "45%" }}>
              {t("Book.BookDetails")}
            </Table.Th>

            <Table.Th ta={"center"} c="dimmed" fw={600} style={{ width: "20%" }}>
              {t("Book.Price")}
            </Table.Th>
            <Table.Th ta={"center"} c="dimmed" fw={600} style={{ width: "20%" }}>
              {t("Book.Stock")}
            </Table.Th>

            <Table.Th
              ta={"center"}
              c="dimmed"
              fw={600}
              style={{ width: "15%", textAlign: "center" }}
            >
              {t("Book.Actions")}
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {books.map((book: Book) => {
            const localizedBook = getLocalizedBook(book, locale);
            const formattedPrice = getFormattedPrice(book.price, locale);
            return (
              <Table.Tr
                key={book.id}
                style={{
                  borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
                }}
              >
                {/* Title & Author & Cover */}
                <Table.Td>
                  <Group gap="xs" wrap="nowrap">
                    <Image
                      src={book.image_url}
                      alt={localizedBook?.title}
                      w={36}
                      h={50}
                      radius="xs"
                      fallbackSrc="/placeholder-book.png"
                      style={{ flexShrink: 0 }}
                    />
                    <div style={{ minWidth: 0, overflow: "hidden" }}>
                      <Text size="sm" fw={600} c="white" truncate="end">
                        {localizedBook?.title}
                      </Text>
                      <Text size="xs" c="dimmed" truncate="end">
                        {localizedBook?.author}
                      </Text>
                    </div>
                  </Group>
                </Table.Td>

                {/* Price */}
                <Table.Td ta={"center"}>
                  <Text
                    size="sm"
                    fw={600}
                    c="white"
                    ff={locale === "en" ? "system-ui, sans-serif" : "inherit"}
                  >
                    {locale === "en"
                      ? `${t2("CurrencySymbol")} ${formattedPrice}`
                      : `${formattedPrice} ${t2("CurrencySymbol")}`}
                  </Text>
                </Table.Td>

                {/* Stock Count */}
                <Table.Td ta={"center"}>
                  <Text
                    size="sm"
                    c="white"
                    ff={locale === "en" ? "system-ui, sans-serif" : "inherit"}
                  >
                    {`${book.stock} ${t2("Pcs")}`}
                  </Text>
                </Table.Td>

                {/* Actions */}
                <Table.Td ta={"center"}>
                  <ActionIcon
                    variant="subtle"
                    color="var(--mantine-color-surface-9)"
                    radius="md"
                    size="sm"
                    onClick={() => handleOpenEdit(book)}
                  >
                    <IconPencil size={16} />
                  </ActionIcon>
                </Table.Td>
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
