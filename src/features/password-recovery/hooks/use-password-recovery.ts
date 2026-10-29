"use client";
import { forgotPassword, resetPassword } from "@/services/auth";
import { notify } from "@/utils/notification";
import { useTranslations } from "next-intl";
import { useState } from "react";

export const usePasswordRecovery = () => {
  const t = useTranslations("Notifications");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleForgotPassword = async (email: string) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await forgotPassword(email);

      if (response?.error) {
        setError(response.error);
        notify.error({
          title: t("RecoveryPassword"),
          message: t("SomethingWentWrong"),
        });
        return false;
      }
      notify.success({
        title: t("RecoveryPassword"),
        message: t("RecoveryPasswordMessage"),
      });

      return true;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        notify.error({
          title: t("RecoveryPassword"),
          message: t("SomethingWentWrong"),
        });
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (token: string, newPassword: string) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await resetPassword(token, newPassword);

      if (response?.error) {
        notify.error({
          title: t("ResetPassword"),
          message: t("SomethingWentWrong"),
        });
        return false;
      }

      notify.success({
        title: t("ResetPassword"),
        message: t("ResetPasswordMessage"),
      });
      return true;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        notify.error({
          title: t("ResetPassword"),
          message: t("ResetPasswordExpiredMessage"),
        });
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    success,
    handleForgotPassword,
    handleResetPassword,
  };
};
