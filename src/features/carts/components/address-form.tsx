import GlassPanel from "@/components/ui/glass/glass-panel";
import {
  ComboboxProps,
  Flex,
  Group,
  ScrollArea,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
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
  editingAddressAtom,
} from "@/store/checkout-atom";
import { useAtom } from "jotai";
import { notify } from "@/utils/notification";
import { useAddresses } from "@/features/profile/hook/use-address";

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
  const t1 = useTranslations("Notifications");
  const locale = useLocale();
  const { mutate } = useAddresses();
  const currentLang = locale === "en" ? "en" : "fa";
  const [checkout, setCheckout] = useAtom(checkoutAtom);
  const [, setIsAddressModalOpen] = useAtom(addressModalAtom);
  const [, setAddresses] = useAtom(addressesAtom);
  const [editingAddress, setEditingAddress] = useAtom(editingAddressAtom);

  const currentProvincesData = locationsData[currentLang];
  const provincesList = Object.keys(currentProvincesData);
  const currentCitiesList = form.values.province
    ? currentProvincesData[form.values.province] || []
    : [];

  const handleClose = () => {
    setIsAddressModalOpen(false);
    setEditingAddress(null);
    form.reset();
  };

  const handleSubmit = async (values: CheckoutAddressFormValues) => {
    try {
      const isEditing = Boolean(editingAddress);
      const url = isEditing
        ? `/api/users/addresses/${editingAddress!.id}`
        : "/api/users/addresses";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("مشکلی در ذخیره آدرس به وجود آمد");
      }

      // به‌روزرسانی داده‌ها در SWR
      await mutate();

      // در صورت ویرایش آدرسِ در حال انتخاب، اطلاعات چک‌اوت هم به‌روزرسانی شود
      if (isEditing && checkout.addressId === editingAddress!.id) {
        setCheckout((prev) => ({
          ...prev,
          recipientName: values.recipientName,
          phone: values.phone,
          address: values.address,
        }));
      } else if (!isEditing) {
        const newAddress = await response.json();
        setAddresses((prev) => [...prev, newAddress]);
        setCheckout((prev) => ({
          ...prev,
          addressId: newAddress.id,
          recipientName: newAddress.recipientName,
          phone: newAddress.phone,
          address: newAddress.address,
        }));
      }

      notify.success({
        id: "address-saved",
        title: t1("SuccessTitle"),
        message: t1("AddressSavedSuccess"),
      });

      handleClose();
    } catch (error) {
      console.error("Error saving address:", error);
      notify.error({
        id: "address-error",
        title: t1("ErrorTitle"),
        message: t1("AddressSaveError"),
      });
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
  const comboboxProps: ComboboxProps = {
    withinPortal: true,
    transitionProps: { transition: "fade", duration: 200 },
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
                onClick={handleClose}
              />
            )}
          </Group>
          <TextInput
            placeholder={t("PlaceHolders.Name")}
            leftSection={<IconUser size={16} />}
            label={t("Name")}
            classNames={commonClasses}
            {...form.getInputProps("recipientName")}
          />
          <TextInput
            label={t("Mobile")}
            placeholder={t("PlaceHolders.Phone")}
            maxLength={11}
            leftSection={<IconPhone size={16} />}
            classNames={commonClasses}
            {...form.getInputProps("phone")}
          />

          <Flex w={"100%"} direction={{ base: "column", sm: "row" }} gap="xs">
            <Select
              placeholder={t("PlaceHolders.Province")}
              label={t("Province")}
              comboboxProps={{
                ...comboboxProps,
                position: "bottom-start",
              }}
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
              comboboxProps={{
                ...comboboxProps,
                position: "bottom-start",
              }}
              label={t("City")}
              searchable
              leftSection={<IconBuildingCommunity size={16} />}
              classNames={selectClasses}
              flex={1}
              {...form.getInputProps("city")}
            />
          </Flex>

          <TextInput
            placeholder={t("PlaceHolders.PostalCode")}
            leftSection={<IconMailbox size={16} />}
            label={t("PostalCode")}
            maxLength={10}
            classNames={commonClasses}
            {...form.getInputProps("postalCode")}
          />
          <Textarea
            maxLength={250}
            leftSection={<IconMapPin2 size={16} />}
            label={t("Address")}
            classNames={commonClasses}
            {...form.getInputProps("address")}
          />
          {children && <Stack mt={"sm"}>{children}</Stack>}
        </Stack>
      </form>
    </GlassPanel>
  );
}
