import GlassPanel from "@/components/ui/glass/glass-panel";
import { Box, Group, Text } from "@mantine/core";
import { IconReceiptOff } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

export default function EmptyOrderState() {
  const t = useTranslations("Orders");
  return (
    <Group
      w="100%"
      h="100%"
      justify="center"
      align="center"
      flex={1}
      px={{ base: "xs", sm: "md" }}
      py={{ base: "lg", sm: "xl" }}
    >
      <GlassPanel
        w="100%"
        maw={{ base: 320, sm: 480 }}
        mih={{ base: 220, sm: 300 }}
        justify="center"
        align="center"
        p={{ base: "sm", sm: "md" }}
      >
        <Box hiddenFrom="sm">
          <IconReceiptOff size={70} color="#a9a9a9" stroke={1.5} />
        </Box>
        <Box visibleFrom="sm">
          <IconReceiptOff size={120} color="#a9a9a9" stroke={1.5} />
        </Box>
        <Text
          c="surface.6"
          fz={{ base: "sm", sm: "xl" }}
          fw="bold"
          ta="center"
          mt="xs"
        >
          {t("EmptyState.Description")}
        </Text>
      </GlassPanel>
    </Group>
  );
}
