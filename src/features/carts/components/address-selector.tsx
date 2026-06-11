import { Button, Group, Radio, Stack, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import classes from "../address-selector.module.css";
import { userMockAddresses } from "../cart.type";
import { addressModalAtom } from "@/store/cart-atom";
import { useAtom } from "jotai";
export default function AddressSelector() {
  const [value, setValue] = useState<string | null>(null);
  const [, setIsAddressModalOpen] = useAtom(addressModalAtom);
  const t = useTranslations("CheckoutInfo");
  const cards = userMockAddresses.map((item) => (
    <Radio.Card
      className={classes.root}
      value={item.id.toString()}
      key={item.id}
    >
      <Group wrap="nowrap" align="flex-start">
        <Radio.Indicator variant="outline" className={classes.indicator} />
        <div>
          <Text className={classes.label}>{item.recipientName}</Text>
          <Text className={classes.description}>{item.phone}</Text>
          <Text className={classes.description}>{item.address}</Text>
        </div>
      </Group>
    </Radio.Card>
  ));
  return (
    <Stack flex={2}>
      <Radio.Group value={value} onChange={setValue}>
        <Stack gap="xs">{cards}</Stack>
      </Radio.Group>
      <Button
        className={classes.addAddressButton}
        onClick={()=>setIsAddressModalOpen(true)}
        leftSection={<IconPlus size={16} />}
      >
        {t("AddNewAddress")}
      </Button>
    </Stack>
  );
}
