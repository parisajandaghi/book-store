import GlassPanel from "@/components/ui/glass/glass-panel";
import {
  ActionIcon,
  Group,
  Text,
  Input,
  Paper,
  Stack,
  Title,
  Box,
} from "@mantine/core";
import { IconSearch, IconX } from "@tabler/icons-react";
import React, { useState } from "react";
import style from "../admin.module.css";
import { useTranslations } from "next-intl";

type AdminUserSearchBarProps = {
  search: string;
  handleSearchChange: (val: string) => void;
};

export default function AdminUserSearchBar({
  search,
  handleSearchChange,
}: AdminUserSearchBarProps) {
  const [focused, setFocused] = useState(false);
  const t = useTranslations("Admin");

  return (
    <GlassPanel p={{ base: "xs", sm: "md" }}>
      <Group justify="space-between" align="center" wrap="wrap" gap="sm">
        <Stack gap={2}>
          <Title order={2} fz={{ base: "h4", sm: "h2" }} c="surface.5">
            {t("User.UserManagment")}
          </Title>
          <Text c="dimmed" size="xs">
            {t("User.UserDescription")}
          </Text>
        </Stack>

        <Box w={{ base: "100%", sm: "auto" }} style={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}>
          <Paper
            className={`${style.inputWrapper} ${focused ? style.focused : ""}`}
            w={{ base: "100%", sm: 300 }}
          >
            <Input
              variant="unstyled"
              placeholder={t("User.SearchUsers")}
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
        </Box>
      </Group>
    </GlassPanel>
  );
}
