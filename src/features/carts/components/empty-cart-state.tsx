import GlassPanel from "@/components/ui/glass/glass-panel";
import { Group, Text } from "@mantine/core";
import { IconShoppingCartOff } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

export default function EmptyCartState() {
  const t2 = useTranslations("Cart");
  return (
    <Group w={"100%"} h={"100%"} justify="center" align="center" flex={1}>
      <GlassPanel h={300} w={500} justify="center" align="center" p={"md"}>
        <IconShoppingCartOff size={120} color="#a9a9a9" stroke={1.5} />
        <Text c="surface.6" size="xl" fw={"bold"}>
          {t2("ShoppingCartOff")}
        </Text>
      </GlassPanel>
    </Group>
  );
}