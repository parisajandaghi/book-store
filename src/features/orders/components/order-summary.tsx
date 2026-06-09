import HorizontalDivider from "@/components/ui/elements/horizontal-divider";
import { Box, Group, Text } from "@mantine/core";
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
  children,
}: OrderSummaryProps) {
  const t2 = useTranslations("OrderDetails");
  const t1 = useTranslations("Product");
  const locale = useLocale();

  const renderPrice = (amount: number) => {
    const formattedPrice = getFormattedPrice(amount, locale);
    return locale === "en"
      ? `${t1("CurrencySymbol")} ${formattedPrice}`
      : `${formattedPrice} ${t1("CurrencySymbol")}`;
  };
  return (
    <GlassPanel flex={1} p={"sm"}>
      <Group gap={5}>
        <IconFileDescription size={18} color="var(--mantine-color-surface-9)" />
        <Text fz={"xs"} c={"textMain.3"}>
          {t2("OrderSummary")}
        </Text>
      </Group>
      <HorizontalDivider />
      {children && (
        <>
          <Box py="sm">{children}</Box>
          <HorizontalDivider />
        </>
      )}
      <Group justify="space-between" px={"xs"}>
        <Text fz={"xs"} c={"textMain.3"}>
          {t2("Subtotal")}
        </Text>
        <Text
          fz={"xs"}
          c={"textMain.3"}
          ff={locale === "en" ? "system-ui, sans-serif" : "inherit"}
        >
          {renderPrice(subtotal)}
        </Text>
      </Group>
      <Group justify="space-between" px={"xs"}>
        <Text fz={"xs"} c={"textMain.3"}>
          {t2("ShippingFee")}
        </Text>
        <Text
          fz={"xs"}
          c={"textMain.3"}
          ff={locale === "en" ? "system-ui, sans-serif" : "inherit"}
        >
          {renderPrice(shippingFee)}
        </Text>
      </Group>
      <HorizontalDivider />

      <Group justify="space-between" p={"xs"}>
        <Text fz={"xs"} c={"textMain.3"}>
          {t2("TotalAmount")}
        </Text>
        <Text
          fz={"xs"}
          c={"surface.4"}
          ff={locale === "en" ? "system-ui, sans-serif" : "inherit"}
        >
          {renderPrice(totalAmount)}
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
