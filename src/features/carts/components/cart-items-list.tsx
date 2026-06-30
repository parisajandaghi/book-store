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
            <Grid.Col span={compact ? 5 : 5}>
              <Group wrap="nowrap" gap={compact ? "xs" : "md"}>
                <Image
                  src={item.image_url}
                  w={compact ? 28 : 40}
                  h={compact ? 42 : 60}
                   alt={localizedBook?.title ?? ""}
                />

                <Center
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: compact ? 2 : 5,
                    alignItems: "flex-start",
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

            <Grid.Col span={compact ? 3 : 2}>
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

            <Grid.Col span={compact ? 4 : 3}>
              <Center h={"100%"}>
                <NumberInput
                  itemId={item.id}
                  quantity={item.quantity}
                  compact={compact}
                />
              </Center>
            </Grid.Col>

            {!compact && (
              <Grid.Col span={2}>
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
