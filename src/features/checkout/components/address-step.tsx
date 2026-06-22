import { UseFormReturnType } from "@mantine/form";
import { useTranslations } from "next-intl";

import { useAtom } from "jotai";
import { addressesAtom } from "@/store/checkout-atom";
import AddressForm from "@/features/carts/components/address-form";
import AddressSelector from "./address-selector";
import { CheckoutAddressFormValues } from "@/features/carts/cart.type";
type CheckoutAddressFormProps = {
  form: UseFormReturnType<CheckoutAddressFormValues>;
};
export default function AddressStep({ form }: CheckoutAddressFormProps) {
  const t = useTranslations("CheckoutInfo");
  const [addresses] = useAtom(addressesAtom);
  const hasAddress = addresses.length > 0;

  return (
    <>
      {hasAddress ? (
        <AddressSelector />
      ) : (
        <AddressForm form={form} title={t("ShippingInfo")} />
      )}
    </>
  );
}
