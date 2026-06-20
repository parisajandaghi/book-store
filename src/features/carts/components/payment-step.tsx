import GlassPanel from "@/components/ui/glass/glass-panel";
import { Group, Stack, Text, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import {
  IconCalendarTime,
  IconCreditCard,
  IconLock,
  IconUser,
} from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import style from "../cart.module.css";
import { CheckoutAddressFormValues } from "../cart.type";
type CheckoutAddressFormProps = {
  form: UseFormReturnType<CheckoutAddressFormValues>;
};
export default function PaymentStep({ form }: CheckoutAddressFormProps) {
  const t = useTranslations("CheckoutInfo");

  return (
    <Stack flex={2} gap={"xl"}>
      <Text fz={"h4"} c={"textMain.0"}>
        {t("CheckoutStepper.Payment")}
      </Text>
      <GlassPanel p={"xl"} gap={"xl"}>
        <TextInput
          label={t("CardInfo.CardHolderName")}
          leftSection={<IconUser size={16} />}
          classNames={{
            input: style.input,
            label: style.label,
          }}
        />
        <TextInput
          label={t("CardInfo.CardNumber")}
          leftSection={<IconCreditCard size={16} />}
          classNames={{
            input: style.input,
            label: style.label,
          }}
        />
        <Group justify="space-between">
          <TextInput
            label={t("CardInfo.ExpiryDate")}
            leftSection={<IconCalendarTime size={16} />}
            classNames={{
              input: style.input,
              label: style.label,
            }}
            flex={1}
          />
          <TextInput
            label={t("CardInfo.Cvv2")}
            leftSection={<IconLock size={16} />}
            classNames={{
              input: style.input,
              label: style.label,
            }}
            flex={1}
          />
        </Group>
      </GlassPanel>
    </Stack>
  );
}
