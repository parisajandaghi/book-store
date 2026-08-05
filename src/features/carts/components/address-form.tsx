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
  IconX,
} from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import style from "../cart.module.css";
import { ReactNode } from "react";
import { CheckoutAddressFormValues } from "../cart.type";

import { useAtom } from "jotai";
import {
  addressesAtom,
  addressModalAtom,
  checkoutAtom,
} from "@/store/checkout-atom";
type CheckoutAddressFormProps = {
  form: UseFormReturnType<CheckoutAddressFormValues>;
  title: string;
  showCloseButton?: boolean;
  children?: ReactNode;
};

export default function AddressForm({
  form,
  title,
  showCloseButton,
  children,
}: CheckoutAddressFormProps) {
  const t = useTranslations("CheckoutInfo");
  const [, setCheckout] = useAtom(checkoutAtom);
  const [, setIsAddressModalOpen] = useAtom(addressModalAtom);
  const [, setAddresses] = useAtom(addressesAtom);
  const handleSubmit = async (values: CheckoutAddressFormValues) => {
    try {
      const response = await fetch("/api/users/addresses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("مشکلی در ثبت آدرس به وجود آمد");
      }

      const newAddress = await response.json();

      setAddresses((prev) => [...prev, newAddress]);

      setCheckout((prev) => ({
        ...prev,
        addressId: newAddress.id,
        recipientName: newAddress.recipientName,
        phone: newAddress.phone,
        address: newAddress.address,
      }));

      form.reset();
      setIsAddressModalOpen(false);
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  return (
    <GlassPanel flex={2} p={"md"}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap={3}>
          <Group justify="space-between" align="center">
            <Group gap={5}>
              <IconMapPin color="var(--mantine-color-surface-7)" />
              <Text mt={3} c={"textMain.3"}>
                {title}
              </Text>
            </Group>
            {showCloseButton && (
              <IconX
                size={18}
                color="var(--mantine-color-surface-7)"
                cursor={"pointer"}
                onClick={() => {
                  setIsAddressModalOpen(false);
                }}
              />
            )}
          </Group>
          <TextInput
            placeholder={t("PlaceHolders.Name")}
            leftSection={<IconUser size={16} />}
            label={t("Name")}
            classNames={{
              input: style.input,
              label: style.label,
            }}
            {...form.getInputProps("recipientName")}
          ></TextInput>
          <TextInput
            label={t("Mobile")}
            placeholder={t("PlaceHolders.Phone")}
            leftSection={<IconPhone size={16} />}
            classNames={{
              input: style.input,
              label: style.label,
            }}
            {...form.getInputProps("phone")}
          ></TextInput>
          <Group w={"100%"} justify="space-evenly">
            <Select
              placeholder={t("PlaceHolders.Province")}
              data={["تهران", "اصفهان", "فارس"]}
              label={t("Province")}
              leftSection={<IconMap size={16} />}
              classNames={{
                input: style.input,
                label: style.label,
                dropdown: style.dropDown,
                option: style.option,
              }}
              flex={1}
              {...form.getInputProps("province")}
            />
            <Select
              placeholder={t("PlaceHolders.City")}
              data={["تهران", "شیراز", "اصفهان"]}
              leftSection={<IconBuildingCommunity size={16} />}
              label={t("City")}
              classNames={{
                input: style.input,
                label: style.label,
                dropdown: style.dropDown,
                option: style.option,
              }}
              flex={1}
              {...form.getInputProps("city")}
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
            {...form.getInputProps("postalCode")}
          ></TextInput>
          <Textarea
            leftSection={<IconMapPin2 size={16} />}
            label={t("Address")}
            classNames={{
              input: style.input,
              label: style.label,
            }}
            {...form.getInputProps("address")}
          ></Textarea>
          {children && <Stack mt={"sm"}>{children}</Stack>}
        </Stack>
      </form>
    </GlassPanel>
  );
}
