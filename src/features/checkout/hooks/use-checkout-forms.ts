import {
  CheckoutAddressFormValues,
  paymentFormValues,
} from "@/features/carts/cart.type";
import { useForm } from "@mantine/form";
import { useTranslations } from "next-intl";

export function useCheckoutForms() {
  const t = useTranslations("CheckoutInfo");
  const checkoutForm = useForm<CheckoutAddressFormValues>({
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
  const paymentForm = useForm<paymentFormValues>({
    initialValues: {
      cardHolderName: "",
      cardNumber: "",
      expiryDate: "",
      cvv2: "",
    },
    validate: {
      cardHolderName: (value) =>
        value.trim().length < 3
          ? t("PaymentForm.Validation.CardHolderName")
          : null,

      cardNumber: (value) =>
        /^\d{16}$/.test(value.replace(/\s/g, ""))
          ? null
          : t("PaymentForm.Validation.CardNumber"),

      expiryDate: (value) =>
        /^(0[1-9]|1[0-2])\/\d{2}$/.test(value)
          ? null
          : t("PaymentForm.Validation.ExpiryDate"),

      cvv2: (value) =>
        /^\d{3,4}$/.test(value) ? null : t("PaymentForm.Validation.Cvv2"),
    },
  });
  return { checkoutForm, paymentForm };
}
