import NumberInput from "@/components/ui/action-panel/number-input";
import PrimaryButton from "@/components/ui/action-panel/primary-button";
import SecondaryButton from "@/components/ui/action-panel/secondary-button";
import OrderSummary from "@/features/orders/components/order-summary";
import { getFormattedPrice, getLocalizedBook } from "@/utils/book.utils";
import {
  Center,
  Container,
  Grid,
  Group,
  Image,
  ScrollArea,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconArrowLeft, IconArrowRight, IconTrash } from "@tabler/icons-react";
import { useLocale, useTranslations } from "next-intl";
import { useCart } from "../hooks/use-cart";
import GlassPanel from "@/components/ui/glass/glass-panel";

export default function CartItemsList() {
  const { cartItems, removeFromCart, cartTotal } = useCart();
  const t1 = useTranslations("Product");
  const t2 = useTranslations("Cart");
  const locale = useLocale();

  const icon =
    locale === "fa" ? (
      <IconArrowRight
        size={16}
        style={{ marginLeft: 5 }}
        color="var(--mantine-color-surface-9)"
      />
    ) : (
      <IconArrowLeft
        size={16}
        style={{ marginRight: 5 }}
        color="var(--mantine-color-surface-9)"
      />
    );
  return (
    <Container w={"55rem"} pt={40} pb={40}>
      <Stack>
        <Group justify="space-between">
          <Title c={"textMain.0"}>{t2("ShoppingCart")}</Title>
          <SecondaryButton btnText={t2("ContinueShopping")} icon={icon} />
        </Group>
        <Group align="flex-start">
          <GlassPanel flex={2} p={"md"}>
            <ScrollArea h={400} offsetScrollbars type="hover">
              <Stack gap="md">
                {" "}
                {cartItems.map((item) => {
                  const formattedPrice = getFormattedPrice(
                    item.price * item.quantity,
                    locale,
                  );
                  const localizedBook = getLocalizedBook(item, locale);
                  return (
                    <Grid
                      key={item.book_id}
                      p={"xs"}
                      style={{
                        display: "flex",
                        backgroundColor: "#1f0f1fa8",
                        borderRadius: 5,
                        border: "1px solid #d4af3766",
                      }}
                    >
                      <Grid.Col span={5}>
                        <Group wrap="nowrap">
                          <Image
                            src={item.image_url}
                            w={40}
                            h={60}
                            alt={item.title}
                          />

                          <Center
                            h={"100%"}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 5,
                              alignItems: "flex-start",
                            }}
                          >
                            <Text fz={"xs"} c={"textMain.3"}>
                              {localizedBook?.title}
                            </Text>
                            <Text fz={"xs"} c={"dimmed"}>
                              {localizedBook?.author}
                            </Text>
                          </Center>
                        </Group>
                      </Grid.Col>

                      <Grid.Col span={2}>
                        <Center h={"100%"}>
                          <Text
                            fz={"xs"}
                            c={"textMain.3"}
                            ff={
                              locale === "en"
                                ? "system-ui, sans-serif"
                                : "inherit"
                            }
                          >
                            {locale === "en"
                              ? `${t1("CurrencySymbol")} ${formattedPrice}`
                              : `${formattedPrice} ${t1("CurrencySymbol")}`}
                          </Text>
                        </Center>
                      </Grid.Col>

                      <Grid.Col span={3}>
                        <Center h={"100%"}>
                          <NumberInput
                            bookId={item.book_id}
                            quantity={item.quantity}
                          />
                        </Center>
                      </Grid.Col>

                      <Grid.Col span={2}>
                        <Center
                          h={"100%"}
                          onClick={() => {
                            removeFromCart(item.book_id);
                          }}
                        >
                          <IconTrash
                            size={18}
                            color="var(--mantine-color-surface-9)"
                            style={{ cursor: "pointer" }}
                          />
                        </Center>
                      </Grid.Col>
                    </Grid>
                  );
                })}
              </Stack>
            </ScrollArea>
          </GlassPanel>
          <OrderSummary
            button={<PrimaryButton btnText={t2("CheckOut")} />}
            subtotal={cartTotal}
            shippingFee="120000 تومان"
            totalAmount="550000 تومان"
          />
        </Group>
      </Stack>
    </Container>
  );
}
