import GlassPanel from "@/components/ui/glass/glass-panel";
import { Menu, Group, Text } from "@mantine/core";
import { IconUserCircle, IconUser, IconLogout } from "@tabler/icons-react";
import style from "../profile.module.css";
import { useTranslations } from "next-intl";
import { useUser } from "../hook/use-user";
import HorizontalDivider from "@/components/ui/elements/horizontal-divider";
import { Link } from "@/navigation";

export default function UserProfile() {
  const t = useTranslations("Profile");
  const { user, logout } = useUser();
  return (
    <Menu
      position="bottom-end"
      classNames={{
        item: style.menuItem,
      }}
    >
      <Menu.Target>
        <Group justify="center" align="center">
          <IconUserCircle
            color="var(--mantine-color-surface-9)"
            cursor={"pointer"}
          />
        </Group>
      </Menu.Target>
      <Menu.Dropdown
        bg="transparent"
        p={0}
        style={{ border: "1px solid #7b6210", boxShadow: "none" }}
      >
        <GlassPanel p={"sm"}>
          <Menu.Item>
            <Link href={"/profile"} style={{ textDecoration: "none" }}>
              <Group gap={10}>
                <IconUser size={18} color="var(--mantine-color-surface-9)" />
                <Text size="sm" c={"surface.7"} mt={5}>
                  {user?.name}
                </Text>
              </Group>
            </Link>
          </Menu.Item>
          <HorizontalDivider />
          <Menu.Item onClick={() => logout()}>
            <Group gap={10}>
              <IconLogout size={18} color="var(--mantine-color-surface-9)" />
              <Text size="sm" c={"surface.7"} mt={5}>
                {t("Logout")}
              </Text>
            </Group>
          </Menu.Item>
        </GlassPanel>
      </Menu.Dropdown>
    </Menu>
  );
}
