import { User } from "@/types/user.type";
import {
  ActionIcon,
  Center,
  Group,
  Loader,
  Stack,
  Table,
  Text,
} from "@mantine/core";
import { IconPencil, IconUserOff } from "@tabler/icons-react";
import { useLocale, useTranslations } from "next-intl";
import { useRoleBadge } from "../hooks/use-role-badge";
type AdminUserItem = User & { orders_count?: number };

type AdminUsersTableProps = {
  users: AdminUserItem[];
  isLoading: boolean;
  handleOpenEdit: (user: AdminUserItem) => void;
};
export default function AdminUserTable({
  users,
  isLoading,
  handleOpenEdit,
}: AdminUsersTableProps) {
  const t = useTranslations("Admin");
  console.log("tableUsers", users);

  const { getRoleBadge } = useRoleBadge();
  const locale = useLocale();
  return (
    <Table.ScrollContainer minWidth={700} maxHeight={300}>
      <Table
        layout="fixed"
        verticalSpacing="sm"
        highlightOnHover
        borderColor="rgba(255, 255, 255, 0.08)"
        highlightOnHoverColor="rgba(255, 255, 255, 0.04)"
      >
        <Table.Thead>
          <Table.Tr
            style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}
          >
            <Table.Th c={"textMain.0"} fw={600}>
              {t("User.UserDetails")}
            </Table.Th>

            <Table.Th ta={"center"} c="dimmed" fw={600}>
              {t("User.Role")}
            </Table.Th>
            <Table.Th ta={"center"} c="dimmed" fw={600}>
              {t("User.TotalOrders")}
            </Table.Th>

            <Table.Th
              ta={"center"}
              c="dimmed"
              fw={600}
              style={{ textAlign: "right" }}
            >
              {t("User.JoinedDate")}
            </Table.Th>
            <Table.Th
              ta={"center"}
              c="dimmed"
              fw={600}
              style={{ textAlign: "right" }}
            >
              {t("User.Actions")}
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {isLoading && users.length === 0 ? (
            <Table.Tr>
              <Table.Td colSpan={4}>
                <Center py="xl">
                  <Loader size="sm" color="var(--mantine-color-surface-9)" />
                </Center>
              </Table.Td>
            </Table.Tr>
          ) : users.length === 0 ? (
            <Table.Tr>
              <Table.Td colSpan={7}>
                <Center h={150} style={{ flexDirection: "column" }}>
                  <IconUserOff size={80} color="#a9a9a9" stroke={1.5} />
                  <Text c="surface.6" size="lg" fw={600} mt="md">
                    {t("User.NoUserFound")}
                  </Text>
                </Center>
              </Table.Td>
            </Table.Tr>
          ) : (
            users.map((user: User) => {
              console.log("user.role", user.role);

              return (
                <Table.Tr
                  key={user.id}
                  style={{
                    borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
                  }}
                >
                  <Table.Td>
                    <Stack>
                      <Text size="sm" fw={600} c="white">
                        {user.name}
                      </Text>
                      <Text size="xs" c="dimmed">
                        {user.email}
                      </Text>
                    </Stack>
                  </Table.Td>

                  <Table.Td ta={"center"}>{getRoleBadge(user.role)}</Table.Td>

                  <Table.Td ta={"center"}>
                    <Text
                      size="sm"
                      c="white"
                      ff={locale === "en" ? "system-ui, sans-serif" : "inherit"}
                    >
                      {user.orders_count ?? 0}
                    </Text>
                  </Table.Td>
                  <Table.Td ta={"center"}>
                    <Text
                      size="sm"
                      c="#ffffffd9"
                      dir="ltr"
                      ff={locale === "en" ? "system-ui, sans-serif" : "inherit"}
                    >
                      {user.created_at ? (
                        <>
                          {new Date(user.created_at).toLocaleDateString(
                            locale === "fa" ? "fa-IR" : "en-US",
                          )}

                          {" - "}

                          {new Date(user.created_at).toLocaleTimeString(
                            locale === "fa" ? "fa-IR" : "en-US",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}
                        </>
                      ) : (
                        "---"
                      )}
                    </Text>
                  </Table.Td>

                  <Table.Td style={{ textAlign: "right" }} ta={"center"}>
                    <Group gap={6} justify="center">
                      <ActionIcon
                        variant="subtle"
                        color="var(--mantine-color-surface-9)"
                        radius="md"
                        size="sm"
                      >
                        <IconPencil
                          size={16}
                          onClick={() => handleOpenEdit(user)}
                        />
                      </ActionIcon>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              );
            })
          )}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
