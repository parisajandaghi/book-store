import { SegmentedControl, Box } from "@mantine/core";
import React, { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/navigation";
import style from "./header.module.css";
export default function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("Header");
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = (newLocale: string) => {
    if (newLocale !== locale) {
      startTransition(() => {
        router.replace(pathname, { locale: newLocale });
      });
    }
  };

  return (
    <Box className={style.wrapper} style={{ opacity: isPending ? 0.6 : 1 }}>
      <SegmentedControl
        value={locale}
        onChange={handleLanguageChange}
        disabled={isPending}
        data={[
          { label: t("fa"), value: "fa" },
          { label: t("en"), value: "en" },
        ]}
        size="xs"
        radius="lg"
        classNames={{
          root: style.root,
          indicator: style.indicator,
          label: style.label,
        }}
      />
    </Box>
  );
}
