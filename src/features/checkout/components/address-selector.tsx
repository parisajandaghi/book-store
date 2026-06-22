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
import styles from "../address-selector.module.css"
export default function AddressSelector() {
  const [checkout, setCheckout] = useAtom(checkoutAtom);
  const [, setIsAddressModalOpen] = useAtom(addressModalAtom);
  const [addresses] = useAtom(addressesAtom);
  const t = useTranslations("CheckoutInfo");
  const activeValue =
    checkout.addressId?.toString() ??
    (addresses.length > 0 ? String(addresses[0].id) : null);
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
        onChange={(value) =>
          setCheckout((prev) => ({
            ...prev,
            addressId: Number(value),
          }))
        }
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
