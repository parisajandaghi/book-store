import HorizontalDivider from "@/components/ui/elements/horizontal-divider";
import GlassPanel from "@/components/ui/glass/glass-panel";
import { Group, SimpleGrid, Text, ThemeIcon } from "@mantine/core";
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
    <GlassPanel p={"md"}>
      <Group>
        <ThemeIcon variant="outline" color="var(--mantine-color-surface-9)">
          <IconUser size={20} />
        </ThemeIcon>
        <Text c={"textMain.0"}>{t("CostumerInfo")}</Text>
      </Group>
      <SimpleGrid cols={1} verticalSpacing={"xs"}>
        <Group gap={"xl"}>
          <Group gap={10}>
            <IconUser size={16} color="#fefaf4" />
            <Text
              c="textMain.0"
              fz={"xs"}
              style={{ transform: "translateY(2px)" }}
            >
              {t("UserName")}
            </Text>
          </Group>
          <Text
            c="textMain.0"
            fz={"xs"}
            style={{ transform: "translateY(2px)" }}
          >
            {name}
          </Text>
        </Group>
        <Group gap={"xl"}>
          <Group gap={10}>
            <IconMail size={16} color="#fefaf4" />
            <Text
              c="textMain.0"
              fz={"xs"}
              style={{ transform: "translateY(2px)" }}
            >
              {t("UserMail")}
            </Text>
          </Group>
          <Text
            c="textMain.0"
            fz={"xs"}
            style={{ transform: "translateY(2px)" }}
          >
            {email}
          </Text>
        </Group>
        <Group gap={"xl"}>
          <Group gap={10}>
            <IconPhone size={16} color="#fefaf4" />
            <Text
              c="textMain.0"
              fz={"xs"}
              style={{ transform: "translateY(2px)" }}
            >
              {t("UserPhone")}
            </Text>
          </Group>
          <Text
            c="textMain.0"
            fz={"xs"}
            style={{ transform: "translateY(2px)" }}
          >
            {phone}
          </Text>
        </Group>
      </SimpleGrid>
      <HorizontalDivider />
      <Group>
        <IconMapPin size={18} color="var(--mantine-color-surface-9)"/>

        <Text c={"textMain.0"} fz={"xs"}>
          {address}
        </Text>
      </Group>
    </GlassPanel>
  );
}
