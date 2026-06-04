import OrderCard from "@/features/orders/components/order-card";
import { Container, Group, Select, Title } from "@mantine/core";
import { useTranslations } from "next-intl";

export default function Orders() {
  const t = useTranslations("Orders");
  return (
    <Container  pt={40} pb={40}>
      <Group justify="space-between" align="center" mb="xl">
        <Title order={2} c="textMain.2">
          {t("Title")}
        </Title>
        <Select
          placeholder={t("Sort.Title")}
          data={[`${t("Sort.AllOrders")}`]}
          w={150}
          classNames={{
            input: "custom-select-input",
            dropdown: "custom-select-dropdown",
            option: "custom-select-option",
          }}
        />
      </Group>

      <OrderCard />
    </Container>
  );
}
