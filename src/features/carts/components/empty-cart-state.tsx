import GlassPanel from "@/components/ui/glass/glass-panel";
import { Box, Group, Text } from "@mantine/core";
import { IconShoppingCartOff } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

export default function EmptyCartState() {
  const t2 = useTranslations("Cart");
  return (
    <Group w={"100%"} h={"100%"} justify="center" align="center" flex={1} px="md">
      <GlassPanel
        h={{ base: 240, sm: 300 }}
        w={{ base: "100%", sm: 500 }}
        maw={500}
        justify="center"
        align="center"
        p={"md"}
      >
        <Box hiddenFrom="sm">
          <IconShoppingCartOff size={70} color="#a9a9a9" stroke={1.5} />
        </Box>
        <Box visibleFrom="sm">
          <IconShoppingCartOff size={100} color="#a9a9a9" stroke={1.5} />
        </Box>
        <Text c="surface.6" size="lg" fz={{ base: "md", sm: "xl" }} fw={"bold"} ta="center" mt="xs">
          {t2("ShoppingCartOff")}
        </Text>
      </GlassPanel>
    </Group>
  );
}

