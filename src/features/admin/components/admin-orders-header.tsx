"use client";

import { adminSearchQueryAtom } from "@/store/admin-atom";
import { ActionIcon, Box, Group, Input, Paper, Title } from "@mantine/core";
import { IconPackage, IconSearch, IconX } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import style from "../admin.module.css";

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
    <Group
      justify="space-between"
      align="center"
      mb="lg"
      gap="md"
      wrap="wrap"
    >
      <Group gap="xs">
        <IconPackage
          size={28}
          stroke={1.5}
          color="var(--mantine-color-surface-9)"
        />
        <Title order={4} fw={600} c={"textMain.0"} fz={{ base: "md", sm: "lg" }}>
          {t("OrderManagment")}
        </Title>
      </Group>

      <Box w={{ base: "100%", sm: "auto" }} style={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}>
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
  );
}
