import React from "react";
import { useCart } from "../hooks/use-cart";
import { useLocale, useTranslations } from "next-intl";
import { getFormattedPrice, getLocalizedBook } from "@/utils/book.utils";
import { Stack, Grid, Group, Center, Image, Text } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import NumberInput from "@/components/ui/action-panel/number-input";

interface CartItemsListProps {
  compact?: boolean; 
}

export default function CartItemsList({ compact = false }: CartItemsListProps) {
  const { cartItems, removeFromCart } = useCart();
  const t1 = useTranslations("Product");
  const locale = useLocale();

  return (
    <Stack gap={compact ? "xs" : "md"}>
      {cartItems.map((item) => {
        const formattedPrice = getFormattedPrice(
          item.price * item.quantity,
          locale,
        );
        const localizedBook = getLocalizedBook(item, locale);

        return (
          <Grid
            key={item.id}
            p={"xs"}
            align="center"
            style={{
              backgroundColor: compact ? "transparent" : "#1f0f1fa8",
              borderRadius: 5,
              border: "1px solid #d4af3766",
              borderBottom: compact
                ? "1px solid #d4af3722"
                : "1px solid #d4af3766",
              paddingBottom: compact ? "8px" : undefined,
            }}
          >
            {/* عنوان و عکس کتاب */}
            <Grid.Col span={compact ? 5 : { base: 12, xs: 5 }}>
              <Group wrap="nowrap" gap={compact ? "xs" : "sm"}>
                <Image
                  src={item.image_url}
                  w={compact ? 28 : 40}
                  h={compact ? 42 : 60}
                  alt={localizedBook?.title ?? ""}
                  fit="contain"
                />

                <Center
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: compact ? 2 : 5,
                    alignItems: "flex-start",
                    overflow: "hidden",
                  }}
                >
                  <Text fz={compact ? 10 : "xs"} c={"textMain.3"} lineClamp={1}>
                    {localizedBook?.title}
                  </Text>
                  <Text fz={compact ? 9 : "xs"} c={"dimmed"} lineClamp={1}>
                    {localizedBook?.author}
                  </Text>
                </Center>
              </Group>
            </Grid.Col>

            {/* قیمت */}
            <Grid.Col span={compact ? 3 : { base: 4, xs: 2 }}>
              <Center h={"100%"}>
                <Text
                  fz={compact ? 10 : "xs"}
                  c={"textMain.3"}
                  ff={locale === "en" ? "system-ui, sans-serif" : "inherit"}
                >
                  {locale === "en"
                    ? `${t1("CurrencySymbol")} ${formattedPrice}`
                    : `${formattedPrice} ${t1("CurrencySymbol")}`}
                </Text>
              </Center>
            </Grid.Col>

            {/* شمارنده تعداد */}
            <Grid.Col span={compact ? 4 : { base: 5, xs: 3 }}>
              <Center h={"100%"}>
                <NumberInput
                  itemId={item.id}
                  quantity={item.quantity}
                  compact={compact}
                />
              </Center>
            </Grid.Col>

            {/* آیکون حذف */}
            {!compact && (
              <Grid.Col span={{ base: 3, xs: 2 }}>
                <Center h={"100%"} onClick={() => removeFromCart(item.id)}>
                  <IconTrash
                    size={18}
                    color="var(--mantine-color-surface-9)"
                    style={{ cursor: "pointer" }}
                  />
                </Center>
              </Grid.Col>
            )}
          </Grid>
        );
      })}
    </Stack>
  );
}
