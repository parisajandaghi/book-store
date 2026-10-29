"use client";

import { useState } from "react";
import HorizontalDivider from "@/components/ui/elements/horizontal-divider";
import GlassPanel from "@/components/ui/glass/glass-panel";
import styles from "../../../../../features/admin/admin.module.css";
import {
  Group,
  Stack,
  Title,
  Text,
  SimpleGrid,
  TextInput,
  NumberInput,
  Button,
} from "@mantine/core";
import {
  IconAlertCircle,
  IconBook,
  IconBuildingStore,
  IconMail,
  IconPhone,
  IconReceiptTax,
  IconSettings,
  IconTruck,
  IconTruckDelivery,
} from "@tabler/icons-react";
import { useLocale, useTranslations } from "next-intl";
import style from "../../../../../features/carts/cart.module.css";
import { StoreSettings } from "@/services/store-setting.service";
import { useStoreSettings } from "@/features/admin/hooks/use-store-settings";

function SettingsForm({
  initialData,
  onSave,
  isUpdating,
}: {
  initialData: StoreSettings;
  onSave: (data: StoreSettings) => Promise<void>;
  isUpdating: boolean;
}) {
  const t = useTranslations("Admin");
  const [form, setForm] = useState<StoreSettings>({ ...initialData });
  const locale = useLocale();
  const handleReset = () => {
    setForm({ ...initialData });
  };
  const handleSave = async () => {
    await onSave(form);
  };

  const inputProps = {
    size: "sm" as const,
    w: "100%",
    maw: { base: "100%", sm: 280 },
    classNames: { input: style.input, label: style.label },
  };

  return (
    <GlassPanel p={{ base: "sm", sm: "md", md: "lg" }}>
      <Stack gap="md">
        <Group align="flex-start" wrap="nowrap" gap="sm">
          <IconBook
            size={26}
            color="var(--mantine-color-surface-9)"
            style={{ flexShrink: 0 }}
          />
          <Stack gap={2}>
            <Text size="md" fw={600} c="surface.5">
              {t("DashbordSetting.StoreInformation")}
            </Text>
            <Text c="dimmed" size="xs">
              {t("DashbordSetting.StoreDesription")}
            </Text>
          </Stack>
        </Group>

        <SimpleGrid
          cols={{ base: 1, sm: 2, lg: 3 }}
          spacing="md"
          px={{ base: 0, sm: "xs", md: "md" }}
        >
          <TextInput
            {...inputProps}
            label={t("DashbordSetting.StoreName")}
            value={form.store_name}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, store_name: e.target.value }))
            }
            leftSection={<IconBuildingStore size={15} />}
          />
          <TextInput
            {...inputProps}
            label={t("DashbordSetting.SupportEmail")}
            value={form.support_email}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, support_email: e.target.value }))
            }
            leftSection={<IconMail size={15} />}
          />
          <TextInput
            {...inputProps}
            label={t("DashbordSetting.Phone")}
            value={form.phone ?? ""}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, phone: e.target.value }))
            }
            styles={{
              input: {
                fontFamily:
                  locale === "en" ? "system-ui, sans-serif" : "inherit",
              },
            }}
            leftSection={<IconPhone size={15} />}
          />
        </SimpleGrid>

        <HorizontalDivider my="xs" />

        <Group align="flex-start" wrap="nowrap" gap="sm">
          <IconTruck
            size={26}
            color="var(--mantine-color-surface-9)"
            style={{ flexShrink: 0 }}
          />
          <Stack gap={2}>
            <Text size="md" fw={600} c="surface.5">
              {t("DashbordSetting.ShippingRules")}
            </Text>
            <Text c="dimmed" size="xs">
              {t("DashbordSetting.ShippingDescription")}
            </Text>
          </Stack>
        </Group>

        <SimpleGrid
          cols={{ base: 1, sm: 2, lg: 3 }}
          spacing="md"
          px={{ base: 0, sm: "xs", md: "md" }}
        >
          <NumberInput
            {...inputProps}
            label={t("DashbordSetting.ShippingRate")}
            value={form.shipping_rate}
            onChange={(val) =>
              setForm((prev) => ({
                ...prev,
                shipping_rate: typeof val === "number" ? val : Number(val) || 0,
              }))
            }
            styles={{
              input: {
                fontFamily:
                  locale === "en" ? "system-ui, sans-serif" : "inherit",
              },
            }}
            min={0}
            hideControls
            leftSection={<IconTruckDelivery size={15} />}
          />
          <NumberInput
            {...inputProps}
            label={t("DashbordSetting.FreeShippingThreshold")}
            value={form.free_shipping_threshold}
            onChange={(val) =>
              setForm((prev) => ({
                ...prev,
                free_shipping_threshold:
                  typeof val === "number" ? val : Number(val) || 0,
              }))
            }
            styles={{
              input: {
                fontFamily:
                  locale === "en" ? "system-ui, sans-serif" : "inherit",
              },
            }}
            min={0}
            hideControls
            leftSection={<IconReceiptTax size={15} />}
          />
        </SimpleGrid>

        <HorizontalDivider my="xs" />

        <Group
          justify="space-between"
          align="center"
          px={{ base: 0, sm: "xs", md: "md" }}
          wrap="wrap-reverse"
          gap="md"
        >
          <Group gap="xs" w={{ base: "100%", sm: "auto" }}>
            <Button
              type="button"
              size="sm"
              className={styles.modalButton}
              onClick={handleReset}
              disabled={isUpdating}
              flex={{ base: 1, sm: "initial" }}
            >
              {t("DashbordSetting.Reset")}
            </Button>
            <Button
              size="sm"
              className={styles.modalButton}
              onClick={handleSave}
              loading={isUpdating}
              flex={{ base: 1, sm: "initial" }}
            >
              {t("DashbordSetting.SaveChanges")}
            </Button>
          </Group>

          <Group gap="xs" wrap="nowrap">
            <IconAlertCircle
              size={18}
              color="var(--mantine-color-surface-9)"
              style={{ flexShrink: 0 }}
            />
            <Text size="xs" c="dimmed">
              {t("DashbordSetting.SaveDescription")}
            </Text>
          </Group>
        </Group>
      </Stack>
    </GlassPanel>
  );
}

export default function StoreSetting() {
  const t = useTranslations("Admin");
  const { settings, updateSettings, isUpdating } = useStoreSettings();

  return (
    <Stack gap="md" pos="relative">
      <GlassPanel p={{ base: "sm", sm: "md" }}>
        <Group align="center" wrap="nowrap" gap="sm">
          <IconSettings
            size={36}
            color="var(--mantine-color-surface-9)"
            style={{ flexShrink: 0 }}
          />
          <Stack gap={2} style={{ minWidth: 0 }}>
            <Title order={2} fz={{ base: "h4", sm: "h2" }} c="surface.5">
              {t("DashbordSetting.SettingTitle")}
            </Title>
            <Text c="dimmed" size="xs">
              {t("DashbordSetting.SettingDescription")}
            </Text>
          </Stack>
        </Group>
      </GlassPanel>

      {settings && (
        <SettingsForm
          key={`${settings.id}-${settings.updated_at ?? ""}`}
          initialData={settings}
          onSave={async (updatedData) => {
            await updateSettings(updatedData);
          }}
          isUpdating={isUpdating}
        />
      )}
    </Stack>
  );
}
