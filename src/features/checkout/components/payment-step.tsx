import GlassPanel from "@/components/ui/glass/glass-panel";
import { paymentFormValues } from "@/features/carts/cart.type";
import { Flex, Text, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import {
  IconCalendarTime,
  IconCreditCard,
  IconLock,
  IconUser,
} from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import style from "../../carts/cart.module.css";

type paymentFormProps = {
  form: UseFormReturnType<paymentFormValues>;
};

export default function PaymentStep({ form }: paymentFormProps) {
  const t = useTranslations("CheckoutInfo");

  return (
    <GlassPanel h="100%" p={{ base: "md", sm: "xl" }} gap="md">
      <Text fz={{ base: "h5", sm: "h4" }} fw={600} c="textMain.0" mb={4}>
        {t("CheckoutStepper.Payment")}
      </Text>

      <TextInput
        label={t("CardInfo.CardHolderName")}
        leftSection={<IconUser size={16} />}
        classNames={{
          input: style.input,
          label: style.label,
        }}
        styles={{
          root: { minHeight: 75 },
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
          root: { minHeight: 75 },
        }}
        maxLength={16}
        {...form.getInputProps("cardNumber")}
      />
      <Flex gap="sm" direction={{ base: "column", xs: "row" }}>
        <TextInput
          placeholder="MM/YY"
          label={t("CardInfo.ExpiryDate")}
          leftSection={<IconCalendarTime size={16} />}
          classNames={{
            input: style.input,
            label: style.label,
          }}
          styles={{
            root: { minHeight: 75, flex: 1 },
          }}
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
            root: { minHeight: 75, flex: 1 },
          }}
          maxLength={4}
          {...form.getInputProps("cvv2")}
        />
      </Flex>
    </GlassPanel>
  );
}
