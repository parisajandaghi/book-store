import { ActionIcon, Group, Input, Paper, Title } from "@mantine/core";
import { IconPackage, IconSearch } from "@tabler/icons-react";
import style from "../admin-order.module.css";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { adminSearchQueryAtom } from "@/store/admin-atom";
import { useAtom } from "jotai";

export default function AdminOrdersHeader() {
  const t = useTranslations("Admin");
  const [focused, setFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useAtom(adminSearchQueryAtom);
  return (
    <Group justify="space-between" mb="lg">
      <Group>
        <IconPackage
          size={30}
          stroke={1.5}
          color="var(--mantine-color-surface-9)"
        />
        <Title order={4} fw={600} c={"textMain.0"}>
          {t("OrderManagment")}
        </Title>
      </Group>
      <Paper
        className={`${style.inputWrapper} ${focused ? style.focused : ""}`}
        style={{ flexGrow: 1 }}
      >
        <Input
          variant="unstyled"
          placeholder={t("SearchOrders")}
          onFocus={() => setFocused(true)}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.currentTarget.value)}
          onBlur={() => {
            setTimeout(() => setFocused(false), 150);
          }}
          classNames={{
            input: style.input,
          }}
          rightSection={
            <ActionIcon variant="subtle">
              <IconSearch size={18} color="gray" />
            </ActionIcon>
          }
        />
      </Paper>
    </Group>
  );
}
