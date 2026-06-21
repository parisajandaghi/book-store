"use client";

import { Button, Modal } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import style from "../cart.module.css";
import { CheckoutAddressFormValues } from "../cart.type";
import AddressForm from "./address-form";
import { addressModalAtom } from "@/store/checkout-atom";
type CheckoutAddressFormProps = {
  form: UseFormReturnType<CheckoutAddressFormValues>;
};
export default function AddressModal({ form }: CheckoutAddressFormProps) {
  const t = useTranslations("CheckoutInfo");
  const [isAddressModalOpen, setIsAddressModalOpen] = useAtom(addressModalAtom);
  return (
    <Modal
      opened={isAddressModalOpen}
      onClose={() => setIsAddressModalOpen(false)}
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
      <AddressForm form={form} title={t("ModalTitle")} showCloseButton={true}>
        <Button type="submit" className={style.modalButton}>
          {t("SaveAddress")}
        </Button>
      </AddressForm>
    </Modal>
  );
}
