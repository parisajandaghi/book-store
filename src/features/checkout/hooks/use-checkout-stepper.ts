import { CheckoutRequest, paymentFormValues } from "@/features/carts/cart.type";
import { useRouter } from "@/navigation";
import { checkoutAtom } from "@/store/checkout-atom";
import { notify } from "@/utils/notification";
import { UseFormReturnType } from "@mantine/form";
import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface UseCheckoutStepperProps {
  paymentForm: UseFormReturnType<paymentFormValues>;
}

export function useCheckoutStepper({ paymentForm }: UseCheckoutStepperProps) {
  const [checkout, setCheckout] = useAtom(checkoutAtom);
  const [isProcessing, setIsProcessing] = useState(false);
  const t = useTranslations("Notifications");
  const router = useRouter();

  const activeStep = checkout.activeStep;

  const setActiveStep = (step: number | ((prev: number) => number)) => {
    setCheckout((prev) => ({
      ...prev,
      activeStep: typeof step === "function" ? step(prev.activeStep) : step,
    }));
  };

  async function submitOrder() {
    const payload: CheckoutRequest = {
      addressId: Number(checkout.addressId),
      recipientName: checkout.recipientName,
      phone: checkout.phone,
      address: checkout.address,
      shippingMethod: checkout.shippingMethod,
      deliveryDate: checkout.deliveryDate,
      deliveryTime: checkout.deliveryTime,
      payment: {
        cardHolderName: paymentForm.values.cardHolderName,
        cardNumber: paymentForm.values.cardNumber,
        expiryDate: paymentForm.values.expiryDate,
        cvv2: paymentForm.values.cvv2,
      },
    };

    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer fake-token",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error);
    }

    return response.json();
  }

  const nextStep = async () => {
    if (activeStep === 0) {
      if (!checkout.addressId) {
        notify.error({
          id: "checkout-address-required",
          title: t("ErrorTitle"),
          message: t("SelectAddressWarning"),
        });
        return;
      }

      setActiveStep(1);
      return;
    }

    if (activeStep === 1) {
      if (
        !checkout.shippingMethod ||
        !checkout.deliveryDate ||
        !checkout.deliveryTime
      ) {
        notify.error({
          id: "checkout-shipping-required",
          title: t("ErrorTitle"),
          message: t("SelectShippingWarning"),
        });
        return;
      }

      setActiveStep(2);
      return;
    }

    const validation = paymentForm.validate();
    if (validation.hasErrors) return;

    setIsProcessing(true);

    try {
      const result = await submitOrder();
      notify.success({
        id: "checkout-order-success",
        title: t("SuccessTitle"),
        message: t("OrderPlacedSuccess"),
      });
      setCheckout({
        activeStep: 0,
        addressId: null,
        shippingMethod: null,
        deliveryDate: null,
        deliveryTime: null,
        recipientName: "",
        phone: "",
        address: "",
      });

      router.push(`/cart/success?orderId=${result.orderId}`);
      router.refresh();
    } catch (error) {
      console.error(error);
      notify.error({
        id: "checkout-order-error",
        title: t("ErrorTitle"),
        message: error instanceof Error ? error.message : t("OrderPlacedError"),
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const prevStep = () => {
    setActiveStep((current) => Math.max(current - 1, 0));
  };

  return {
    activeStep,
    setActiveStep,
    nextStep,
    prevStep,
    isProcessing,
  };
}
