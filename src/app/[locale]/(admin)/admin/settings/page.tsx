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
  LoadingOverlay,
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
import { useTranslations } from "next-intl";
import style from "../../../../../features/carts/cart.module.css";
import { StoreSettings } from "@/services/store-setting.service";
import { useStoreSettings } from "@/features/admin/hooks/use-store-settings";

// کامپوننت داخلی فرم: نیازی به useEffect ندارد و مقادیر اولیه را مستقیماً از initialData می‌گیرد
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
  const [form, setForm] = useState<StoreSettings>(initialData);

  const handleReset = () => {
    setForm(initialData);
  };

  const handleSave = async () => {
    await onSave(form);
  };

  return (
    <GlassPanel p={"md"}>
      <Stack>
        <Group>
          <IconBook size={30} color="var(--mantine-color-surface-9)" />
          <Stack>
            <Text size="md" c="surface.5">
              {t("DashbordSetting.StoreInformation")}
            </Text>
            <Text c="dimmed" size="sm">
              {t("DashbordSetting.StoreDesription")}
            </Text>
          </Stack>
        </Group>
        <SimpleGrid cols={3} px={40}>
          <TextInput
            label={t("DashbordSetting.StoreName")}
            value={form.store_name}
            onChange={(e) => setForm({ ...form, store_name: e.target.value })}
            w={300}
            classNames={{ input: style.input, label: style.label }}
            leftSection={<IconBuildingStore size={16} />}
          />
          <TextInput
            label={t("DashbordSetting.SupportEmail")}
            value={form.support_email}
            onChange={(e) =>
              setForm({ ...form, support_email: e.target.value })
            }
            w={300}
            classNames={{ input: style.input, label: style.label }}
            leftSection={<IconMail size={16} />}
          />
          <TextInput
            label={t("DashbordSetting.Phone")}
            value={form.phone ?? ""}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            w={300}
            classNames={{ input: style.input, label: style.label }}
            leftSection={<IconPhone size={16} />}
          />
        </SimpleGrid>
      </Stack>

      <HorizontalDivider />

      <Stack>
        <Group>
          <IconTruck size={30} color="var(--mantine-color-surface-9)" />
          <Stack>
            <Text size="md" c="surface.5">
              {t("DashbordSetting.ShippingRules")}
            </Text>
            <Text c="dimmed" size="sm">
              {t("DashbordSetting.ShippingDescription")}
            </Text>
          </Stack>
        </Group>
        <SimpleGrid cols={3} px={40}>
          <TextInput
            label={t("DashbordSetting.ShippingRate")}
            value={form.shipping_rate}
            onChange={(val) =>
              setForm({ ...form, shipping_rate: Number(val) || 0 })
            }
            w={300}
            min={0}
            classNames={{ input: style.input, label: style.label }}
            leftSection={<IconTruckDelivery size={16} />}
          />
          <TextInput
            label={t("DashbordSetting.FreeShippingThreshold")}
            value={form.free_shipping_threshold}
            onChange={(val) =>
              setForm({ ...form, free_shipping_threshold: Number(val) || 0 })
            }
            w={300}
            min={0}
            classNames={{ input: style.input, label: style.label }}
            leftSection={<IconReceiptTax size={16} />}
          />
        </SimpleGrid>
      </Stack>

      <HorizontalDivider />

      <Group justify="space-between" px={40}>
        <Group justify="flex-end" mt="md">
          <Button
            className={styles.modalButton}
            onClick={handleReset}
            disabled={isUpdating}
          >
            {t("DashbordSetting.Reset")}
          </Button>
          <Button
            className={styles.modalButton}
            onClick={handleSave}
            loading={isUpdating}
          >
            {t("DashbordSetting.SaveChanges")}
          </Button>
        </Group>
        <Group>
          <Text size="sm" c={"dimmed"}>
            {t("DashbordSetting.SaveDescription")}
          </Text>
          <IconAlertCircle size={20} color="var(--mantine-color-surface-9)" />
        </Group>
      </Group>
    </GlassPanel>
  );
}

export default function StoreSetting() {
  const t = useTranslations("Admin");
  const { settings, isLoading, isUpdating, updateSettings } =
    useStoreSettings();
  console.log("setting", settings);

  return (
    <Stack gap={"lg"} pos="relative">
      <GlassPanel p={"md"}>
        <Group>
          <IconSettings size={40} color="var(--mantine-color-surface-9)" />
          <Stack gap={5}>
            <Title order={2} c="surface.5">
              {t("DashbordSetting.SettingTitle")}
            </Title>
            <Text c="dimmed" size="sm" mt={4}>
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
