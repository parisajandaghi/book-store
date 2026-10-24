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
  const { getRoleBadge } = useRoleBadge();
  const locale = useLocale();

  if (isLoading && users.length === 0) {
    return (
      <Center py="xl">
        <Loader size="sm" color="var(--mantine-color-surface-9)" />
      </Center>
    );
  }

  if (users.length === 0) {
    return (
      <Center h={180} style={{ flexDirection: "column" }}>
        <IconUserOff size={64} color="#a9a9a9" stroke={1.5} />
        <Text c="surface.6" size="sm" fw={600} mt="sm">
          {t("User.NoUserFound")}
        </Text>
      </Center>
    );
  }

  return (
    <Table.ScrollContainer minWidth={640} maxHeight={360}>
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
            <Table.Th c="textMain.0" fw={600} style={{ width: "35%" }}>
              {t("User.UserDetails")}
            </Table.Th>

            <Table.Th ta="center" c="dimmed" fw={600} style={{ width: "15%" }}>
              {t("User.Role")}
            </Table.Th>

            <Table.Th ta="center" c="dimmed" fw={600} style={{ width: "15%" }}>
              {t("User.TotalOrders")}
            </Table.Th>

            <Table.Th ta="center" c="dimmed" fw={600} style={{ width: "23%" }}>
              {t("User.JoinedDate")}
            </Table.Th>

            <Table.Th ta="center" c="dimmed" fw={600} style={{ width: "12%" }}>
              {t("User.Actions")}
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {users.map((user: AdminUserItem) => (
            <Table.Tr
              key={user.id}
              style={{
                borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
              }}
            >
              {/* User Details */}
              <Table.Td>
                <Stack gap={2} style={{ minWidth: 0 }}>
                  <Text size="sm" fw={600} c="white" truncate="end">
                    {user.name}
                  </Text>
                  <Text size="xs" c="dimmed" truncate="end">
                    {user.email}
                  </Text>
                </Stack>
              </Table.Td>

              {/* Role */}
              <Table.Td ta="center">{getRoleBadge(user.role)}</Table.Td>

              {/* Orders Count */}
              <Table.Td ta="center">
                <Text
                  size="sm"
                  c="white"
                  ff={locale === "en" ? "system-ui, sans-serif" : "inherit"}
                >
                  {user.orders_count ?? 0}
                </Text>
              </Table.Td>

              {/* Joined Date */}
              <Table.Td ta="center">
                <Text
                  size="xs"
                  c="#ffffffd9"
                  dir="ltr"
                  ff={locale === "en" ? "system-ui, sans-serif" : "inherit"}
                >
                  {user.created_at ? (
                    <>
                      {new Date(user.created_at).toLocaleDateString(
                        locale === "fa" ? "fa-IR" : "en-US"
                      )}
                      {" - "}
                      {new Date(user.created_at).toLocaleTimeString(
                        locale === "fa" ? "fa-IR" : "en-US",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </>
                  ) : (
                    "---"
                  )}
                </Text>
              </Table.Td>

              {/* Action Button */}
              <Table.Td ta="center">
                <ActionIcon
                  variant="subtle"
                  color="var(--mantine-color-surface-9)"
                  radius="md"
                  size="sm"
                  onClick={() => handleOpenEdit(user)}
                  aria-label="Edit user"
                >
                  <IconPencil size={16} />
                </ActionIcon>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
