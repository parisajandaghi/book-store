import PrimaryButton from "@/components/ui/action-panel/primary-button";
import SecondaryButton from "@/components/ui/action-panel/secondary-button";
import GlassPanel from "@/components/ui/glass/glass-panel";
import OrderSummary from "@/features/orders/components/order-summary";
import { Link } from "@/navigation";
import { Container, Group, ScrollArea, Stack, Title } from "@mantine/core";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { useLocale, useTranslations } from "next-intl";
import { useCart } from "../hooks/use-cart";
import CartItemsList from "./cart-items-list";

export default function CartItems() {
  const { cartTotal } = useCart();

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
              <CartItemsList />
            </ScrollArea>
          </GlassPanel>
          <OrderSummary
            button={
              <Link href={"/cart/checkout"}>
                <PrimaryButton btnText={t2("CheckOut")} />
              </Link>
            }
            subtotal={cartTotal}
            shippingFee={12222}
            totalAmount={1221333}
          />
        </Group>
      </Stack>
    </Container>
  );
}
