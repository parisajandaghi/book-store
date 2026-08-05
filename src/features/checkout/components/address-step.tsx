import { UseFormReturnType } from "@mantine/form";
import { useTranslations } from "next-intl";

import PrimaryButton from "@/components/ui/action-panel/primary-button";
import { CheckoutAddressFormValues } from "@/features/carts/cart.type";
import AddressForm from "@/features/carts/components/address-form";
import { useAddresses } from "@/features/profile/hook/use-address";
import { Center, Loader } from "@mantine/core";
import AddressSelector from "./address-selector";
type CheckoutAddressFormProps = {
  form: UseFormReturnType<CheckoutAddressFormValues>;
};
export default function AddressStep({ form }: CheckoutAddressFormProps) {
  const t = useTranslations("CheckoutInfo");

  const { addresses, isLoading } = useAddresses();

  if (isLoading) {
    return (
      <Center>
        <Loader color="surface.9" />
      </Center>
    );
  }
  const hasAddress = addresses.length > 0;

  return (
    <>
      {hasAddress ? (
        <AddressSelector />
      ) : (
        <AddressForm form={form} title={t("ShippingInfo")}>
          <PrimaryButton type="submit" btnText={t("SaveAddress")} />
        </AddressForm>
      )}
    </>
  );
}
