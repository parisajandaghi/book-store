"use client";
import PrimaryButton from "@/components/ui/action-panel/primary-button";
import {
  CheckoutAddressFormValues,
  userMockAddresses,
} from "@/features/carts/cart.type";
import AddressModal from "@/features/carts/components/address-modal";
import AddressSelector from "@/features/carts/components/address-selector";
import CartItemsList from "@/features/carts/components/cart-items-list";
import AddressForm from "@/features/carts/components/address-form";
import OrderSummary from "@/features/orders/components/order-summary";
import { Container, Group, ScrollArea, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useTranslations } from "next-intl";
export default function Checkout() {
  const t = useTranslations("CheckoutInfo");
  const form = useForm<CheckoutAddressFormValues>({});
  const hasAddress = userMockAddresses.length > 0;
  return (
    <Container w={"55rem"} pt={40} pb={40}>
      <Group align="stretch">
        {hasAddress ? <AddressSelector /> : <AddressForm form={form} title={t("ShippingInfo")}/>}
        <Stack flex={1}>
          <OrderSummary
            button={<PrimaryButton btnText={t("ContinueToPayment")} width={'100%'}/>}
          >
            <ScrollArea h={150} offsetScrollbars type="hover">
              <CartItemsList compact={true} />
            </ScrollArea>
          </OrderSummary>
        </Stack>
      </Group>
      <AddressModal form={form}/>
    </Container>
  );
}
