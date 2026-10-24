import PrimaryButton from "@/components/ui/action-panel/primary-button";
import SecondaryButton from "@/components/ui/action-panel/secondary-button";
import GlassPanel from "@/components/ui/glass/glass-panel";
import OrderSummary from "@/features/orders/components/order-summary";
import { Link } from "@/navigation";
import {
  Container,
  Flex,
  Group,
  ScrollArea,
  Stack,
  Title,
} from "@mantine/core";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { useLocale, useTranslations } from "next-intl";
import CartItemsList from "./cart-items-list";
import { useCart } from "../hooks/use-cart";
import { SHIPPING_FEE } from "@/constants";

export default function CartItems() {
  const { cartTotal } = useCart();

  const totalAmount = cartTotal + SHIPPING_FEE;
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
    <Container
      size="lg"
      w="100%"
      maw="58rem"
      pt={{ base: 20, sm: 40 }}
      pb={{ base: 20, sm: 40 }}
      px={{ base: "xs", sm: "md" }}
    >
      <Stack gap="lg">
        <Group justify="space-between" wrap="wrap" gap="sm">
          <Title
            order={2}
            fz={{ base: "1.25rem", sm: "1.6rem" }}
            c={"textMain.0"}
          >
            {t2("ShoppingCart")}
          </Title>
          <SecondaryButton
            btnText={t2("ContinueShopping")}
            icon={icon}
            radius={20}
            size="xs" // سایز متناسب برای موبایل و دسکتاپ
          />
        </Group>

        <Flex
          direction={{ base: "column", md: "row" }}
          align={{ base: "stretch", md: "flex-start" }}
          gap="md"
        >
          <GlassPanel flex={{ base: "1 1 auto", md: 2 }} p={"md"} w="100%">
            <ScrollArea
              h={{ base: 320, sm: 400 }}
              offsetScrollbars
              type="hover"
            >
              <CartItemsList />
            </ScrollArea>
          </GlassPanel>

          <OrderSummary
            subtotal={cartTotal}
            shippingFee={SHIPPING_FEE}
            totalAmount={totalAmount}
            button={
              <Link
                href={"/cart/checkout"}
                style={{ width: "100%", display: "block" }}
              >
                <PrimaryButton btnText={t2("CheckOut")} width={"100%"} />
              </Link>
            }
          />
        </Flex>
      </Stack>
    </Container>
  );
}
