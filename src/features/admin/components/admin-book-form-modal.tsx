import { useEffect } from "react";
import {
  Modal,
  TextInput,
  Button,
  Group,
  Stack,
  Title,
  SimpleGrid,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  Book,
  BookFormValues,
  CreateBookDTO,
} from "@/features/books/book.type";
import GlassPanel from "@/components/ui/glass/glass-panel";
import style from "../../carts/cart.module.css";
import styles from "../admin.module.css";
import { toCreateDTO, toFormValues } from "@/utils/book.utils";
import { useTranslations } from "next-intl";

interface BookFormModalProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: (values: CreateBookDTO) => Promise<boolean>;
  initialData: Book | null;
}

export function BookFormModal({
  opened,
  onClose,
  onSubmit,
  initialData,
}: BookFormModalProps) {
  const isEditing = Boolean(initialData);
  const t = useTranslations("Admin");
  const form = useForm<BookFormValues>({
    initialValues: toFormValues(initialData),
    validate: {
      title: (val) => (!val.trim() ? "عنوان کتاب الزامی است" : null),
      price: (val) => (val < 0 ? "قیمت نمی‌تواند منفی باشد" : null),
    },
  });

  useEffect(() => {
    if (opened) {
      form.setValues(toFormValues(initialData));
      form.resetDirty();
    }
  }, [opened, initialData]);

  const handleSubmit = (values: BookFormValues) => {
    const dto = toCreateDTO(values, initialData?.id);
    onSubmit(dto);
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      size="md"
      // padding={0}
      withCloseButton={false}
      overlayProps={{
        backgroundOpacity: 0.6,
        blur: 4,
      }}
      styles={{
        content: {
          backgroundColor: "#f6c7f648",
          border: "1px solid #1f0f1f",
        },
      }}
    >
      <GlassPanel p={{ base: "sm", sm: "md" }}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap={"xs"}>
            <Title order={3} c={"textMain.0"} fz={{ base: "h4", sm: "h3" }}>
              {isEditing ? t("Book.EditBookDetails") : t("Book.AddNewBook")}
            </Title>
            <TextInput
              label={t("Book.BookTitle")}
              placeholder={t("Book.BookTitle")}
              withAsterisk
              classNames={{
                input: style.input,
                label: style.label,
              }}
              {...form.getInputProps("title")}
            />

            <TextInput
              label={t("Book.Author")}
              placeholder={t("Book.Author")}
              withAsterisk
              classNames={{
                input: style.input,
                label: style.label,
              }}
              {...form.getInputProps("author")}
            />

            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xs">
              <TextInput
                label={t("Book.Price")}
                withAsterisk
                classNames={{
                  input: style.input,
                  label: style.label,
                }}
                {...form.getInputProps("price")}
              />
              <TextInput
                label={t("Book.Inventory")}
                withAsterisk
                classNames={{
                  input: style.input,
                  label: style.label,
                }}
                {...form.getInputProps("stock")}
              />
            </SimpleGrid>

            <TextInput
              label={t("Book.ImgUrl")}
              placeholder={t("Book.PlaceHolder.UrlExam")}
              withAsterisk
              classNames={{
                input: style.input,
                label: style.label,
              }}
              {...form.getInputProps("cover_image")}
            />

            <Group justify="center" mt="md" gap={'xs'}>
              <Button onClick={onClose} className={styles.modalButton}>
                {t("Book.Cancle")}
              </Button>
              <Button
                type="submit"
                loading={form.submitting}
                className={styles.modalButton}
              >
                {isEditing ? t("Book.Save") : t("Book.AddNewBook")}
              </Button>
            </Group>
          </Stack>
        </form>
      </GlassPanel>
    </Modal>
  );
}
