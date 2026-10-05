"use client";

import HorizontalDivider from "@/components/ui/elements/horizontal-divider";
import GlassPanel from "@/components/ui/glass/glass-panel";
import {
  Book,
  BookFormValues,
  CreateBookDTO,
} from "@/features/books/book.type";
import { useBooks } from "@/features/books/hooks/use-books";

import { Group, Pagination, Stack } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useLocale } from "next-intl";
import { useState } from "react";
import style from "../../../../../features/admin/admin.module.css";

import AdminBooksSearchBar from "@/features/admin/components/admin-books-search-bar";
import AdminBooksTable from "@/features/admin/components/admin-books-table";
import { bookIdAtom } from "@/store/admin-atom";
import { useAtom } from "jotai";
import { BookFormModal } from "@/features/admin/components/admin-book-form-modal";

export default function AdminBooksPage() {
  const locale = useLocale();
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebouncedValue(search, 300);

  const [activePage, setActivePage] = useState(1);
  const [, setBookId] = useAtom(bookIdAtom);

  const {
    books,
    totalPages,
    total,
    isLoading,
    createBook,

    updateBook,
  } = useBooks({
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
      {/* 2. Filter & Search Bar */}
      <AdminBooksSearchBar
        handleOpenCreate={handleOpenCreate}
        handleSearchChange={handleSearchChange}
        search={search}
      />
      {/* 3. Books Table */}
      <GlassPanel p={"lg"}>
        <AdminBooksTable
          books={books}
          isLoading={isLoading}
          handleOpenEdit={handleOpenEdit}
        />
        <HorizontalDivider my="xs" />
        {/* 4. Table Pagination Footer */}
        <Group justify="flex-end" wrap="wrap">
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
