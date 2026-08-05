import HorizontalDivider from "@/components/ui/elements/horizontal-divider";
import {
  Center,
  Grid,
  Group,
  Image,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import { IconShoppingBag } from "@tabler/icons-react";
import { useLocale, useTranslations } from "next-intl";
import { OrderItem } from "../order-item.type";
interface OrderItemsProps {
  items: OrderItem[];
}
export default function OrderItems({ items = [] }: OrderItemsProps) {
  const t = useTranslations("OrderDetails");
  const locale = useLocale();
  console.log(" items in orderItem", items);

  return (
    <Stack
      flex={2}
      p={"xs"}
      style={{
        display: "flex",
        backgroundColor: "#1f0f1fa8",
        borderRadius: 5,
      }}
    >
      <Group gap={5}>
        <IconShoppingBag size={18} color="var(--mantine-color-surface-9)" />
        <Text fz={"xs"} c={"textMain.3"}>
          {t("OrderItems")}
        </Text>
      </Group>
      <HorizontalDivider />

      <Grid px={"md"}>
        <Grid.Col span={5}>
          <Stack>
            <Text fz={"xs"} c={"textMain.3"}>
              {t("Product")}
            </Text>
          </Stack>
        </Grid.Col>
        <Grid.Col span={2}>
          <Stack justify="center" align="center">
            <Text fz={"xs"} c={"textMain.3"}>
              {t("UnitPrice")}
            </Text>
          </Stack>
        </Grid.Col>
        <Grid.Col span={2}>
          <Stack justify="center" align="center">
            <Text fz={"xs"} c={"textMain.3"}>
              {t("Qty")}
            </Text>
          </Stack>
        </Grid.Col>
        <Grid.Col span={2}>
          <Stack justify="center" align="center">
            <Text fz={"xs"} c={"textMain.3"}>
              {t("TotalPrice")}
            </Text>
          </Stack>
        </Grid.Col>
      </Grid>
      <ScrollArea h={200} offsetScrollbars p={"xs"} type="hover">
        <Stack>
          {items.map((item) => (
            <Grid
              key={item.id}
              p={"xs"}
              style={{
                display: "flex",
                backgroundColor: "#1f0f1fa8",
                borderRadius: 5,
                border: "1px solid #d4af3766",
              }}
            >
              <Grid.Col span={5}>
                <Group>
                  <Image src={item.image_url} w={30} h={40} alt={item.title} />

                  <Center
                    h={"100%"}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 5,
                    }}
                  >
                    <Text fz={"xs"} c={"textMain.3"}>
                      {item.title}
                    </Text>
                    <Text fz={"xs"} c={"textMain.3"}>
                      {item.author}
                    </Text>
                  </Center>
                </Group>
              </Grid.Col>
              <Grid.Col span={2}>
                <Center h={"100%"}>
                  <Text
                    fz={"xs"}
                    c={"textMain.3"}
                    style={{
                      fontFamily:
                        locale === "en"
                          ? "system-ui, -apple-system, sans-serif"
                          : undefined,
                    }}
                  >
                    {item.price.toLocaleString()}
                  </Text>
                </Center>
              </Grid.Col>
              <Grid.Col span={2}>
                <Center h={"100%"}>
                  {" "}
                  <Text
                    fz={"xs"}
                    c={"textMain.3"}
                    style={{
                      fontFamily:
                        locale === "en"
                          ? "system-ui, -apple-system, sans-serif"
                          : undefined,
                    }}
                  >
                    {item.quantity}
                  </Text>
                </Center>
              </Grid.Col>
              <Grid.Col span={2}>
                <Center h={"100%"}>
                  <Text
                    fz={"xs"}
                    c={"textMain.3"}
                    style={{
                      fontFamily:
                        locale === "en"
                          ? "system-ui, -apple-system, sans-serif"
                          : undefined,
                    }}
                  >
                    {(item.price * item.quantity).toLocaleString()}
                  </Text>
                </Center>
              </Grid.Col>
            </Grid>
          ))}
          {items.length === 0 && (
            <Center p="md">
              <Text fz="sm" c="dimmed">
                هیچ آیتمی یافت نشد.
              </Text>
            </Center>
          )}
        </Stack>
      </ScrollArea>
    </Stack>
  );
}
