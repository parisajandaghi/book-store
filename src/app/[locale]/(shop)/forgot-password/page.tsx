"use client";
import GlassPanel from "@/components/ui/glass/glass-panel";
import { Box, Group, Stack, Text, TextInput } from "@mantine/core";
import style from "../../../../features/carts/cart.module.css";
import PrimaryButton from "@/components/ui/action-panel/primary-button";
import { Link } from "@/navigation";
import { usePasswordRecoveryForms } from "@/features/password-recovery/hooks/use-password-recovery-form";
import { usePasswordRecovery } from "@/features/password-recovery/hooks/use-password-recovery";
import { useTranslations } from "next-intl";

export default function ForgotPassword() {
  const { forgotPasswordForm } = usePasswordRecoveryForms();
  const t = useTranslations("PasswordRecovery");
  const { handleForgotPassword, isLoading } = usePasswordRecovery();

  const onSubmit = async (values: { email: string }) => {
    await handleForgotPassword(values.email);
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
        p={{ base: "xl", sm: 40 }}
      >
        <Stack w="100%" gap="lg">
          <Text fz={{ base: "h4", sm: "h3" }} fw="bold" c="surface.9" ta="center">
            {t("Form.PasswordRecovery")}
          </Text>

          <Box
            component="form"
            onSubmit={forgotPasswordForm.onSubmit(onSubmit)}
            w="100%"
          >
            <Stack gap="md" w="100%">
              <TextInput
                w="100%"
                label={t("Form.Email")}
                placeholder="abc@abc.com"
                classNames={{
                  input: style.input,
                  label: style.label,
                }}
                {...forgotPasswordForm.getInputProps("email")}
              />

              <PrimaryButton
                btnText={t("Form.SendRecoveryRequest")}
                type="submit"
                isLoading={isLoading}
                width="100%"
                mt="xs"
              />

              <Group justify="center" mt="xs">
                <Link href="/login" style={{ textDecoration: "none" }}>
                  <Text fz="sm" c="surface.9" fw={500}>
                    {t("Form.BackToLogin")}
                  </Text>
                </Link>
              </Group>
            </Stack>
          </Box>
        </Stack>
      </GlassPanel>
    </Group>
  );
}
