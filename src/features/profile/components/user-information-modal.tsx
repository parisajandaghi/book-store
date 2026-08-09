import GlassPanel from "@/components/ui/glass/glass-panel";
import { informationModalAtom } from "@/store/profile-atom";
import { Group, Modal, TextInput, Text, Button } from "@mantine/core";
import { useAtom } from "jotai";
import style from "../../carts/cart.module.css";
import { IconX } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { useProfileForm } from "../hook/use-profile-form";

export default function UserInformationModal() {
  const t = useTranslations("Profile");
  const { form, loading, error, handleSubmit } = useProfileForm();
  const [isInfoModalOpen, setIsInfoModalOpen] = useAtom(informationModalAtom);
  const onSubmit = async (values: typeof form.values) => {
    const isSuccess = await handleSubmit(values);
    if (isSuccess) {
      setIsInfoModalOpen(false); // اگر موفق بود، مودال بسته شود
    }
  };
  return (
    <Modal
      onClose={() => setIsInfoModalOpen(false)}
      opened={isInfoModalOpen}
      centered
      withCloseButton={false}
      overlayProps={{
        backgroundOpacity: 0.6,
        blur: 4,
      }}
      styles={{
        content: {
          backgroundColor: "#f6c7f648",
          border: "1px solid #1f0f1f",
        },
      }}
    >
      <GlassPanel p={"lg"}>
        <Group justify="space-between">
          <Text fz={"h5"} c={"textMain.3"}>
            {t("InfoEdit")}
          </Text>
          <IconX
            size={18}
            color="var(--mantine-color-surface-9)"
            cursor={"pointer"}
            onClick={() => setIsInfoModalOpen(false)}
          />
        </Group>
        <form onSubmit={form.onSubmit(onSubmit)}>
          <Group>
            {" "}
            <TextInput
              flex={1}
              label={t("Modal.Name")}
              classNames={{
                input: style.input,
                label: style.label,
              }}
              {...form.getInputProps("name")}
            />
            <TextInput
              flex={1}
              label={t("Modal.Email")}
              classNames={{
                input: style.input,
                label: style.label,
              }}
              {...form.getInputProps("email")}
            />
          </Group>
          <Group>
            <TextInput
              flex={1}
              label={t("Modal.NewPassword")}
              classNames={{
                input: style.input,
                label: style.label,
              }}
              {...form.getInputProps("password")}
            />
            <TextInput
              flex={1}
              label={t("Modal.Mobile")}
              classNames={{
                input: style.input,
                label: style.label,
              }}
              {...form.getInputProps("phone")}
            />
          </Group>
          <Group justify="center" mt={"sm"}>
            <Button type="submit" className={style.modalButton}>
              {t("Modal.SaveChanges")}
            </Button>
            <Button
              type="button"
              className={style.modalButton}
              onClick={() => setIsInfoModalOpen(false)}
            >
              {t("Modal.Cancel")}
            </Button>
          </Group>
        </form>
      </GlassPanel>
    </Modal>
  );
}
