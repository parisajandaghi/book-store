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
import { useTranslations } from "next-intl";

export default function OrderItems() {
  const t = useTranslations("OrderDetails");
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
          <Grid
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
                <Image
                  src={"/images/jonathan-livingston-seagull.jpg"}
                  w={30}
                  h={40}
                  alt=""
                />

                <Center
                  h={"100%"}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 5,
                  }}
                >
                  <Text fz={"xs"} c={"textMain.3"}>
                    جاناتان مرغ دریایی
                  </Text>
                  <Text fz={"xs"} c={"textMain.3"}>
                    ریچارد باخ
                  </Text>
                </Center>
              </Group>
            </Grid.Col>
            <Grid.Col span={2}>
              <Center h={"100%"}>
                <Text fz={"xs"} c={"textMain.3"}>
                  300000
                </Text>
              </Center>
            </Grid.Col>
            <Grid.Col span={2}>
              <Center h={"100%"}>
                {" "}
                <Text fz={"xs"} c={"textMain.3"}>
                  10
                </Text>
              </Center>
            </Grid.Col>
            <Grid.Col span={2}>
              <Center h={"100%"}>
                <Text fz={"xs"} c={"textMain.3"}>
                  600000
                </Text>
              </Center>
            </Grid.Col>
          </Grid>
        </Stack>
      </ScrollArea>
    </Stack>
  );
}
