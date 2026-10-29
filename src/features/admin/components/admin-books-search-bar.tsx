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
  Box,
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
    <GlassPanel p={{ base: "xs", sm: "md" }}>
      <Group justify="space-between" align="center" wrap="wrap" gap="sm">
        <Stack gap={2}>
          <Title order={2} fz={{ base: "h4", sm: "h2" }} c="surface.5">
            {t("Book.BookInventory")}
          </Title>
          <Text c="dimmed" size="xs">
            {t("Book.BookDescription")}
          </Text>
        </Stack>

        <Group
          gap="xs"
          wrap="nowrap"
          w={{ base: "100%", sm: "auto" }}
          style={{ flexGrow: 1, justifyContent: "flex-end" }}
        >
          <Paper
            className={`${style.inputWrapper} ${focused ? style.focused : ""}`}
            style={{ flex: 1 }}
          >
            <Input
              variant="unstyled"
              placeholder={t("Book.SearchBooks")}
              rightSectionPointerEvents="all"
              value={search}
              rightSection={
                search ? (
                  <ActionIcon
                    variant="subtle"
                    size="sm"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleSearchChange("")}
                    aria-label="Clear search"
                  >
                    <IconX size={14} color="gray" />
                  </ActionIcon>
                ) : (
                  <IconSearch size={16} color="gray" />
                )
              }
              onChange={(e) => handleSearchChange(e.currentTarget.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              classNames={{
                input: style.input,
              }}
            />
          </Paper>

          <Box display={{ base: "none", sm: "block" }}>
            <PrimaryButton
              btnText={t("Book.AddNewBook")}
              onClick={handleOpenCreate}
              icon={
                <IconPlus size={18} color="var(--mantine-color-surface-9)" />
              }
            />
          </Box>

          <Box display={{ base: "block", sm: "none" }}>
            <ActionIcon
              size={36}
              radius="xl"
              variant="outline"
              color="surface.9"
              onClick={handleOpenCreate}
              aria-label={t("Book.AddNewBook")}
              style={{
                borderColor: "#d4af3766",
                background: "#1f0f1fa8",
                flexShrink: 0,
              }}
            >
              <IconPlus size={18} color="var(--mantine-color-surface-9)" />
            </ActionIcon>
          </Box>
        </Group>
      </Group>
    </GlassPanel>
  );
}
