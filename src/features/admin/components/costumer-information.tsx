import HorizontalDivider from "@/components/ui/elements/horizontal-divider";
import GlassPanel from "@/components/ui/glass/glass-panel";
import { Group, Stack, Text, ThemeIcon } from "@mantine/core";
import { IconMail, IconMapPin, IconPhone, IconUser } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

interface CostumerInfoType {
  name: string | undefined;
  address: string;
  email: string | undefined;
  phone: string | undefined;
}

export default function CostumerInformation({
  name,
  address,
  email,
  phone,
}: CostumerInfoType) {
  const t = useTranslations("Admin");

  return (
    <GlassPanel
      p={{ base: "sm", sm: "md" }}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <Group mb="md" gap="xs">
          <ThemeIcon variant="outline" color="var(--mantine-color-surface-9)">
            <IconUser size={18} />
          </ThemeIcon>
          <Text c={"textMain.0"} fw={500}>
            {t("CostumerInfo")}
          </Text>
        </Group>

        <Stack gap="sm">
          <Group justify="space-between" align="center" wrap="nowrap">
            <Group gap={8} wrap="nowrap">
              <IconUser size={16} color="#fefaf4" style={{ flexShrink: 0 }} />
              <Text c="textMain.0" fz={"xs"}>
                {t("UserName")}
              </Text>
            </Group>
            <Text
              c="textMain.0"
              fz={"xs"}
              fw={500}
              style={{ wordBreak: "break-all" }}
            >
              {name || "---"}
            </Text>
          </Group>

          <Group justify="space-between" align="center" wrap="nowrap">
            <Group gap={8} wrap="nowrap">
              <IconMail size={16} color="#fefaf4" style={{ flexShrink: 0 }} />
              <Text c="textMain.0" fz={"xs"}>
                {t("UserMail")}
              </Text>
            </Group>
            <Text
              c="textMain.0"
              fz={"xs"}
              fw={500}
              style={{ wordBreak: "break-all" }}
            >
              {email || "---"}
            </Text>
          </Group>

          <Group justify="space-between" align="center" wrap="nowrap">
            <Group gap={8} wrap="nowrap">
              <IconPhone size={16} color="#fefaf4" style={{ flexShrink: 0 }} />
              <Text c="textMain.0" fz={"xs"}>
                {t("UserPhone")}
              </Text>
            </Group>
            <Text
              c="textMain.0"
              fz={"xs"}
              fw={500}
              dir="ltr"
              style={{ wordBreak: "break-all" }}
            >
              {phone || "---"}
            </Text>
          </Group>
        </Stack>
      </div>

      <div>
        <HorizontalDivider my="sm" />
        <Group align="flex-start" gap="xs" wrap="nowrap">
          <IconMapPin
            size={18}
            color="var(--mantine-color-surface-9)"
            style={{ flexShrink: 0, marginTop: 2 }}
          />
          <Text
            c={"textMain.0"}
            fz={"xs"}
            style={{
              wordBreak: "break-word",
              lineHeight: 1.5,
            }}
          >
            {address || "---"}
          </Text>
        </Group>
      </div>
    </GlassPanel>
  );
}
