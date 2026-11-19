"use client";
import GlassPanel from "@/components/ui/glass/glass-panel";
import { informationModalAtom } from "@/store/profile-atom";
import {
  Button,
  Flex,
  Group,
  Modal,
  PasswordInput,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import style from "../../carts/cart.module.css";
import { useProfileForm } from "../hook/use-profile-form";
import { notify } from "@/utils/notification";

export default function UserInformationModal() {
  const t = useTranslations("Profile");
  const t1 = useTranslations("Notifications");
  const { form, loading, error, handleSubmit } = useProfileForm();
  const [isInfoModalOpen, setIsInfoModalOpen] = useAtom(informationModalAtom);

  const onSubmit = async (values: typeof form.values) => {
    const isSuccess = await handleSubmit(values);
    if (isSuccess) {
      notify.success({
        title: t1("SuccessTitle"),
        message: t1("ProfileUpdateSuccess"),
      });
      setIsInfoModalOpen(false);
    } else {
      notify.error({
        title: t1("ErrorTitle"),
        message: error || t1("UpdateFailed"),
      });
    }
  };

  return (
    <Modal
      onClose={() => setIsInfoModalOpen(false)}
      opened={isInfoModalOpen}
      centered
      withCloseButton={false}
      size="md"
      overlayProps={{
        backgroundOpacity: 0.6,
        blur: 4,
      }}
      styles={{
        content: {
          backgroundColor: "#f6c7f648",
          border: "1px solid #1f0f1f",
          overflow: "hidden",
        },
      }}
    >
      <GlassPanel p={{ base: "md", sm: "lg" }}>
        <Group justify="space-between" mb="md">
          <Text fz={{ base: "h6", sm: "h5" }} fw={600} c="textMain.3">
            {t("InfoEdit")}
          </Text>
          <IconX
            size={18}
            color="var(--mantine-color-surface-9)"
            cursor="pointer"
            onClick={() => setIsInfoModalOpen(false)}
          />
        </Group>

        <form onSubmit={form.onSubmit(onSubmit)}>
          <Stack gap="sm">
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
              <TextInput
                label={t("Modal.Name")}
                classNames={{
                  input: style.input,
                  label: style.label,
                }}
                {...form.getInputProps("name")}
              />
              <TextInput
                label={t("Modal.Email")}
                classNames={{
                  input: style.input,
                  label: style.label,
                }}
                {...form.getInputProps("email")}
              />
              <PasswordInput
                label={t("Modal.NewPassword")}
                type="password"
                classNames={{
                  input: style.input,
                  label: style.label,
                  // innerInput: style.innerInput,
                }}
                {...form.getInputProps("password")}
              />
              <TextInput
                label={t("Modal.Mobile")}
                classNames={{
                  input: style.input,
                  label: style.label,
                }}
                {...form.getInputProps("phone")}
              />
            </SimpleGrid>

            {error && (
              <Text c="red" fz="xs" ta="center">
                {error}
              </Text>
            )}

            <Flex
              direction={{ base: "column-reverse", sm: "row" }}
              justify="center"
              gap="xs"
              mt="md"
              w="100%"
            >
              <Button
                type="button"
                className={style.modalButton}
                onClick={() => setIsInfoModalOpen(false)}
                fullWidth
              >
                {t("Modal.Cancel")}
              </Button>
              <Button
                type="submit"
                className={style.modalButton}
                loading={loading}
                fullWidth
              >
                {t("Modal.SaveChanges")}
              </Button>
            </Flex>
          </Stack>
        </form>
      </GlassPanel>
    </Modal>
  );
}
