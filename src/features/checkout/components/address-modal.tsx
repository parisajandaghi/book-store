"use client";

import { Button, Modal } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import style from "../../carts/cart.module.css";

import { addressModalAtom, editingAddressAtom } from "@/store/checkout-atom";
import AddressForm from "@/features/carts/components/address-form";
import { CheckoutAddressFormValues } from "@/features/carts/cart.type";

type CheckoutAddressFormProps = {
  form: UseFormReturnType<CheckoutAddressFormValues>;
};

export default function AddressModal({ form }: CheckoutAddressFormProps) {
  const t = useTranslations("CheckoutInfo");
  const [isAddressModalOpen, setIsAddressModalOpen] = useAtom(addressModalAtom);
  const [editingAddress, setEditingAddress] = useAtom(editingAddressAtom);

  useEffect(() => {
    if (isAddressModalOpen) {
      if (editingAddress) {
        form.setValues({
          recipientName: editingAddress.recipientName || "",
          phone: editingAddress.phone || "",
          address: editingAddress.address || "",
          province: editingAddress.province ?? null,
          city: editingAddress.city ?? null,
          postalCode: editingAddress.postalCode ?? "",
        });
      } else {
        form.reset();
      }
    }
  }, [isAddressModalOpen, editingAddress]);

  const handleClose = () => {
    setIsAddressModalOpen(false);
    setEditingAddress(null);
    form.reset();
  };

  return (
    <Modal
      opened={isAddressModalOpen}
      onClose={handleClose}
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
      <AddressForm
        form={form}
        title={editingAddress ? t("EditAddress") : t("ModalTitle")}
        showCloseButton={true}
      >
        <Button type="submit" className={style.modalButton}>
          {editingAddress ? t("UpdateAddress") : t("SaveAddress")}
        </Button>
      </AddressForm>
    </Modal>
  );
}
