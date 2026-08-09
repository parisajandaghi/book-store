"use client";
import PrimaryButton from "@/components/ui/action-panel/primary-button";
import HorizontalDivider from "@/components/ui/elements/horizontal-divider";
import GlassPanel from "@/components/ui/glass/glass-panel";
import { Link } from "@/navigation";
import { Group, PasswordInput, Stack, Text, TextInput } from "@mantine/core";
import { useTranslations } from "next-intl";
import style from "../../../features/carts/cart.module.css";
import { useForm } from "@mantine/form";
import { useRouter } from "@/navigation";
export default function Signup() {
  const t = useTranslations("Register");
  const t1 = useTranslations("Login");
  const router = useRouter();
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
      name: (value) => (value.trim().length > 2 ? null : t("NameRequired")),

      email: (value) => (/^\S+@\S+$/.test(value) ? null : t("InvalidEmail")),

      phoneNumber: (value) =>
        /^09\d{9}$/.test(value) ? null : t("InvalidPhoneNumber"),

      password: (value) => (value.length >= 6 ? null : t("PasswordTooShort")),

      confirmPassword: (value, values) =>
        value === values.password ? null : t("PasswordNotMatch"),
    },
  });
  const handleSubmit = async (values: typeof form.values) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
          phoneNumber: values.phoneNumber,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        form.setFieldError("email", data.error);
        return;
      }
      form.reset();
      router.push("/login");
    } catch {
      form.setFieldError("email", "Something went wrong");
    }
  };
  return (
    <Group w={"100%"} h={"100%"} justify="center" align="center">
      <GlassPanel mih={650} w={450} justify="center" align="center">
        <Text c="surface.6" size="xl" fw={"bold"}>
          {t("Title")}
        </Text>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              placeholder={t("Name")}
              label={t("Name")}
              w={300}
              classNames={{
                input: style.input,
                label: style.label,
              }}
              {...form.getInputProps("name")}
            />
            <TextInput
              placeholder={t("Email")}
              label={t("Email")}
              w={300}
              classNames={{
                input: style.input,
                label: style.label,
              }}
              {...form.getInputProps("email")}
            />
            <TextInput
              placeholder={t("PhoneNumber")}
              label={t("PhoneNumber")}
              w={300}
              classNames={{
                input: style.input,
                label: style.label,
              }}
              {...form.getInputProps("phoneNumber")}
            />
            <PasswordInput
              placeholder={t("Password")}
              label={t("Password")}
              w={300}
              classNames={{
                input: style.input,
                label: style.label,
              }}
              {...form.getInputProps("password")}
            />
            <PasswordInput
              placeholder={t("ConfirmPassword")}
              label={t("ConfirmPassword")}
              w={300}
              classNames={{
                input: style.input,
                label: style.label,
              }}
              {...form.getInputProps("confirmPassword")}
            />

            <PrimaryButton
              btnText={t1("CreateAccount")}
              width={300}
              type="submit"
            />
          </Stack>
        </form>
        <HorizontalDivider my="xs" width={300} />
        <Group>
          <Text c="dimmed" size="sm">
            {t("AlreadyHaveAccount")}
          </Text>
          <Link href={"/login"} style={{ textDecoration: "none" }}>
            <Text c="surface.6" size="sm">
              {t("SignIn")}
            </Text>
          </Link>
        </Group>
      </GlassPanel>
    </Group>
  );
}
