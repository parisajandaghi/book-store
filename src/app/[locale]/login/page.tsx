"use client";
import PrimaryButton from "@/components/ui/action-panel/primary-button";
import GlassPanel from "@/components/ui/glass/glass-panel";
import { Group, Text, TextInput, Stack } from "@mantine/core";
import { useLocale, useTranslations } from "next-intl";
import style from "../../../features/carts/cart.module.css";
import { useRouter } from "@/navigation";
import HorizontalDivider from "@/components/ui/elements/horizontal-divider";
import { Link } from "@/navigation";
import { useForm } from "@mantine/form";
import { useUser } from "@/features/profile/hook/use-user";
export default function Login() {
  const t = useTranslations("Login");
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
          email: data.error,
        });
        return;
      }

      form.reset();
      await refetch();
      router.push("/");
      router.refresh();
    } catch {
      form.setErrors({
        email: t("SomethingWentWrong"),
      });
    }
  };
  return (
    <Group w={"100%"} h={"100%"} justify="center" align="center" flex={1}>
      <GlassPanel h={500} w={500} justify="center" align="center" p={"md"}>
        <Text c="surface.6" size="xl" fw={"bold"}>
          {t("SignIn")}
        </Text>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
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
              placeholder={t("Password")}
              label={t("Password")}
              w={300}
              classNames={{
                input: style.input,
                label: style.label,
              }}
              {...form.getInputProps("password")}
            />
            <Group w={300} dir={locale === "fa" ? "rtl" : "ltr"} gap={0}>
              <Link href="/forgot-password" style={{ textDecoration: "none" }}>
                <Text c="surface.6" fz={12} style={{ cursor: "pointer" }}>
                  {t("ForgotPassword")}
                </Text>
              </Link>
            </Group>
            <PrimaryButton btnText={t("SignIn")} width={300} type="submit" />
          </Stack>
        </form>
        <HorizontalDivider my="sm" width={300} />
        <Group>
          <Text c="dimmed" size="sm">
            {t("NoAccount")}
          </Text>
          <Link href={"/signup"} style={{ textDecoration: "none" }}>
            <Text c="surface.6" size="sm">
              {t("CreateAccount")}
            </Text>
          </Link>
        </Group>
      </GlassPanel>
    </Group>
  );
}
