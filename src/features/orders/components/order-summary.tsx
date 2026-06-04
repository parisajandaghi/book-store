import HorizontalDivider from "@/components/ui/elements/horizontal-divider";
import { Group, Text } from "@mantine/core";
import { IconFileDescription } from "@tabler/icons-react";
import { useLocale, useTranslations } from "next-intl";

import GlassPanel from "@/components/ui/glass/glass-panel";
import { getFormattedPrice } from "@/utils/book.utils";
import { OrderSummaryProps } from "../order.type";

export default function OrderSummary({
  button,
  subtotal,
  shippingFee,
  totalAmount,
}: OrderSummaryProps) {
  const t2 = useTranslations("OrderDetails");
  const t1 = useTranslations("Product");
  const locale = useLocale();
  const formattedPrice = getFormattedPrice(subtotal, locale);
  return (
    <GlassPanel flex={1} p={"sm"}>
      <Group gap={5}>
        <IconFileDescription size={18} color="var(--mantine-color-surface-9)" />
        <Text fz={"xs"} c={"textMain.3"}>
          {t2("OrderSummary")}
        </Text>
      </Group>
      <HorizontalDivider />
      <Group justify="space-between" px={"xs"}>
        <Text fz={"xs"} c={"textMain.3"}>
          {t2("Subtotal")}
        </Text>
        <Text
          fz={"xs"}
          c={"textMain.3"}
          ff={locale === "en" ? "system-ui, sans-serif" : "inherit"}
        >
          {locale === "en"
            ? `${t1("CurrencySymbol")} ${formattedPrice}`
            : `${formattedPrice} ${t1("CurrencySymbol")}`}
        </Text>
      </Group>
      <Group justify="space-between" px={"xs"}>
        <Text fz={"xs"} c={"textMain.3"}>
          {t2("ShippingFee")}
        </Text>
        <Text fz={"xs"} c={"textMain.3"}>
          {shippingFee}
        </Text>
      </Group>
      <HorizontalDivider />

      <Group justify="space-between" p={"xs"}>
        <Text fz={"xs"} c={"textMain.3"}>
          {t2("TotalAmount")}
        </Text>
        <Text fz={"xs"} c={"surface.4"}>
          {totalAmount}
        </Text>
      </Group>

      {button && (
        <>
          <HorizontalDivider />
          <Group w={"100%"} justify="center" align="center">
            {button}
          </Group>
        </>
      )}
    </GlassPanel>
  );
}
