"use client";

import { useRouter } from "@/navigation";
import { Select } from "@mantine/core";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

export default function SortSelect() {
  const t = useTranslations("Books");
  const router = useRouter();
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort") || "";
  return (
    <Select
      placeholder={t("Sort")}
      value={sort}
      w={150}
      classNames={{
        input: "custom-select-input",
        dropdown: "custom-select-dropdown",
        option: "custom-select-option",
      }}
      data={[
        { value: "most_popular", label: t("MostPopular") },
        { value: "most_expensive", label: t("MostExpensive") },
        { value: "cheapest", label: t("Cheapest") },
      ]}
      onChange={(value) => {
        if (!value) return;

        const params = new URLSearchParams(searchParams.toString());
        params.set("sort", value);

        router.push(`?${params.toString()}`);
      }}
    />
  );
}
