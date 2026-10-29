"use client";

import HorizontalDivider from "@/components/ui/elements/horizontal-divider";
import GlassPanel from "@/components/ui/glass/glass-panel";
import { Book, CreateBookDTO } from "@/features/books/book.type";
import { useBooks } from "@/features/books/hooks/use-books";

import { Group, Pagination, Stack } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useLocale } from "next-intl";
import { useState } from "react";
import style from "../../../../../features/admin/admin.module.css";

import { BookFormModal } from "@/features/admin/components/admin-book-form-modal";
import AdminBooksSearchBar from "@/features/admin/components/admin-books-search-bar";
import AdminBooksTable from "@/features/admin/components/admin-books-table";

export default function AdminBooksPage() {
  const locale = useLocale();
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebouncedValue(search, 300);

  const [activePage, setActivePage] = useState(1);

  const { books, totalPages, isLoading, createBook, updateBook } = useBooks({
    page: activePage,
    limit: 4,
    search: debouncedSearch,
  });

  const [modalOpened, setModalOpened] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleOpenCreate = () => {
    setSelectedBook(null);
    setModalOpened(true);
  };

  const handleOpenEdit = (book: Book) => {
    setSelectedBook(book);
    setModalOpened(true);
  };

  const handleFormSubmit = async (values: CreateBookDTO) => {
    if (selectedBook) {
      return await updateBook(selectedBook.id, values);
    }
    return await createBook(values);
  };

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setActivePage(1);
  };

  return (
    <Stack gap="lg">
      <AdminBooksSearchBar
        handleOpenCreate={handleOpenCreate}
        handleSearchChange={handleSearchChange}
        search={search}
      />

      <GlassPanel p={{ base: "xs", sm: "lg" }}>
        <AdminBooksTable
          books={books}
          isLoading={isLoading}
          handleOpenEdit={handleOpenEdit}
        />
        <HorizontalDivider my="xs" />

        <Group justify="center" wrap="wrap">
          {totalPages > 1 && (
            <Pagination
              total={totalPages}
              value={activePage}
              onChange={setActivePage}
              size="sm"
              ff={locale === "en" ? "system-ui, sans-serif" : "inherit"}
              color="var(--mantine-color-surface-9)"
              radius="md"
              classNames={{
                control: style.paginationControl,
              }}
            />
          )}
        </Group>
      </GlassPanel>
      <BookFormModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        onSubmit={handleFormSubmit}
        initialData={selectedBook}
      />
    </Stack>
  );
}
