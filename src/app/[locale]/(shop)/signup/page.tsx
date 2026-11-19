"use client";
import PrimaryButton from "@/components/ui/action-panel/primary-button";
import HorizontalDivider from "@/components/ui/elements/horizontal-divider";
import GlassPanel from "@/components/ui/glass/glass-panel";
import { Link, useRouter } from "@/navigation";
import {
  Box,
  Group,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useTranslations } from "next-intl";
import style from "../../../../features/carts/cart.module.css";
import { notify } from "@/utils/notification";

export default function Signup() {
  const t = useTranslations("Register");
  const t1 = useTranslations("Login");
  const t2 = useTranslations("Notifications");
  const router = useRouter();

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
      name: (value) => (value.trim().length > 2 ? null : t("NameRequired")),
      email: (value) => {
        const emailRegex =
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|ir|org|net|edu|gov|co|io|info|biz|me)$/i;
        return emailRegex.test(value.trim()) ? null : t("InvalidEmail");
      },
      phone: (value) =>
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
          phone: values.phone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.error || t1("SomethingWentWrong");
        form.setFieldError("email", errorMessage);

        notify.error({
          title: t1("ErrorTitle"),
          message: errorMessage,
        });
        return;
      }

      notify.success({
        title: t1("SuccessTitle"),
        message: t1("SuccessfulRegister"),
      });
      form.reset();

      router.push("/login");
    } catch {
      const err = t2("SomethingWentWrong");
      form.setFieldError("email", err);
      notify.error({
        title: t1("ErrorTitle"),
        message: err,
      });
    }
  };

  return (
    <Group
      w="100%"
      mih="calc(100vh - 80px)"
      justify="center"
      align="center"
      flex={1}
      px="md"
      py="xl"
    >
      <GlassPanel
        w="100%"
        maw={480}
        mih={{ base: "auto", sm: 650 }}
        justify="center"
        align="center"
        p={{ base: "lg", sm: "xl" }}
      >
        <Stack w="100%" maw={320} align="center" gap="md">
          <Text c="surface.6" size="xl" fw="bold" ta="center">
            {t("Title")}
          </Text>

          <Box component="form" onSubmit={form.onSubmit(handleSubmit)} w="100%">
            <input
              type="text"
              style={{ display: "none" }}
              tabIndex={-1}
              autoComplete="off"
              defaultValue=""
            />
            <input
              type="password"
              style={{ display: "none" }}
              tabIndex={-1}
              autoComplete="new-password"
              defaultValue=""
            />
            <Stack gap="sm" w="100%">
              <TextInput
                placeholder={t("Name")}
                label={t("Name")}
                maxLength={20}
                w="100%"
                classNames={{
                  input: style.input,
                  label: style.label,
                }}
                {...form.getInputProps("name")}
              />
              <TextInput
                placeholder={t("Email")}
                label={t("Email")}
                maxLength={60}
                w="100%"
                autoComplete="one-time-code"
                classNames={{
                  input: style.input,
                  label: style.label,
                }}
                {...form.getInputProps("email")}
              />
              <TextInput
                placeholder={t("PhoneNumber")}
                label={t("PhoneNumber")}
                w="100%"
                maxLength={11}
                classNames={{
                  input: style.input,
                  label: style.label,
                }}
                {...form.getInputProps("phone")}
              />
              <PasswordInput
                placeholder={t("Password")}
                label={t("Password")}
                maxLength={12}
                w="100%"
                autoComplete="one-time-code"
                classNames={{
                  input: style.input,
                  label: style.label,
                  innerInput: style.innerInput,
                }}
                {...form.getInputProps("password")}
              />
              <PasswordInput
                placeholder={t("ConfirmPassword")}
                label={t("ConfirmPassword")}
                w="100%"
                classNames={{
                  input: style.input,
                  label: style.label,
                  innerInput: style.innerInput,
                }}
                {...form.getInputProps("confirmPassword")}
              />

              <PrimaryButton
                btnText={t1("CreateAccount")}
                width="100%"
                type="submit"
                mt="md"
              />
            </Stack>
          </Box>

          <HorizontalDivider my="xs" width="100%" />

          <Group justify="center" gap="xs" wrap="wrap">
            <Text c="dimmed" size="sm">
              {t("AlreadyHaveAccount")}
            </Text>
            <Link href="/login" style={{ textDecoration: "none" }}>
              <Text c="surface.6" size="sm" fw={500}>
                {t("SignIn")}
              </Text>
            </Link>
          </Group>
        </Stack>
      </GlassPanel>
    </Group>
  );
}
