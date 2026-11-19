import { UseFormReturnType } from "@mantine/form";
import { useTranslations } from "next-intl";

import PrimaryButton from "@/components/ui/action-panel/primary-button";
import GlassPanel from "@/components/ui/glass/glass-panel";
import { CheckoutAddressFormValues } from "@/features/carts/cart.type";
import AddressForm from "@/features/carts/components/address-form";
import { useAddresses } from "@/features/profile/hook/use-address";
import { Skeleton, Stack } from "@mantine/core";
import AddressSelector from "./address-selector";
type CheckoutAddressFormProps = {
  form: UseFormReturnType<CheckoutAddressFormValues>;
};
export default function AddressStep({ form }: CheckoutAddressFormProps) {
  const t = useTranslations("CheckoutInfo");

  const { addresses, isLoading } = useAddresses();

  if (isLoading) {
    return (
      <GlassPanel p="md" w="100%">
        <Stack gap="md">
          <Skeleton height={20} width="30%" radius="sm" opacity={0.15} />
          <Skeleton height={60} width="100%" radius="md" opacity={0.15} />
          <Skeleton height={60} width="100%" radius="md" opacity={0.15} />
        </Stack>
      </GlassPanel>
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
