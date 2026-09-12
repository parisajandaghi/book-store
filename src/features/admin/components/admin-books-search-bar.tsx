import PrimaryButton from "@/components/ui/action-panel/primary-button";
import GlassPanel from "@/components/ui/glass/glass-panel";
import {
  ActionIcon,
  Group,
  Paper,
  Stack,
  Title,
  Text,
  Input,
} from "@mantine/core";
import { IconPlus, IconSearch, IconX } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import style from "../admin.module.css";
import React, { useState } from "react";
type AdminBooksSearchBarProps = {
  handleOpenCreate: () => void;
  search: string;
  handleSearchChange: (val: string) => void;
};
export default function AdminBooksSearchBar({
  handleOpenCreate,
  search,
  handleSearchChange,
}: AdminBooksSearchBarProps) {
  const t = useTranslations("Admin");
  const [focused, setFocused] = useState(false);
  return (
    <GlassPanel p={"md"}>
      <Group justify="space-between" wrap="wrap" gap="md">
        <Stack gap={5}>
          <Title order={2} c="surface.5">
            {t("Book.BookInventory")}
          </Title>
          <Text c="dimmed" size="sm" mt={4}>
            {t("Book.BookDescription")}
          </Text>
        </Stack>
        <Group>
          <PrimaryButton
            btnText={t("Book.AddNewBook")}
            onClick={handleOpenCreate}
            icon={<IconPlus size={18} color="var(--mantine-color-surface-9)" />}
          />
          <Paper
            className={`${style.inputWrapper} ${focused ? style.focused : ""}`}
            style={{ flexGrow: 1 }}
          >
            <Input
              variant="unstyled"
              placeholder={t("Book.SearchBooks")}
              rightSectionPointerEvents="auto"
              value={search}
              rightSection={
                search ? (
                  <ActionIcon
                    variant="subtle"
                    size="sm"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleSearchChange("")}
                  >
                    <IconX size={14} color="gray" />
                  </ActionIcon>
                ) : (
                  <ActionIcon variant="subtle" size="sm">
                    <IconSearch size={18} color="gray" />
                  </ActionIcon>
                )
              }
              onChange={(e) => handleSearchChange(e.currentTarget.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => {
                setTimeout(() => setFocused(false), 150);
              }}
              classNames={{
                input: style.input,
              }}
            />
          </Paper>
        </Group>
      </Group>
    </GlassPanel>
  );
}
