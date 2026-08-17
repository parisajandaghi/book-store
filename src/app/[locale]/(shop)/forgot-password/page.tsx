"use client";
import GlassPanel from "@/components/ui/glass/glass-panel";
import { Container, Group, Text, TextInput } from "@mantine/core";
import style from "../../../features/carts/cart.module.css";
import PrimaryButton from "@/components/ui/action-panel/primary-button";
import { Link } from "@/navigation";
import { usePasswordRecoveryForms } from "@/features/password-recovery/hooks/use-password-recovery-form";
import { usePasswordRecovery } from "@/features/password-recovery/hooks/use-password-recovery";
import { useTranslations } from "next-intl";

export default function ForgotPassword() {
  const { forgotPasswordForm } = usePasswordRecoveryForms();
  const t = useTranslations('PasswordRecovery');
  const { handleForgotPassword, isLoading } = usePasswordRecovery();
  const onSubmit = async (values: { email: string }) => {
    await handleForgotPassword(values.email);
  };
  return (
    <Container w={500}>
      <GlassPanel p={"xl"} gap={"lg"}>
        <Text fz={"h4"} fw={"bold"} c={"surface.9"}>
          {t("Form.PasswordRecovery")}
        </Text>
        <form onSubmit={forgotPasswordForm.onSubmit(onSubmit)}>
          <TextInput
            w={400}
            label={t("Form.Email")}
            placeholder="abc@abc.com"
            classNames={{
              input: style.input,
              label: style.label,
            }}
            {...forgotPasswordForm.getInputProps("email")}
          />
          <Group w={"100%"} justify="space-between" mt={"lg"}>
            <Link href={"/login"} style={{ textDecoration: "none" }}>
              <Text fz={"h6"} c={"surface.9"}>
                {t("Form.BackToLogin")}
              </Text>
            </Link>
            <PrimaryButton
              btnText={t("Form.SendRecoveryRequest")}
              type="submit"
              isLoading={isLoading}
            
            />
          </Group>
        </form>
      </GlassPanel>
    </Container>
  );
}
