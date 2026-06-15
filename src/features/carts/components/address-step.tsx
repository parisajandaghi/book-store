import { UseFormReturnType } from "@mantine/form";
import { useTranslations } from "next-intl";
import { CheckoutAddressFormValues, userMockAddresses } from "../cart.type";
import AddressForm from "./address-form";
import AddressSelector from "./address-selector";
type CheckoutAddressFormProps = {
  form: UseFormReturnType<CheckoutAddressFormValues>;
};
export default function AddressStep({ form }: CheckoutAddressFormProps) {
  const t = useTranslations("CheckoutInfo");
  const hasAddress = userMockAddresses.length > 0;

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
