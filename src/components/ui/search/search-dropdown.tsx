import { Book } from "@/features/books/book.type";
import { getLocalizedBook } from "@/utils/book.utils";
import {
  Center,
  Group,
  Image,
  ScrollArea,
  Stack,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { useLocale } from "next-intl";
import style from "./search.module.css";
import { Link } from "../../../navigation";
type SearchDropDownProps = {
  books: Book[];
  selectedIndex: number;
};
export default function SearchDropdown({
  books,
  selectedIndex,
}: SearchDropDownProps) {
  const locale = useLocale();

  return (
    <ScrollArea h={200} offsetScrollbars type="hover">
      <Stack gap="xs">
        {books?.map((book: Book, index) => {
          const localizedBook = getLocalizedBook(book, locale);
          const isSelected = index === selectedIndex;
          return (
            <UnstyledButton
              key={book.id}
              component={Link}
              href={`/books/${book.id}`}
              p="xs"
              // className={style.searchResult}
              className={`${style.searchResult} ${
                isSelected ? style.selected : ""
              }`}
            >
              <Group wrap="nowrap" align="center">
                <Image
                  src={book.image_url}
                  w={40}
                  h={55}
                  radius="sm"
                  alt={localizedBook?.title}
                />
                <Center>
                  <Stack gap={4}>
                    <Text fz="xs" c="textMain.3" lineClamp={1}>
                      {localizedBook?.title}
                    </Text>
                    <Text fz="xs" c="dimmed" lineClamp={1}>
                      {localizedBook?.author}
                    </Text>
                  </Stack>
                </Center>
              </Group>
            </UnstyledButton>
          );
        })}
      </Stack>
    </ScrollArea>
  );
}
