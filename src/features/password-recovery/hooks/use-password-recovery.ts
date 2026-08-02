"use client";
import { forgotPassword, resetPassword } from "@/services/auth";
import { useState } from "react";

export const usePasswordRecovery = () => {
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
        return false;
      }

      setSuccess("لینک بازیابی رمز عبور به ایمیل شما ارسال شد.");
      return true;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("خطایی در ارتباط با سرور رخ داد.");
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
        setError(response.error);
        return false;
      }

      setSuccess("رمز عبور شما با موفقیت تغییر کرد.");
      return true;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("خطایی در تغییر رمز رخ داد. ممکن است لینک منقضی شده باشد.");
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
