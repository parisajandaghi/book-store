"use client";
import PrimaryButton from "@/components/ui/action-panel/primary-button";
import GlassPanel from "@/components/ui/glass/glass-panel";
import { Group, Text, TextInput, Stack, Box } from "@mantine/core";
import { useLocale, useTranslations } from "next-intl";
import style from "../../../../features/carts/cart.module.css";
import { useRouter, Link } from "@/navigation";
import HorizontalDivider from "@/components/ui/elements/horizontal-divider";
import { useForm } from "@mantine/form";
import { useUser } from "@/features/profile/hook/use-user";
import { notify } from "@/utils/notification";

export default function Login() {
  const t = useTranslations("Login");
  const t1 = useTranslations("Notifications");
  const locale = useLocale();
  const router = useRouter();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : t("InvalidEmail")),
      password: (value) => (value.length >= 6 ? null : t("PasswordTooShort")),
    },
  });

  const { refetch } = useUser();

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        form.setErrors({
          email: t1("LoginError"),
        });
        notify.error({
          title: t("SignIn"),
          message: t1("LoginError"),
        });
        return;
      }

      form.reset();
      await refetch();
      if (data.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/");
      }

      router.refresh();
    } catch {
      form.setErrors({
        email: t1("SomethingWentWrong"),
      });
      notify.error({
        title: t("SignIn"),
        message: t1("SomethingWentWrong"),
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
        mih={{ base: 420, sm: 500 }}
        justify="center"
        align="center"
        p={{ base: "lg", sm: "xl" }}
      >
        <Stack w="100%" maw={320} align="center" gap="md">
          <Text c="surface.6" size="xl" fw="bold" ta="center">
            {t("SignIn")}
          </Text>

          <Box component="form" onSubmit={form.onSubmit(handleSubmit)} w="100%">
            <Stack gap="md" w="100%">
              <TextInput
                placeholder={t("Email")}
                label={t("Email")}
                w="100%"
                classNames={{
                  input: style.input,
                  label: style.label,
                }}
                {...form.getInputProps("email")}
              />
              <TextInput
                placeholder={t("Password")}
                label={t("Password")}
                type="password"
                w="100%"
                classNames={{
                  input: style.input,
                  label: style.label,
                }}
                {...form.getInputProps("password")}
              />

              <Group w="100%" dir={locale === "fa" ? "rtl" : "ltr"} gap={0}>
                <Link
                  href="/forgot-password"
                  style={{ textDecoration: "none" }}
                >
                  <Text c="surface.6" fz={12} style={{ cursor: "pointer" }}>
                    {t("ForgotPassword")}
                  </Text>
                </Link>
              </Group>

              <PrimaryButton btnText={t("SignIn")} width="100%" type="submit" />
            </Stack>
          </Box>

          <HorizontalDivider my="xs" width="100%" />

          <Group justify="center" gap="xs" wrap="wrap">
            <Text c="dimmed" size="sm">
              {t("NoAccount")}
            </Text>
            <Link href="/signup" style={{ textDecoration: "none" }}>
              <Text c="surface.6" size="sm" fw={500}>
                {t("CreateAccount")}
              </Text>
            </Link>
          </Group>
        </Stack>
      </GlassPanel>
    </Group>
  );
}
