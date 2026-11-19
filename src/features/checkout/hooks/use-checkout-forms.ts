import {
  CheckoutAddressFormValues,
  paymentFormValues,
} from "@/features/carts/cart.type";
import { isValidLuhn, toEnglishDigits } from "@/utils/book.utils";
import { useForm } from "@mantine/form";
import { useLocale, useTranslations } from "next-intl";

export function useCheckoutForms() {
  const t = useTranslations("CheckoutInfo");
  const locale = useLocale();
  const currentLang = locale === "en" ? "en" : "fa";
  const checkoutForm = useForm<CheckoutAddressFormValues>({
    initialValues: {
      recipientName: "",
      phone: "",
      postalCode: "",
      address: "",
      province: currentLang === "en" ? "Tehran" : "تهران",
      city: currentLang === "en" ? "Tehran" : "تهران",
    },
    validate: {
      recipientName: (value) => {
        const trimmed = value?.trim() || "";
        if (trimmed.length < 3)
          return t("AddressForm.Validation.NameMinLength");
        if (trimmed.length > 50)
          return t("AddressForm.Validation.NameMaxLength");
        return null;
      },

      phone: (value) => {
        const normalized = toEnglishDigits(value || "").trim();
        if (!normalized) return t("AddressForm.Validation.ValidPhone");

        return /^09\d{9}$/.test(normalized)
          ? null
          : t("AddressForm.Validation.ValidPhone");
      },

      postalCode: (value) => {
        const normalized = toEnglishDigits(value || "").trim();
        if (!normalized) return t("AddressForm.Validation.ValidPostalCode");

        return /^\d{10}$/.test(normalized)
          ? null
          : t("AddressForm.Validation.ValidPostalCode");
      },

      address: (value) => {
        const trimmed = value?.trim() || "";
        if (trimmed.length < 10)
          return t("AddressForm.Validation.AddressMinLength");
        if (trimmed.length > 300)
          return t("AddressForm.Validation.AddressMaxLength");
        return null;
      },

      province: (value) =>
        !value?.trim() ? t("AddressForm.Validation.RequiredProvince") : null,

      city: (value) =>
        !value?.trim() ? t("AddressForm.Validation.RequiredCity") : null,
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
      cardHolderName: (value) => {
        const val = value.trim();
        if (!val || val.length < 3) {
          return t("PaymentForm.Validation.CardHolderName");
        }
        if (!/^[\u0600-\u06FFa-zA-Z\s]+$/.test(val)) {
          return t("PaymentForm.Validation.CardHolderName");
        }
        return null;
      },

      cardNumber: (value) => {
        const cleanNumber = String(toEnglishDigits(value)).replace(
          /[\s-]/g,
          "",
        );
        if (!/^\d{16}$/.test(cleanNumber)) {
          return t("PaymentForm.Validation.CardNumber");
        }
        if (!isValidLuhn(cleanNumber)) {
          return t("PaymentForm.Validation.CardNumberValidation");
        }
        return null;
      },

      expiryDate: (value) => {
        const cleanDate = String(toEnglishDigits(value)).trim();
        const pattern = /^(0[4-9]|1[0-2])\/(0[1-9]|1[0-2])$/;

        if (!pattern.test(cleanDate)) {
          return t("PaymentForm.Validation.ExpiryDate");
        }
        return null;
      },

      cvv2: (value) => {
        const cleanCvv = String(toEnglishDigits(value)).trim();
        return /^\d{3,4}$/.test(cleanCvv)
          ? null
          : t("PaymentForm.Validation.Cvv2");
      },
    },
  });
  return { checkoutForm, paymentForm };
}
