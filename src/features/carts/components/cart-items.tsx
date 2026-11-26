import PrimaryButton from "@/components/ui/action-panel/primary-button";
import SecondaryButton from "@/components/ui/action-panel/secondary-button";
import GlassPanel from "@/components/ui/glass/glass-panel";
import OrderSummary from "@/features/orders/components/order-summary";

import { useStoreSettings } from "@/features/admin/hooks/use-store-settings";
import { Link } from "@/navigation";
import { Box, Container, Flex, Group, ScrollArea, Title } from "@mantine/core";
import {
  IconArrowLeft,
  IconArrowRight,
  IconShoppingCart,
} from "@tabler/icons-react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { CartItem } from "../cart.type";
import { useCart } from "../hooks/use-cart";
import CartItemsList from "./cart-items-list";
import UserCardSkeleton from "./user-card-skeleton";

interface CartItemsProps {
  initialCart: CartItem[];
}

export default function CartItems({ initialCart }: CartItemsProps) {
  const { cartTotal, isLoading } = useCart(initialCart);
  const { settings } = useStoreSettings();
  const router = useRouter();

  const threshold = settings?.free_shipping_threshold ?? 2000000;
  const baseRate = settings?.shipping_rate ?? 200000;

  const shippingFee = cartTotal >= threshold ? 0 : baseRate;
  const totalAmount = cartTotal + shippingFee;

  const t2 = useTranslations("Cart");
  const locale = useLocale();

  const icon =
    locale === "fa" ? (
      <IconArrowLeft
        size={16}
        style={{ marginLeft: 5 }}
        color="var(--mantine-color-surface-9)"
      />
    ) : (
      <IconArrowRight
        size={16}
        style={{ marginRight: 5 }}
        color="var(--mantine-color-surface-9)"
      />
    );

  return (
    <Container
      size="55rem"
      w="100%"
      pt={{ base: 16, sm: 24 }}
      pb={{ base: 24, sm: 40 }}
      px={{ base: "xs", sm: "md" }}
    >
      <Group
        justify="space-between"
        align="center"
        wrap="nowrap"
        mb="3rem"
        style={{
          position: "sticky",
          top: "95px",
          zIndex: 100,
          width: "100%",
          padding: "8px 16px",
          borderRadius: "999px",
          background: "rgba(25, 12, 26, 0.88)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid #7b6210",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.35)",
        }}
      >
        <Group
          gap={8}
          align="center"
          wrap="nowrap"
          style={{ flexShrink: 1, minWidth: 0 }}
        >
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
              minWidth: 32,
              borderRadius: "50%",
              background:
                "linear-gradient(135deg, rgba(230, 180, 230, 0.25), rgba(255, 255, 255, 0.05))",
              border: "1px solid rgba(255, 255, 255, 0.18)",
              color: "#f3d9fa",
            }}
          >
            <IconShoppingCart size={18} stroke={1.7} />
          </Box>
          <Title
            order={2}
            fz={{ base: "0.95rem", sm: "1.25rem" }}
            fw={700}
            c="#f5ede0"
            style={{
              letterSpacing: "-0.02em",
              whiteSpace: "nowrap",
            }}
          >
            {t2("ShoppingCart")}
          </Title>
        </Group>

        <SecondaryButton
          btnText={t2("ContinueShopping")}
          icon={icon}
          radius={20}
          size="xs"
          onClick={() => router.push("/books")}
        />
      </Group>

      {isLoading ? (
        <UserCardSkeleton />
      ) : (
        <Flex
          direction={{ base: "column", md: "row" }}
          align={{ base: "stretch", md: "flex-start" }}
          gap="md"
        >
          <GlassPanel flex={{ base: "1 1 auto", md: 2 }} p={"md"} w="100%">
            <ScrollArea.Autosize
              mah={{ base: 320, sm: 400 }}
              offsetScrollbars
              type="hover"
            >
              <CartItemsList initialCart={initialCart} />
            </ScrollArea.Autosize>
          </GlassPanel>

          <OrderSummary
            subtotal={cartTotal}
            shippingFee={shippingFee}
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
      )}
    </Container>
  );
}
