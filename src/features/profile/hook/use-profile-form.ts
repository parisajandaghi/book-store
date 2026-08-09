import { useState, useEffect } from "react";
import { useForm } from "@mantine/form";
import { useUser } from "./use-user";

export const useProfileForm = () => {
  const { user, refetch } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    initialValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      password: "",
    },
    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "فرمت ایمیل نامعتبر است",
    },
  });

  useEffect(() => {
    if (user) {
      form.setValues({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        password: "",
      });
    }
  }, [user?.name, user?.email, user?.phone]);

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "خطا در به‌روزرسانی اطلاعات پروفایل",
        );
      }

      form.setFieldValue("password", "");

      if (refetch) {
        refetch();
      }

      return true;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("خطای ناشناخته‌ای رخ داده است");
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { form, loading, error, handleSubmit };
};
