import { Group, Paper, Text } from "@mantine/core";
import { IconChevronUp, IconChevronDown } from "@tabler/icons-react";
import React, { useEffect, useRef, useState, useTransition } from "react";
import style from "./header.module.css";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/navigation";

export default function LanguageDropdown() {
  const [langOpen, setLangOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const locale = useLocale();
  const t = useTranslations("Header");

  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleLanguage = (lang: string) => {
    setLangOpen(false);
    if (lang !== locale) {
      startTransition(() => {
        router.replace(pathname, { locale: lang });
      });
    }
  };

  const languages: ("en" | "fa")[] = ["en", "fa"];

  return (
    <div ref={dropdownRef} style={{ position: "relative" }}>
      <Group
        className={style.dropDown}
        w={locale === "fa" ? 65 : 74}
        onClick={() => setLangOpen(!langOpen)}
        c={"surface.3"}
        style={{ opacity: isPending ? 0.5 : 1, cursor: "pointer" }}
      >
        <Text size="xs" c="textMain.2">
          {t(locale as "en" | "fa")}
        </Text>
        {langOpen ? <IconChevronUp size={15} /> : <IconChevronDown size={15} />}
      </Group>

      {langOpen && (
        <Paper
          shadow="sm"
          mt={2}
          w={locale === "fa" ? 65 : 74}
          bg={"primary.0"}
          className={style.paper}
        >
          {languages.map((lang, idx) => (
            <div key={lang}>
              <Text
                size="xs"
                className={style.langItem}
                onClick={() => toggleLanguage(lang)}
              >
                {t(lang)}
              </Text>
              {idx < 1 && <div className={style.divider}></div>}
            </div>
          ))}
        </Paper>
      )}
    </div>
  );
}
