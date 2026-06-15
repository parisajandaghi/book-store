"use client";
import {
  ActionIcon,
  Center,
  Group,
  Input,
  Loader,
  Paper,
  Popover,
  Text,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import style from "./search.module.css";

import { useSearch } from "@/features/books/hooks/use-search";
import { searchQueryAtom } from "@/store/search-atom";
import { useAtom } from "jotai";
import { useTranslations } from "use-intl";
import { Link, useRouter } from "../../../navigation";
import SecondaryButton from "../action-panel/secondary-button";
import SearchDropdown from "./search-dropdown";
import { SearchBoxProps } from "./search.type";
import { showErrorNotification } from "@/utils/notification";

export default function Search({
  placeholder,
  buttonText,
  buttonLink,
}: SearchBoxProps) {
  const t = useTranslations("Search");
  const t1 = useTranslations("Notifications");
  const [focused, setFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const { books, isEmpty, isPending, error } = useSearch(searchQuery);
  const router = useRouter();
  const isOpen = searchQuery.trim().length > 0;

  useEffect(() => {
    if (error) {
      showErrorNotification(t1("SearchFailed"));
    }
  }, [error, t1]);
  const handleSearch = () => {
    const query = searchQuery.trim();
    if (!query) return;
    router.push(`/books?search=${encodeURIComponent(query)}`);
  };

  return (
    <Group w={"600px"} p={1}>
      <Popover
        opened={focused && isOpen}
        width="target"
        position="bottom-start"
        offset={4}
        shadow="md"
      >
        <Popover.Target>
          <Paper
            className={`${style.wrapper} ${focused ? style.focused : ""}`}
            style={{ flexGrow: 1 }}
          >
            <Input
              rightSectionPointerEvents="all"
              variant="unstyled"
              value={searchQuery}
              placeholder={placeholder}
              rightSection={
                <ActionIcon variant="subtle" onClick={handleSearch}>
                  <IconSearch size={18} color="gray" />
                </ActionIcon>
              }
              onFocus={() => setFocused(true)}
              onKeyDown={(e) => {
                if (!books.length) return;
                if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setSelectedIndex((prev) => Math.max(prev - 1, 0));
                }
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setSelectedIndex((prev) =>
                    Math.min(prev + 1, books.length - 1),
                  );
                }
                if (e.key === "Enter") {
                  if (selectedIndex >= 0) {
                    router.push(`/books/${books[selectedIndex].id}`);
                  } else {
                    handleSearch();
                  }
                }
              }}
              onBlur={() => {
                setTimeout(() => setFocused(false), 150);
              }}
              classNames={{
                input: style.input,
              }}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedIndex(-1);
              }}
            />
          </Paper>
        </Popover.Target>

        <Popover.Dropdown
          bg="#1f0f1fa8"
          bd="none"
          p="xs"
          style={{ backdropFilter: "blur(30px)" }}
        >
          {!isPending ? (
            <Center>
              <Loader size="sm" color="surface.4" />
            </Center>
          ) : isEmpty ? (
            <Text size="sm" c="dimmed" ta="center">
              {t("NotFound")}
            </Text>
          ) : (
            <SearchDropdown books={books} selectedIndex={selectedIndex} />
          )}
        </Popover.Dropdown>
      </Popover>

      <Link href={buttonLink}>
        <SecondaryButton btnText={buttonText} radius={20}/>
      </Link>
    </Group>
  );
}
