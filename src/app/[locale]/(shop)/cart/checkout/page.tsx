"use client";
import PrimaryButton from "@/components/ui/action-panel/primary-button";
import SecondaryButton from "@/components/ui/action-panel/secondary-button";
import { SHIPPING_FEE } from "@/constants";
import CartItemsList from "@/features/carts/components/cart-items-list";
import { useCart } from "@/features/carts/hooks/use-cart";
import AddressModal from "@/features/checkout/components/address-modal";
import AddressStep from "@/features/checkout/components/address-step";
import PaymentStep from "@/features/checkout/components/payment-step";
import ShippingStep from "@/features/checkout/components/shipping-step";
import { useCheckoutForms } from "@/features/checkout/hooks/use-checkout-forms";
import { useCheckoutStepper } from "@/features/checkout/hooks/use-checkout-stepper";
import OrderSummary from "@/features/orders/components/order-summary";
import { useRouter } from "@/navigation";
import {
  Box,
  Container,
  Flex,
  Group,
  ScrollArea,
  Stepper,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconArrowRight,
  IconCreditCard,
  IconMapPin,
  IconTruckDelivery,
} from "@tabler/icons-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect } from "react";
import style from "../../../../../features/carts/cart.module.css";

export default function Checkout() {
  const router = useRouter();
  const { checkoutForm, paymentForm } = useCheckoutForms();
  const { activeStep, isProcessing, nextStep, prevStep, setActiveStep } =
    useCheckoutStepper({ paymentForm });
  const { cartTotal, isLoading } = useCart();

  const totalAmount = cartTotal + SHIPPING_FEE;

  const locale = useLocale();
  const t = useTranslations("CheckoutInfo");

  useEffect(() => {
    if (!isLoading && cartTotal === 0) {
      router.replace("/cart");
    }
  }, [cartTotal, isLoading, router]);
  const icon =
    locale === "fa" ? (
      <IconArrowLeft size={14} />
    ) : (
      <IconArrowRight size={14} />
    );

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
    <Container
      w="100%"
      maw="58rem"
      pt={{ base: 16, sm: 40 }}
      pb={{ base: 20, sm: 40 }}
      px={{ base: "xs", sm: "md" }}
    >
      <Group
        w="100%"
        mb={{ base: "md", sm: "xl" }}
        justify="space-between"
        align="center"
        wrap="nowrap"
        gap="sm"
      >
        <Box style={{ flex: 1, minWidth: 0 }}>
          <Stepper
            active={activeStep}
            onStepClick={setActiveStep}
            color="yellow.7"
            size="sm"
            iconSize={32}
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
              icon={<IconMapPin size={16} stroke={1.6} color="#d4af37" />}
            />
            <Stepper.Step
              label={t("CheckoutStepper.Shipping")}
              description={t("CheckoutStepper.ShippingDescription")}
              icon={
                <IconTruckDelivery size={16} stroke={1.6} color="#d4af37" />
              }
            />
            <Stepper.Step
              label={t("CheckoutStepper.Payment")}
              description={t("CheckoutStepper.PaymentDescription")}
              icon={<IconCreditCard size={16} stroke={1.6} color="#d4af37" />}
            />
          </Stepper>
        </Box>

        {activeStep > 0 && (
          <SecondaryButton
            icon={icon}
            width={{ base: 36, sm: 40 }}
            hight={{ base: 32, sm: 36 }}
            radius={10}
            onClick={prevStep}
          />
        )}
      </Group>

      <Flex
        direction={{ base: "column", md: "row" }}
        align={{ base: "stretch", md: "flex-start" }}
        gap="md"
      >
        <Box flex={{ base: "1 1 auto", md: 2 }} w="100%">
          {activeStep === 0 && <AddressStep form={checkoutForm} />}
          {activeStep === 1 && <ShippingStep />}
          {activeStep === 2 && <PaymentStep form={paymentForm} />}
        </Box>

        <Box flex={{ base: "1 1 auto", md: 1 }} w="100%">
          <OrderSummary
            subtotal={cartTotal}
            shippingFee={SHIPPING_FEE}
            totalAmount={totalAmount}
            button={
              <PrimaryButton
                btnText={getButtonText()}
                width={"100%"}
                onClick={nextStep}
                isLoading={isProcessing}
              />
            }
          >
            <ScrollArea
              h={{ base: 120, sm: 150 }}
              offsetScrollbars
              type="hover"
            >
              <CartItemsList compact={true} />
            </ScrollArea>
          </OrderSummary>
        </Box>
      </Flex>
      <AddressModal form={checkoutForm} />
    </Container>
  );
}
