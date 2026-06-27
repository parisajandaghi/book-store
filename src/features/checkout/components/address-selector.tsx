import {
  addressesAtom,
  addressModalAtom,
  checkoutAtom,
  radioValueAtom,
} from "@/store/checkout-atom";
import { Button, Group, Radio, Stack, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import styles from "../address-selector.module.css";
import { useEffect } from "react";
export default function AddressSelector() {
  const [checkout, setCheckout] = useAtom(checkoutAtom);
  const [, setIsAddressModalOpen] = useAtom(addressModalAtom);
  const [addresses] = useAtom(addressesAtom);
  const t = useTranslations("CheckoutInfo");
  const activeValue =
    checkout.addressId?.toString() ??
    (addresses.length > 0 ? String(addresses[0].id) : null);
  useEffect(() => {
    if (checkout.addressId || addresses.length === 0) return;

    const first = addresses[0];

    setCheckout((prev) => ({
      ...prev,

      addressId: Number(first.id),

      recipientName: first.recipientName,

      phone: first.phone,

      address: first.address,
    }));
  }, [addresses, checkout.addressId, setCheckout]);
  const addressCards = addresses.map((item) => (
    <Radio.Card
      className={styles.root}
      value={item.id.toString()}
      key={item.id}
    >
      <Group wrap="nowrap" align="flex-start">
        <Radio.Indicator variant="outline" className={styles.indicator} />
        <div>
          <Text className={styles.label}>{item.recipientName}</Text>
          <Text className={styles.description}>{item.phone}</Text>
          <Text className={styles.description}>{item.address}</Text>
        </div>
      </Group>
    </Radio.Card>
  ));
  return (
    <Stack flex={2}>
      <Radio.Group
        value={activeValue}
        onChange={(value) => {
          const selectedAddress = addresses.find(
            (address) => String(address.id) === value,
          );

          if (!selectedAddress) return;

          setCheckout((prev) => ({
            ...prev,

            addressId: Number(selectedAddress.id),

            recipientName: selectedAddress.recipientName,

            phone: selectedAddress.phone,

            address: selectedAddress.address,
          }));
        }}
      >
        <Stack gap="xs">{addressCards}</Stack>
      </Radio.Group>
      <Button
        className={styles.addAddressButton}
        onClick={() => setIsAddressModalOpen(true)}
        leftSection={<IconPlus size={16} />}
      >
        {t("AddNewAddress")}
      </Button>
    </Stack>
  );
}
