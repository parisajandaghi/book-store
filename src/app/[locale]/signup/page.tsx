import PrimaryButton from "@/components/ui/action-panel/primary-button";
import HorizontalDivider from "@/components/ui/elements/horizontal-divider";
import GlassPanel from "@/components/ui/glass/glass-panel";
import { Group, TextInput, Text } from "@mantine/core";
import style from "../../../features/carts/cart.module.css";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/navigation";

export default function Signup() {
  const t = useTranslations("Register");
  const t1 = useTranslations("Login");

  return (
    <Group w={"100%"} h={"100%"} justify="center" align="center">
      <GlassPanel h={650} w={450} justify="center" align="center" gap={"lg"}>
        <Text c="surface.6" size="xl" fw={"bold"}>
          {t("Title")}
        </Text>
        <TextInput
          placeholder={t("Name")}
          label={t("Name")}
          w={300}
          classNames={{
            input: style.input,
            label: style.label,
          }}
        />
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
          placeholder={t("PhoneNumber")}
          label={t("PhoneNumber")}
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
        <TextInput
          placeholder={t("ConfirmPassword")}
          label={t("ConfirmPassword")}
          w={300}
          classNames={{
            input: style.input,
            label: style.label,
          }}
        />

        <PrimaryButton btnText={t1("CreateAccount")} width={300} />
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
