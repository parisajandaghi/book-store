import { paymentFormValues } from "@/features/carts/cart.type";
import { useRouter } from "@/navigation";
import { checkoutAtom } from "@/store/checkout-atom";
import { UseFormReturnType } from "@mantine/form";
import { useAtom } from "jotai";

import { useState } from "react";

// این هوک به فرم پرداخت برای ولیدیشن نیاز دارد
interface UseCheckoutStepperProps {
  paymentForm: UseFormReturnType<paymentFormValues>;
}

export function useCheckoutStepper({ paymentForm }: UseCheckoutStepperProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const [checkout, setCheckout] = useAtom(checkoutAtom);

  const router = useRouter();

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
        const result = paymentForm.validate();

        if (result.hasErrors) {
          return;
        }
        setIsProcessing(true);
        try {
          const orderPayload = {
            addressId: checkout.addressId,
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

          console.log("Submitting order:", orderPayload);

          // TODO:
          // const order = await createOrder(orderPayload);

          router.push(`/cart/success`);

          return;
        } catch (error) {
          console.error(error);
          return;
        }
      }
    }
    setActiveStep((current) => (current < 3 ? current + 1 : current));
  };

  const prevStep = () => {
    setActiveStep((current: number) => (current > 0 ? current - 1 : current));
  };

  return { activeStep, setActiveStep, nextStep, prevStep, isProcessing };
}
