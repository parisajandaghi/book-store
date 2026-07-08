import PrimaryButton from "@/components/ui/action-panel/primary-button";
import GlassPanel from "@/components/ui/glass/glass-panel";
import { Group, Text, TextInput } from "@mantine/core";
import { useLocale, useTranslations } from "next-intl";
import style from "../../../features/carts/cart.module.css";

import HorizontalDivider from "@/components/ui/elements/horizontal-divider";
import { Link } from "@/navigation";
export default function Login() {
  const t = useTranslations("Login");
  const locale = useLocale();
  return (
    <Group w={"100%"} h={"100%"} justify="center" align="center" flex={1}>
      <GlassPanel h={500} w={500} justify="center" align="center" p={"md"}>
        <Text c="surface.6" size="xl" fw={"bold"}>
          {t("SignIn")}
        </Text>
        <TextInput
          placeholder={t("Email")}
          label={t("Email")}
          w={300}
          classNames={{
            input: style.input,
            label: style.label,
          }}
        />
        <TextInput
          placeholder={t("Password")}
          label={t("Password")}
          w={300}
          classNames={{
            input: style.input,
            label: style.label,
          }}
        />
        <Group w={300} dir={locale === "fa" ? "rtl" : "ltr"} gap={0}>
          <Text c="surface.6" fz={12}>
            {t("ForgotPassword")}
          </Text>
        </Group>
        <PrimaryButton btnText={t("SignIn")} width={300} />
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
