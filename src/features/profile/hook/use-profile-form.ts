// use-profile-form.ts
import { useState, useEffect } from "react";
import { useForm } from "@mantine/form";
import { useTranslations } from "next-intl";
import { useUser } from "./use-user";

export const useProfileForm = () => {
  const { user, refetch } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const t = useTranslations("Profile");

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
    validate: {
      name: (val) => {
        if (!val || val.trim().length < 3) {
          return t("ValidationMessage.NameRequired");
        }
        return null;
      },

      email: (val) => {
        if (!val || val.trim().length === 0) {
          return t("ValidationMessage.RequiredField");
        }
        const emailRegex =
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|ir|org|net|edu|gov|co|io|info|biz|me)$/i;
        return emailRegex.test(val.trim())
          ? null
          : t("ValidationMessage.InvalidEmail");
      },

      phone: (val) => {
        if (!val || val.trim().length === 0) {
          return t("ValidationMessage.RequiredField");
        }
        return /^09\d{9}$/.test(val.trim())
          ? null
          : t("ValidationMessage.InvalidPhoneNumber");
      },

      password: (val) => {
        if (!val || val.trim().length === 0) {
          return t("ValidationMessage.RequiredField");
        }
        return val.length >= 6 ? null : t("ValidationMessage.PasswordTooShort");
      },
    },
  });

  useEffect(() => {
    if (user) {
      const updatedValues = {
        name: user.name ?? "",
        email: user.email ?? "",
        phone: user.phone ?? "",
        password: "",
      };
      form.setInitialValues(updatedValues);
      form.setValues(updatedValues);
    }
  }, [user?.id, user?.name, user?.email, user?.phone]);

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    setError(null);

    try {
      const payload: Record<string, string> = {
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
      };

      if (values.password.trim()) {
        payload.password = values.password;
      }

      const response = await fetch("/api/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(
          resData.error ||
            resData.message ||
            t("Errors.UpdateFailed"),
        );
      }

      form.setFieldValue("password", "");

      if (refetch) {
        await refetch();
      }

      return true;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(t("Errors.UnknownError"));
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { form, loading, error, handleSubmit };
};
