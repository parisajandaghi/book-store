"use client";

import { adminSearchQueryAtom } from "@/store/admin-atom";
import {
  ActionIcon,
  Box,
  Group,
  Input,
  Paper,
  Stack,
  Title,
  Text
} from "@mantine/core";
import { IconPackage, IconSearch, IconX } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import style from "../admin.module.css";
import GlassPanel from "@/components/ui/glass/glass-panel";

export default function AdminOrdersHeader() {
  const t = useTranslations("Admin");
  const [focused, setFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useAtom(adminSearchQueryAtom);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    setSearchQuery("");
    inputRef.current?.focus();
  };

  return (
    <GlassPanel p={{ base: "xs", sm: "md" }}>
      <Group
        justify="space-between"
        align="center"
        mb="lg"
        gap="md"
        wrap="wrap"
      >
  
        <Group align="center" wrap="nowrap" gap="sm">
          <IconPackage
            size={36}
            color="var(--mantine-color-surface-9)"
            style={{ flexShrink: 0 }}
          />
          <Stack gap={2} style={{ minWidth: 0 }}>
            <Title order={2} fz={{ base: "h4", sm: "h2" }} c="surface.5">
              {t("OrderManagment")}
            </Title>
            <Text c="dimmed" size="xs">
              {t("OrderDescription")}
            </Text>
          </Stack>
        </Group>
        <Box
          w={{ base: "100%", sm: "auto" }}
          style={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}
        >
          <Paper
            className={`${style.inputWrapper} ${focused ? style.focused : ""}`}
          >
            <Input
              ref={inputRef}
              variant="unstyled"
              placeholder={t("SearchOrders")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              classNames={{
                input: style.input,
              }}
              rightSectionPointerEvents="all"
              rightSection={
                searchQuery ? (
                  <ActionIcon
                    variant="transparent"
                    size="sm"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={handleClear}
                    style={{ cursor: "pointer" }}
                  >
                    <IconX size={15} color="gray" />
                  </ActionIcon>
                ) : (
                  <IconSearch size={16} color="gray" />
                )
              }
            />
          </Paper>
        </Box>
      </Group>
    </GlassPanel>
  );
}
