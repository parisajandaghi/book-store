import { CheckoutRequest, paymentFormValues } from "@/features/carts/cart.type";
import { useRouter } from "@/navigation";
import { checkoutAtom } from "@/store/checkout-atom";
import { UseFormReturnType } from "@mantine/form";
import { useAtom } from "jotai";
import { useState } from "react";

interface UseCheckoutStepperProps {
  paymentForm: UseFormReturnType<paymentFormValues>;
}

export function useCheckoutStepper({ paymentForm }: UseCheckoutStepperProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const [checkout] = useAtom(checkoutAtom);

  const router = useRouter();

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
console.log(payload);
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
      if (!checkout.addressId) return;

      setActiveStep(1);
      return;
    }

    if (activeStep === 1) {
      if (
        !checkout.shippingMethod ||
        !checkout.deliveryDate ||
        !checkout.deliveryTime
      ) {
        return;
      }

      setActiveStep(2);
      return;
    }

    const validation = paymentForm.validate();

    if (validation.hasErrors) return;

    setIsProcessing(true);

    try {
      await submitOrder();

      router.push("/cart/success");
    } catch (error) {
      console.error(error);
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
