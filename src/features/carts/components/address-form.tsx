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
import { useLocale, useTranslations } from "next-intl";
import { ReactNode } from "react";
import style from "../cart.module.css";
import { CheckoutAddressFormValues } from "../cart.type";

import { locationsData } from "@/lib/iran-data";
import {
  addressesAtom,
  addressModalAtom,
  checkoutAtom,
} from "@/store/checkout-atom";
import { useAtom } from "jotai";

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
  const locale = useLocale();
  const currentLang = locale === "en" ? "en" : "fa";
  const [, setCheckout] = useAtom(checkoutAtom);
  const [, setIsAddressModalOpen] = useAtom(addressModalAtom);
  const [, setAddresses] = useAtom(addressesAtom);

  const currentProvincesData = locationsData[currentLang];
  const provincesList = Object.keys(currentProvincesData);
  const currentCitiesList = form.values.province
    ? currentProvincesData[form.values.province] || []
    : [];
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
  const commonClasses = {
    input: style.input,
    label: style.label,
  };

  const selectClasses = {
    ...commonClasses,
    dropdown: style.dropDown,
    option: style.option,
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
            classNames={commonClasses}
            {...form.getInputProps("recipientName")}
          ></TextInput>
          <TextInput
            label={t("Mobile")}
            placeholder={t("PlaceHolders.Phone")}
            leftSection={<IconPhone size={16} />}
            classNames={commonClasses}
            {...form.getInputProps("phone")}
          ></TextInput>
          <Group w={"100%"} justify="space-evenly">
            <Select
              placeholder={t("PlaceHolders.Province")}
              label={t("Province")}
              leftSection={<IconMap size={16} />}
              searchable
              data={provincesList}
              classNames={selectClasses}
              flex={1}
              {...form.getInputProps("province")}
              onChange={(value) => {
                form.setFieldValue("province", value);
                form.setFieldValue("city", null);
              }}
            />
            <Select
              key={form.values.province}
              data={currentCitiesList}
              placeholder={t("PlaceHolders.City")}
              label={t("City")}
              searchable
              leftSection={<IconBuildingCommunity size={16} />}
              classNames={selectClasses}
              flex={1}
              {...form.getInputProps("city")}
            />
          </Group>
          <TextInput
            placeholder={t("PlaceHolders.PostalCode")}
            leftSection={<IconMailbox size={16} />}
            label={t("PostalCode")}
            classNames={commonClasses}
            {...form.getInputProps("postalCode")}
          ></TextInput>
          <Textarea
            leftSection={<IconMapPin2 size={16} />}
            label={t("Address")}
            classNames={commonClasses}
            {...form.getInputProps("address")}
          ></Textarea>
          {children && <Stack mt={"sm"}>{children}</Stack>}
        </Stack>
      </form>
    </GlassPanel>
  );
}
