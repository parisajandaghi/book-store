"use client";

import PrimaryButton from "@/components/ui/action-panel/primary-button";
import GlassPanel from "@/components/ui/glass/glass-panel";
import { usePasswordRecovery } from "@/features/password-recovery/hooks/use-password-recovery";
import { usePasswordRecoveryForms } from "@/features/password-recovery/hooks/use-password-recovery-form";
import {
  Center,
  Container,
  Group,
  Loader,
  PasswordInput,
  Text,
} from "@mantine/core";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import style from "../../../features/carts/cart.module.css";
import { Suspense } from "react";
import { useRouter } from "@/navigation";
function ResetPasswordContent() {
  const t = useTranslations("PasswordRecovery");
  const router = useRouter();
  const { handleResetPassword, isLoading } = usePasswordRecovery();
  const { resetPasswordForm } = usePasswordRecoveryForms();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const onSubmit = async (values: typeof resetPasswordForm.values) => {
    const result = await handleResetPassword(token, values.password);

    if (result !== false) {
      router.push("/login");
    }
  };

  return (
    <GlassPanel p={"xl"} gap={"lg"}>
      <Text fz={"h4"} fw={"bold"} c={"surface.9"}>
        {t("Form.ResetPassword")}
      </Text>
      <form onSubmit={resetPasswordForm.onSubmit(onSubmit)}>
        <PasswordInput
          label={t("Form.NewPassword")}
          classNames={{
            input: style.input,
            label: style.label,
          }}
          {...resetPasswordForm.getInputProps("password")}
        />
        <PasswordInput
          label={t("Form.ConfirmPassword")}
          mt={"md"}
          classNames={{
            input: style.input,
            label: style.label,
          }}
          {...resetPasswordForm.getInputProps("confirmPassword")}
        />
        <Group justify="flex-end" mt="xl">
          <PrimaryButton
            type="submit"
            isLoading={isLoading}
            btnText={t("Form.PasswordRecovery")}
          />
        </Group>
      </form>
    </GlassPanel>
  );
}
export default function ResetPassword() {
  return (
    <Container w={500}>
      <Suspense
        fallback={
          <Center h={400}>
            <Loader color="surface.9" />
          </Center>
        }
      >
        <ResetPasswordContent />
      </Suspense>
    </Container>
  );
}
