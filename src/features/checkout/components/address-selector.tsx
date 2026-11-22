import { useAddresses } from "@/features/profile/hook/use-address";
import {
  addressModalAtom,
  checkoutAtom,
  editingAddressAtom,
} from "@/store/checkout-atom";
import {
  ActionIcon,
  Button,
  Group,
  Radio,
  ScrollArea,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import { IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import styles from "../address-selector.module.css";
import { Address } from "@/features/carts/cart.type";
export default function AddressSelector() {
  const [checkout, setCheckout] = useAtom(checkoutAtom);
  const [, setIsAddressModalOpen] = useAtom(addressModalAtom);
  const [, setEditingAddress] = useAtom(editingAddressAtom);
  const { addresses, deleteAddress } = useAddresses();
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

  const handleEdit = (e: React.MouseEvent, item: Address) => {
    e.stopPropagation();
    setEditingAddress(item);
    setIsAddressModalOpen(true);
  };

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    const success = await deleteAddress(id);
    if (success && checkout.addressId === id) {
      setCheckout((prev) => ({
        ...prev,
        addressId: null,
        recipientName: "",
        phone: "",
        address: "",
      }));
    }
  };

  const addressCards = addresses.map((item) => (
    <Radio.Card
      component="div"
      className={styles.root}
      value={item.id.toString()}
      key={item.id}
    >
      <Group wrap="nowrap" align="flex-start" justify="space-between">
        <Group wrap="nowrap" align="flex-start">
          <Radio.Indicator variant="outline" className={styles.indicator} />
          <div
            style={{ minWidth: 0, flex: 1, flexShrink: 1, overflow: "hidden" }}
          >
            <Text className={styles.label}>{item.recipientName}</Text>
            <Text className={styles.description}>{item.phone}</Text>
            <Text className={styles.description}>{item.address}</Text>
          </div>
        </Group>
        <Group gap={6} wrap="nowrap" onClick={(e) => e.stopPropagation()}>
          <ActionIcon
            variant="subtle"
            color="surface.6"
            size="sm"
            onClick={(e) => handleEdit(e, item)}
            aria-label="Edit address"
          >
            <IconPencil size={16} />
          </ActionIcon>

          <ActionIcon
            variant="subtle"
            color="red"
            size="sm"
            onClick={(e) => handleDelete(e, Number(item.id))}
            aria-label="Delete address"
          >
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
      </Group>
    </Radio.Card>
  ));
  console.log("addressCards", addresses);

  return (
    <Stack flex={2}>
      <ScrollArea.Autosize mah={430} offsetScrollbars>
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
      </ScrollArea.Autosize>
      <Button
        className={styles.addAddressButton}
        onClick={() => {
          setEditingAddress(null);
          setIsAddressModalOpen(true);
        }}
        leftSection={<IconPlus size={16} />}
      >
        {t("AddNewAddress")}
      </Button>
    </Stack>
  );
}
