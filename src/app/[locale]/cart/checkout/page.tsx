"use client";
import PrimaryButton from "@/components/ui/action-panel/primary-button";
import SecondaryButton from "@/components/ui/action-panel/secondary-button";
import { CheckoutAddressFormValues } from "@/features/carts/cart.type";
import AddressModal from "@/features/carts/components/address-modal";
import AddressStep from "@/features/carts/components/address-step";
import CartItemsList from "@/features/carts/components/cart-items-list";
import PaymentStep from "@/features/carts/components/payment-step";
import ShippingStep from "@/features/carts/components/shipping-step";
import OrderSummary from "@/features/orders/components/order-summary";
import {
  Box,
  Container,
  Group,
  ScrollArea,
  Stack,
  Stepper,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  IconArrowLeft,
  IconArrowRight,
  IconCreditCard,
  IconMapPin,
  IconTruckDelivery,
} from "@tabler/icons-react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import style from "../../../../features/carts/cart.module.css";
import { checkoutAtom } from "@/store/checkout-atom";
import { useAtom } from "jotai";
export default function Checkout() {
  const [checkout, setCheckout] = useAtom(checkoutAtom);
  const t = useTranslations("CheckoutInfo");
  const form = useForm<CheckoutAddressFormValues>({
    initialValues: {
      recipientName: "",
      phone: "",
      postalCode: "",
      address: "",
      province: "",
      city: "",
    },
    validate: {
      recipientName: (value) =>
        value.length < 3 ? t("AddressForm.Validation.NameMinLength") : null,

      phone: (value) =>
        /^09\d{9}$/.test(value) ? null : t("AddressForm.Validation.ValidPhone"),

      postalCode: (value) =>
        /^\d{10}$/.test(value)
          ? null
          : t("AddressForm.Validation.ValidPostalCode"),

      address: (value) =>
        value.length < 10 ? t("AddressForm.Validation.AddressMinLength") : null,

      province: (value) =>
        !value ? t("AddressForm.Validation.RequiredProvince") : null,

      city: (value) =>
        !value ? t("AddressForm.Validation.RequiredCity") : null,
    },
  });
  const locale = useLocale();
  const [activeStep, setActiveStep] = useState(0);
  console.log("activeStep", activeStep);
  const icon =
    locale === "fa" ? (
      <IconArrowLeft size={14} />
    ) : (
      <IconArrowRight size={14} />
    );
  console.log(checkout);

  const nextStep = () => {
    switch (activeStep) {
      case 0:
        if (!checkout.addressId) {
          return;
        }
        setCheckout((prev) => ({
          ...prev,
          addressId: Number(checkout.addressId),
        }));
        break;
      case 1: {
        if (
          !checkout.shippingMethod ||
          !checkout.deliveryDate ||
          !checkout.deliveryTime
        ) {
          return;
        }

        break;
      }
      case 2: {
        // Payment validation later
        break;
      }
    }
    setActiveStep((current) => (current < 3 ? current + 1 : current));
  };
  const prevStep = () =>
    setActiveStep((current: number) => (current > 0 ? current - 1 : current));
  const getButtonText = () => {
    switch (activeStep) {
      case 0:
        return t("ConfirmAndSelectShipping");
      case 1:
        return t("ConfirmAndContinueToPayment");
      case 2:
        return t("FinalPayment");
      default:
        return t("Continue");
    }
  };
  return (
    <Container w={"55rem"} pt={40} pb={40}>
      <Group w={"100%"} mb={"xl"}>
        <Box style={{ flex: 1 }}>
          <Stepper
            active={activeStep}
            onStepClick={setActiveStep}
            color="yellow.7"
            size="xs"
            classNames={{
              step: style.stepWrapper,
              stepIcon: style.glassyStepIcon,
              separator: style.separator,
              stepLabel: style.Label,
              stepDescription: style.Description,
            }}
          >
            <Stepper.Step
              label={t("CheckoutStepper.Address")}
              description={t("CheckoutStepper.AddressDescription")}
              icon={
                <IconMapPin
                  size={22}
                  stroke={1.5}
                  color="#d4af37"
                  style={{ marginTop: 5 }}
                />
              }
            />
            <Stepper.Step
              label={t("CheckoutStepper.Shipping")}
              description={t("CheckoutStepper.ShippingDescription")}
              icon={
                <IconTruckDelivery
                  size={22}
                  stroke={1.5}
                  color="#d4af37"
                  style={{ marginTop: 5 }}
                />
              }
            />
            <Stepper.Step
              label={t("CheckoutStepper.Payment")}
              description={t("CheckoutStepper.PaymentDescription")}
              icon={
                <IconCreditCard
                  size={22}
                  stroke={1.5}
                  color="#d4af37"
                  style={{ marginTop: 5 }}
                />
              }
            />
          </Stepper>
        </Box>
        {activeStep > 0 && (
          <SecondaryButton
            icon={icon}
            width={45}
            hight={30}
            radius={10}
            onClick={prevStep}
          />
        )}
      </Group>
      <Group align="stretch">
        {activeStep === 0 && <AddressStep form={form} />}
        {activeStep === 1 && <ShippingStep />}
        {activeStep === 2 && <PaymentStep form={form} />}
        <Stack flex={1}>
          <OrderSummary
            button={
              <PrimaryButton
                btnText={getButtonText()}
                width={"100%"}
                onClick={nextStep}
              />
            }
          >
            <ScrollArea h={150} offsetScrollbars type="hover">
              <CartItemsList compact={true} />
            </ScrollArea>
          </OrderSummary>
        </Stack>
      </Group>
      <AddressModal form={form} />
    </Container>
  );
}
