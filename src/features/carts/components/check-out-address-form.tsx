import GlassPanel from "@/components/ui/glass/glass-panel";
import { Group, Select, Stack, Text, Textarea, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import {
  IconBuildingCommunity,
  IconMailbox,
  IconMap,
  IconMapPin,
  IconMapPin2,
  IconPhone,
  IconUser,
} from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import style from "../cart.module.css";
import { CheckoutAddressFormValues } from "../cart.type";
type CheckoutAddressFormProps = {
  form: UseFormReturnType<CheckoutAddressFormValues>;
};

export default function CheckoutAddressForm({
  form,
}: CheckoutAddressFormProps) {
  const t = useTranslations("CheckoutInfo");
  return (
    <GlassPanel flex={2} p={"md"}>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Stack>
          <Group gap={5}>
            <IconMapPin color="var(--mantine-color-surface-7)" />
            <Text mt={3} c={"textMain.3"}>
              {t("ShippingInfo")}
            </Text>
          </Group>
          <TextInput
            placeholder={t("PlaceHolders.Name")}
            leftSection={<IconUser size={16} />}
            label={t("Name")}
            classNames={{
              input: style.input,
              label: style.label,
            }}
          ></TextInput>
          <TextInput
            label={t("Mobile")}
            placeholder={t("PlaceHolders.Phone")}
            leftSection={<IconPhone size={16} />}
            classNames={{
              input: style.input,
              label: style.label,
            }}
          ></TextInput>
          <Group w={"100%"} justify="space-evenly">
            <Select
              placeholder={t("PlaceHolders.Province")}
              label={t("Province")}
              leftSection={<IconMap size={16} />}
              classNames={{
                input: style.input,
                label: style.label,
              }}
              flex={1}
            />
            <Select
              placeholder={t("PlaceHolders.City")}
              leftSection={<IconBuildingCommunity size={16} />}
              label={t("City")}
              classNames={{
                input: style.input,
                label: style.label,
              }}
              flex={1}
            />
          </Group>
          <TextInput
            placeholder={t("PlaceHolders.PostalCode")}
            leftSection={<IconMailbox size={16} />}
            label={t("PostalCode")}
            classNames={{
              input: style.input,
              label: style.label,
            }}
          ></TextInput>
          <Textarea
            leftSection={<IconMapPin2 size={16} />}
            label={t("Address")}
            classNames={{
              input: style.input,
              label: style.label,
            }}
          ></Textarea>
        </Stack>
      </form>
    </GlassPanel>
  );
}
