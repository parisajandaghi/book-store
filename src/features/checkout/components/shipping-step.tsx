import { Box, Group, Radio, Stack, Text } from "@mantine/core";
import {
  IconCalendarWeek,
  IconClock,
  IconRocket,
  IconTruck,
} from "@tabler/icons-react";
import { useLocale, useTranslations } from "next-intl";
import React, { useState } from "react";
import style from "../address-selector.module.css";
import { getFormattedPrice } from "@/utils/book.utils";
import GlassPanel from "@/components/ui/glass/glass-panel";

import { checkoutAtom } from "@/store/checkout-atom";
import { useAtom } from "jotai";
import ShippingDateTimePicker from "./shipping-date-time-picker";
export default function ShippingStep() {
  const [checkout, setCheckout] = useAtom(checkoutAtom);
  const t = useTranslations("CheckoutInfo");
  const t1 = useTranslations("Product");
  const locale = useLocale();
  const renderPrice = (amount: number) => {
    const formattedPrice = getFormattedPrice(amount, locale);
    return locale === "en"
      ? `${t1("CurrencySymbol")} ${formattedPrice}`
      : `${formattedPrice} ${t1("CurrencySymbol")}`;
  };
  const shippingMethods = [
    {
      id: "express",
      title: t("Shipping.Methods.Express.Title"),
      description: t("Shipping.Methods.Express.Description"),
      days: t("Shipping.Methods.Express.Days"),
      price: 150000,
      icon: <IconRocket size={30} color="#d4af37" stroke={1} />,
    },
    {
      id: "standard",
      title: t("Shipping.Methods.Standard.Title"),
      description: t("Shipping.Methods.Standard.Description"),
      days: t("Shipping.Methods.Standard.Days"),
      price: 50000,
      icon: <IconTruck size={30} color="#d4af37" stroke={1} />,
    },
  ];
  const shippingCards = shippingMethods.map((item) => (
    <Radio.Card className={style.root} value={item.id.toString()} key={item.id}>
      <Group wrap="nowrap" align="center" justify="space-between" w="100%">
        <Group wrap="nowrap" align="flex-start" gap="xs">
          <Radio.Indicator
            variant="outline"
            size="xs"
            className={style.indicator}
            mt={4}
          />

          <div>
            <Text className={style.label} fz={{ base: "xs", sm: "sm" }}>
              {item.title}
            </Text>
            <Text className={style.description}>{item.description}</Text>
            <Group gap={4}>
              <IconClock size={14} color="#9b7d1b" style={{ marginTop: 3 }} />
              <Text
                className={style.description}
                ff={locale === "en" ? "system-ui, sans-serif" : "inherit"}
              >
                {item.days}
              </Text>
            </Group>
          </div>
        </Group>

        <Group wrap="nowrap" gap="xs" align="center">
          <Text
            c="#d4af37"
            fz={{ base: "xs", sm: "sm" }}
            fw="bold"
            ff={locale === "en" ? "system-ui, sans-serif" : "inherit"}
          >
            {renderPrice(item.price)}
          </Text>
          <Box visibleFrom="xs">{item.icon}</Box>
        </Group>
      </Group>
    </Radio.Card>
  ));

  return (
    <Stack flex={2}>
      <Stack gap={5}>
        <Text fz={"h4"} c={"textMain.0"}>
          {t("Shipping.ShippingTitle.Title")}
        </Text>
        <Text c={"dimmed"} fz={"sm"}>
          {t("Shipping.ShippingTitle.Description")}
        </Text>
      </Stack>
      <Radio.Group
        value={checkout.shippingMethod}
        onChange={(value) =>
          setCheckout((prev) => ({
            ...prev,
            shippingMethod: value,
          }))
        }
      >
        <Stack gap="xs">{shippingCards}</Stack>
      </Radio.Group>
      <GlassPanel>
        <Group p={"xs"} gap={"xs"}>
          <IconCalendarWeek color="#d4af37" />
          <Text fz={"h6"} c={"textMain.0"}>
            {t("Shipping.ShippingTitle.SelectDateTime")}
          </Text>
        </Group>
        <ShippingDateTimePicker />
      </GlassPanel>
    </Stack>
  );
}
