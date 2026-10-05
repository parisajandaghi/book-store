import GlassPanel from "@/components/ui/glass/glass-panel";
import {
  ActionIcon,
  Group,
  Text,
  Input,
  Paper,
  Stack,
  Title,
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
    <GlassPanel p={"md"}>
      <Group justify="space-between" wrap="wrap" gap="md">
        <Stack gap={5}>
          <Title order={2} c="surface.5">
            {t("User.UserManagment")}
          </Title>
          <Text c="dimmed" size="sm" mt={4}>
            {t("User.UserDescription")}
          </Text>
        </Stack>
        <Group>
          <Paper
            className={`${style.inputWrapper} ${focused ? style.focused : ""}`}
            style={{ flexGrow: 1 }}
          >
            <Input
              variant="unstyled"
              placeholder={t("User.SearchUsers")}
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
