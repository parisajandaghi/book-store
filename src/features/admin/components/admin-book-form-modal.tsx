import GlassPanel from "@/components/ui/glass/glass-panel";
import {
  Book,
  BookFormValues,
  CreateBookDTO,
} from "@/features/books/book.type";
import { toCreateDTO, toFormValues } from "@/utils/book.utils";
import {
  Button,
  Group,
  Modal,
  SimpleGrid,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import style from "../../carts/cart.module.css";
import styles from "../admin.module.css";

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
    validateInputOnBlur: true,
    validate: {
      title: (val) => {
        const trimmed = (val ?? "").trim();
        if (!trimmed) return t("Modal.BookTitleValidation");
        return null;
      },
      author: (val) => {
        const trimmed = (val ?? "").trim();
        if (!trimmed) return t("Modal.AuthorNameValidation");
        return null;
      },
      price: (val) => {
        if (
          val === null ||
          val === undefined ||
          val === ("" as unknown as number) ||
          Number.isNaN(Number(val))
        ) {
          return t("Modal.PriceValidation");
        }
        const num = Number(val);
        if (num <= 0) return t("Modal.Price");
        return null;
      },
      stock: (val) => {
        if (
          val === null ||
          val === undefined ||
          val === ("" as unknown as number) ||
          Number.isNaN(Number(val))
        ) {
          return t("Modal.StockValidation");
        }
        const num = Number(val);

        if (num < 0) return t("Modal.Stock");
        return null;
      },
      image_url: (val) => {
        const trimmed = (val ?? "").trim();
        if (!trimmed) return t("Modal.ImageUrlValidation");

        const isValidUrl =
          trimmed.startsWith("/") || /^https?:\/\/.+\..+/i.test(trimmed);
        if (!isValidUrl) return t("Modal.ImageUrl");
        return null;
      },
    },
  });

  useEffect(() => {
    if (opened) {
      form.setValues(toFormValues(initialData));
      form.clearErrors();
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
              {...form.getInputProps("image_url")}
            />

            <Group justify="center" mt="md" gap={"xs"}>
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
