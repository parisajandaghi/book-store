"use client";
import { useForm } from "@mantine/form";
import { useTranslations } from "next-intl";

export interface ForgotPasswordFormValues {
  email: string;
}

export interface ResetPasswordFormValues {
  password: string;
  confirmPassword: string;
}

export function usePasswordRecoveryForms() {
  const t = useTranslations("PasswordRecovery");

  const forgotPasswordForm = useForm<ForgotPasswordFormValues>({
    initialValues: {
      email: "",
    },
    validate: {
      email: (value) =>
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|ir|org|net|edu|gov|co|io|info|biz|me)$/i.test(
          value,
        )
          ? null
          : t("Validation.InvalidEmail"),
    },
  });

  const resetPasswordForm = useForm<ResetPasswordFormValues>({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: {
      password: (value) =>
        value.length < 6 ? t("Validation.PasswordMinLength") : null,

      confirmPassword: (value, values) =>
        value !== values.password ? t("Validation.PasswordsDoNotMatch") : null,
    },
  });

  return { forgotPasswordForm, resetPasswordForm };
}
