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
import { paymentFormValues } from "../cart.type";
type paymentFormProps = {
  form: UseFormReturnType<paymentFormValues>;
};
export default function PaymentStep({ form }: paymentFormProps) {
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
          styles={{
            root: {
              minHeight: 85,
            },
          }}
          {...form.getInputProps("cardHolderName")}
        />
        <TextInput
          label={t("CardInfo.CardNumber")}
          leftSection={<IconCreditCard size={16} />}
          classNames={{
            input: style.input,
            label: style.label,
          }}
          styles={{
            root: {
              minHeight: 85,
            },
          }}
          maxLength={19}
          {...form.getInputProps("cardNumber")}
        />
        <Group justify="space-between">
          <TextInput
            placeholder="MM/YY"
            label={t("CardInfo.ExpiryDate")}
            leftSection={<IconCalendarTime size={16} />}
            classNames={{
              input: style.input,
              label: style.label,
            }}
            styles={{
              root: {
                minHeight: 85,
              },
            }}
            flex={1}
            {...form.getInputProps("expiryDate")}
          />
          <TextInput
            label={t("CardInfo.Cvv2")}
            leftSection={<IconLock size={16} />}
            classNames={{
              input: style.input,
              label: style.label,
            }}
            styles={{
              root: {
                minHeight: 85,
              },
            }}
            maxLength={4}
            flex={1}
            {...form.getInputProps("cvv2")}
          />
        </Group>
      </GlassPanel>
    </Stack>
  );
}
