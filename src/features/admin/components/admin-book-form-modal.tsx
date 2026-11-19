"use client";

import GlassPanel from "@/components/ui/glass/glass-panel";
import {
  Book,
  BookFormValues,
  CreateBookDTO,
} from "@/features/books/book.type";
import { toCreateDTO, toFormValues } from "@/utils/book.utils";
import { notify } from "@/utils/notification";
import {
  Button,
  FileInput,
  Group,
  Image,
  Modal,
  SimpleGrid,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import style from "../../carts/cart.module.css";
import styles from "../admin.module.css";

interface BookFormModalProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: (values: CreateBookDTO) => Promise<boolean>;
  initialData: Book | null;
}

interface InnerBookFormProps {
  onClose: () => void;
  onSubmit: (values: CreateBookDTO) => Promise<boolean>;
  initialData: Book | null;
}

function InnerBookForm({ onClose, onSubmit, initialData }: InnerBookFormProps) {
  const isEditing = Boolean(initialData);
  const t = useTranslations("Admin");
  const locale = useLocale();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<BookFormValues>({
    initialValues: toFormValues(initialData, locale),
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

  const handleFileChange = async (file: File | null) => {
    setSelectedFile(file);
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/uploads", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          data.error ||
            (locale === "en" ? "Image upload failed" : "خطا در آپلود تصویر"),
        );
      }

      form.setFieldValue("image_url", data.url);
      form.clearFieldError("image_url");

      notify.success({
        title: t("Book.ImageUpload"),
        message: t("Book.ImageUploadedSuccessfully"),
      });
    } catch (error: unknown) {
      const fallbackMsg = t("Book.ImageUploadFailed");
      const message = error instanceof Error ? error.message : fallbackMsg;

      notify.error({
        title: t("Book.ImageUpload"),
        message,
      });
      setSelectedFile(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (values: BookFormValues) => {
    const dto = toCreateDTO(values, initialData?.id, locale);
    const success = await onSubmit(dto);
    if (success) {
      onClose();
    }
  };

  return (
    <GlassPanel p={{ base: "sm", sm: "md" }}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="xs">
          <Title order={3} c="textMain.0" fz={{ base: "h4", sm: "h3" }}>
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
              styles={{
                input: {
                  fontFamily:
                    locale === "en" ? "system-ui, sans-serif" : "inherit",
                },
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
              styles={{
                input: {
                  fontFamily:
                    locale === "en" ? "system-ui, sans-serif" : "inherit",
                },
              }}
              {...form.getInputProps("stock")}
            />
          </SimpleGrid>

          <FileInput
            label={t("Book.ImgUrl")}
            placeholder={t("Book.ChooseImage")}
            accept="image/png,image/jpeg,image/webp,image/avif"
            value={selectedFile}
            onChange={handleFileChange}
            disabled={isUploading}
            clearable
            error={form.errors.image_url}
            withAsterisk={!isEditing}
            classNames={{
              input: style.input,
              label: style.label,
            }}
          />

          {form.values.image_url && (
            <Group justify="center" my="xs">
              <Image
                src={form.values.image_url}
                alt="Book preview"
                h={120}
                w="auto"
                fit="contain"
                radius="md"
              />
            </Group>
          )}

          <Group justify="center" mt="md" gap="xs">
            <Button onClick={onClose} className={styles.modalButton}>
              {t("Book.Cancle")}
            </Button>
            <Button
              type="submit"
              loading={form.submitting || isUploading}
              className={styles.modalButton}
            >
              {isEditing ? t("Book.Save") : t("Book.AddNewBook")}
            </Button>
          </Group>
        </Stack>
      </form>
    </GlassPanel>
  );
}

export function BookFormModal({
  opened,
  onClose,
  onSubmit,
  initialData,
}: BookFormModalProps) {
  const locale = useLocale();

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
      {opened && (
        <InnerBookForm
          key={`${initialData?.id ?? "new"}-${locale}`}
          onClose={onClose}
          onSubmit={onSubmit}
          initialData={initialData}
        />
      )}
    </Modal>
  );
}
