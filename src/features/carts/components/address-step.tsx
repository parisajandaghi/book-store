import { UseFormReturnType } from "@mantine/form";
import { useTranslations } from "next-intl";
import { CheckoutAddressFormValues} from "../cart.type";
import AddressForm from "./address-form";
import AddressSelector from "./address-selector";
import { addressesAtom } from "@/store/cart-atom";
import { useAtom } from "jotai";
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
