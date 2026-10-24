"use client";

import PrimaryButton from "@/components/ui/action-panel/primary-button";
import GlassPanel from "@/components/ui/glass/glass-panel";
import { usePasswordRecovery } from "@/features/password-recovery/hooks/use-password-recovery";
import { usePasswordRecoveryForms } from "@/features/password-recovery/hooks/use-password-recovery-form";
import {
  Box,
  Center,
  Group,
  Loader,
  PasswordInput,
  Stack,
  Text,
} from "@mantine/core";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import style from "../../../../features/carts/cart.module.css";
import { Suspense } from "react";
import { useRouter } from "@/navigation";

function ResetPasswordContent() {
  const t = useTranslations("PasswordRecovery");
  const router = useRouter();
  const { handleResetPassword, isLoading } = usePasswordRecovery();
  const { resetPasswordForm } = usePasswordRecoveryForms();
  const searchParams = useSearchParams();
  const token = searchParams.get("token")  || "";

  const onSubmit = async (values: typeof resetPasswordForm.values) => {
    const result = await handleResetPassword(token, values.password);

    if (result !== false) {
      router.push("/login");
    }
  };

  return (
    <GlassPanel
      w="100%"
      maw={480}
      p={{ base: "xl", sm: 40 }}
    >
      <Stack w="100%" gap="lg">
        <Text fz={{ base: "h4", sm: "h3" }} fw="bold" c="surface.9" ta="center">
          {t("Form.ResetPassword")}
        </Text>

        <Box
          component="form"
          onSubmit={resetPasswordForm.onSubmit(onSubmit)}
          w="100%"
        >
          <Stack gap="md" w="100%">
            <PasswordInput
              w="100%"
              label={t("Form.NewPassword")}
              classNames={{
                input: style.input,
                label: style.label,
              }}
              {...resetPasswordForm.getInputProps("password")}
            />
            <PasswordInput
              w="100%"
              label={t("Form.ConfirmPassword")}
              classNames={{
                input: style.input,
                label: style.label,
              }}
              {...resetPasswordForm.getInputProps("confirmPassword")}
            />

            <PrimaryButton
              type="submit"
              isLoading={isLoading}
              btnText={t("Form.PasswordRecovery")}
              width="100%"
              mt="xs"
            />
          </Stack>
        </Box>
      </Stack>
    </GlassPanel>
  );
}

export default function ResetPassword() {
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
      <Suspense
        fallback={
          <Center h={400} w="100%">
            <Loader color="surface.9" />
          </Center>
        }
      >
        <ResetPasswordContent />
      </Suspense>
    </Group>
  );
}
