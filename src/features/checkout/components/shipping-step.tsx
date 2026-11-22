import GlassPanel from "@/components/ui/glass/glass-panel";
import { getFormattedPrice } from "@/utils/book.utils";
import { Box, Group, Radio, Stack, Text } from "@mantine/core";
import {
  IconCalendarWeek,
  IconClock,
  IconRocket,
  IconTruck,
} from "@tabler/icons-react";
import { useLocale, useTranslations } from "next-intl";
import style from "../address-selector.module.css";

import { EXCHANGE_RATE } from "@/constants";
import { useStoreSettings } from "@/features/admin/hooks/use-store-settings";
import { useCart } from "@/features/carts/hooks/use-cart";
import { checkoutAtom } from "@/store/checkout-atom";
import { useAtom } from "jotai";
import ShippingDateTimePicker from "./shipping-date-time-picker";

export default function ShippingStep() {
  const [checkout, setCheckout] = useAtom(checkoutAtom);
  const { settings } = useStoreSettings();
  const { cartTotal } = useCart();
  const t = useTranslations("CheckoutInfo");
  const t1 = useTranslations("Product");
  const locale = useLocale();

  const rawBaseRate = Number(settings?.shipping_rate) || 200000;
  const rawThreshold = Number(settings?.free_shipping_threshold) || 2000000;

  const isCartInToman = cartTotal > 1000;
  const threshold = isCartInToman ? rawThreshold : rawThreshold / EXCHANGE_RATE;
  const baseRate = isCartInToman ? rawBaseRate : rawBaseRate / EXCHANGE_RATE;
  const expressExtra = isCartInToman ? 100000 : 100000 / EXCHANGE_RATE;

  const isFree = rawThreshold > 0 && cartTotal >= threshold;

  const standardPrice = isFree ? 0 : baseRate;
  const expressPrice = isFree ? expressExtra : baseRate + expressExtra;

  const renderPrice = (amount: number) => {
    if (amount === 0) {
      return locale === "fa" ? "رایگان" : "Free";
    }
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
      price: expressPrice,
      icon: <IconRocket size={26} color="#d4af37" stroke={1.2} />,
    },
    {
      id: "standard",
      title: t("Shipping.Methods.Standard.Title"),
      description: t("Shipping.Methods.Standard.Description"),
      days: t("Shipping.Methods.Standard.Days"),
      price: standardPrice,
      icon: <IconTruck size={26} color="#d4af37" stroke={1.2} />,
    },
  ];

  return (
    <GlassPanel p={{ base: "sm", sm: "md" }}>
      <Stack gap="sm">
        <div>
          <Text fz="h5" fw={600} c="textMain.0">
            {t("Shipping.ShippingTitle.Title")}
          </Text>
          <Text c="dimmed" fz="xs" mt={2}>
            {t("Shipping.ShippingTitle.Description")}
          </Text>
        </div>

        <Radio.Group
          value={checkout.shippingMethod || "standard"}
          onChange={(value) =>
            setCheckout((prev) => ({
              ...prev,
              shippingMethod: value,
            }))
          }
        >
          <Stack gap={8}>
            {shippingMethods.map((item) => (
              <Radio.Card className={style.root} value={item.id} key={item.id}>
                <Group
                  wrap="nowrap"
                  align="center"
                  justify="space-between"
                  w="100%"
                >
                  <Group wrap="nowrap" align="flex-start" gap="xs">
                    <Radio.Indicator
                      variant="outline"
                      size="xs"
                      className={style.indicator}
                      mt={4}
                    />

                    <div>
                      <Text
                        className={style.label}
                        fz={{ base: "xs", sm: "sm" }}
                      >
                        {item.title}
                      </Text>
                      <Text className={style.description} fz="xs">
                        {item.description}
                      </Text>
                      <Group gap={4}>
                        <IconClock
                          size={13}
                          color="#9b7d1b"
                          style={{ marginTop: 2 }}
                        />
                        <Text
                          className={style.description}
                          fz="xs"
                          ff={
                            locale === "en"
                              ? "system-ui, sans-serif"
                              : "inherit"
                          }
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
            ))}
          </Stack>
        </Radio.Group>

        <Box mt={4}>
          <Group gap={6} mb={6}>
            <IconCalendarWeek size={18} color="#d4af37" />
            <Text fz="sm" fw={600} c="textMain.0">
              {t("Shipping.ShippingTitle.SelectDateTime")}
            </Text>
          </Group>
          <ShippingDateTimePicker />
        </Box>
      </Stack>
    </GlassPanel>
  );
}
