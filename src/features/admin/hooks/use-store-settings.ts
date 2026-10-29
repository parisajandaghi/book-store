// src/hooks/use-store-settings.ts
import useSWR from "swr";
import { useState } from "react";
import { getErrorMessage } from "@/utils/error";
import type { StoreSettings } from "@/services/store-setting.service";
import { useTranslations } from "next-intl";
import { notify } from "@/utils/notification";

export type { StoreSettings };

export type UpdateStoreSettingsInput = Omit<
  StoreSettings,
  "id" | "updated_at"
> & {
  id?: number;
};

type UpdateResult =
  | { success: true; error?: never }
  | { success: false; error: string };

const fetcher = async (url: string): Promise<StoreSettings> => {
  const res = await fetch(url);
  if (!res.ok) {
    const errorData = (await res.json().catch(() => ({}))) as {
      error?: string;
    };
    throw new Error(errorData.error || "خطا در دریافت اطلاعات تنظیمات");
  }
  const result = await res.json();
  // اگر API داده را در data برمی‌گرداند یا مستقیم خود آبجکت است
  return result.data ?? result;
};

export function useStoreSettings() {
  const t = useTranslations("Notifications");
  const { data, error, isLoading, mutate } = useSWR<StoreSettings>(
    "/api/admin/settings",
    fetcher,
    {
      revalidateOnFocus: false,
    },
  );

  const [isUpdating, setIsUpdating] = useState(false);

  const updateSettings = async (
    updatedData: UpdateStoreSettingsInput,
  ): Promise<UpdateResult> => {
    setIsUpdating(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) {
        const errorData = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(errorData.error || "خطا در ذخیره اطلاعات");
      }

      const result = (await res.json()) as { data: StoreSettings };
      await mutate(result.data, false);
      notify.success({
        title: t("Setting"),
        message: t("BookStoreSettingUpdatedSuccessfully"),
      });
      return { success: true };
    } catch (err: unknown) {
        notify.error({
        title: t("Setting"),
        message: t("BookStoreSettingUpdatedFaild"),
      });
      return { success: false, error: getErrorMessage(err) };
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    settings: data,
    isLoading,
    isError: Boolean(error),
    error: error ? getErrorMessage(error) : null,
    isUpdating,
    updateSettings,
    mutate,
  };
}
