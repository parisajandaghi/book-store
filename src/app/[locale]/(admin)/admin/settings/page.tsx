"use client";

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
import { useForm } from "@mantine/form";
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
import { EXCHANGE_RATE } from "@/constants";
import AdminSettingsSkeleton from "@/features/admin/components/admin-setting-skeleton";

interface SettingsFormValues {
  store_name: string;
  support_email: string;
  phone: string;
  shipping_rate: number;
  free_shipping_threshold: number;
}

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
  const locale = useLocale();
  const isEn = locale === "en";

  const toDisplayAmount = (tomanAmount: number) =>
    isEn ? Number((tomanAmount / EXCHANGE_RATE).toFixed(2)) : tomanAmount;

  const toDbAmount = (displayAmount: number) =>
    isEn ? Math.round(displayAmount * EXCHANGE_RATE) : displayAmount;

  const form = useForm<SettingsFormValues>({
    initialValues: {
      store_name: initialData.store_name ?? "",
      support_email: initialData.support_email ?? "",
      phone: initialData.phone ?? "",
      shipping_rate: toDisplayAmount(initialData.shipping_rate ?? 0),
      free_shipping_threshold: toDisplayAmount(
        initialData.free_shipping_threshold ?? 0,
      ),
    },
    validate: {
      store_name: (value) =>
        !value || value.trim().length < 2 ? t("Validation.StoreNameMin") : null,
      support_email: (value) =>
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
          ? t("Validation.InvalidEmail")
          : null,
      phone: (value) =>
        !/^[0-9+\-\s()]{8,15}$/.test(value.trim())
          ? t("Validation.InvalidPhone")
          : null,
      shipping_rate: (value) =>
        value === undefined ||
        value === null ||
        Number.isNaN(value) ||
        value < 0
          ? t("Validation.ShippingNegative")
          : null,
      free_shipping_threshold: (value) =>
        value === undefined ||
        value === null ||
        Number.isNaN(value) ||
        value < 0
          ? t("Validation.ThresholdNegative")
          : null,
    },
  });

  const handleSubmit = async (values: SettingsFormValues) => {
    const payloadToSave: StoreSettings = {
      ...initialData,
      store_name: values.store_name.trim(),
      support_email: values.support_email.trim(),
      phone: values.phone.trim(),
      shipping_rate: toDbAmount(values.shipping_rate),
      free_shipping_threshold: toDbAmount(values.free_shipping_threshold),
    };

    await onSave(payloadToSave);
  };

  const inputProps = {
    size: "sm" as const,
    w: "100%",
    maw: { base: "100%", sm: 280 },
    classNames: { input: style.input, label: style.label },
  };

  return (
    <GlassPanel p={{ base: "sm", sm: "md", md: "lg" }}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
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
              leftSection={<IconBuildingStore size={15} />}
              {...form.getInputProps("store_name")}
            />
            <TextInput
              {...inputProps}
              label={t("DashbordSetting.SupportEmail")}
              leftSection={<IconMail size={15} />}
              {...form.getInputProps("support_email")}
            />
            <TextInput
              {...inputProps}
              label={t("DashbordSetting.Phone")}
              leftSection={<IconPhone size={15} />}
              styles={{
                input: {
                  fontFamily: isEn ? "system-ui, sans-serif" : "inherit",
                },
              }}
              {...form.getInputProps("phone")}
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
              thousandSeparator=","
              decimalScale={isEn ? 2 : 0}
              prefix={isEn ? "$ " : undefined}
              suffix={!isEn ? " تومان" : undefined}
              min={0}
              hideControls
              leftSection={<IconTruckDelivery size={15} />}
              styles={{
                input: {
                  fontFamily: isEn ? "system-ui, sans-serif" : "inherit",
                },
              }}
              {...form.getInputProps("shipping_rate")}
            />
            <NumberInput
              {...inputProps}
              label={t("DashbordSetting.FreeShippingThreshold")}
              thousandSeparator=","
              decimalScale={isEn ? 2 : 0}
              prefix={isEn ? "$ " : undefined}
              suffix={!isEn ? " تومان" : undefined}
              min={0}
              hideControls
              leftSection={<IconReceiptTax size={15} />}
              styles={{
                input: {
                  fontFamily: isEn ? "system-ui, sans-serif" : "inherit",
                },
              }}
              {...form.getInputProps("free_shipping_threshold")}
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
                onClick={() => form.reset()}
                disabled={isUpdating || !form.isDirty()}
                flex={{ base: 1, sm: "initial" }}
              >
                {t("DashbordSetting.Reset")}
              </Button>
              <Button
                type="submit"
                size="sm"
                className={styles.modalButton}
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
      </form>
    </GlassPanel>
  );
}

export default function StoreSetting() {
  const t = useTranslations("Admin");
  const locale = useLocale();
  const { settings, updateSettings, isUpdating } = useStoreSettings();

  if (!settings) {
    return <AdminSettingsSkeleton />;
  }

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

      <SettingsForm
        key={`${settings.id}-${settings.updated_at ?? ""}-${locale}`}
        initialData={settings}
        onSave={async (updatedData) => {
          await updateSettings(updatedData);
        }}
        isUpdating={isUpdating}
      />
    </Stack>
  );
}
