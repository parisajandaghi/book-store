"use client";

import HorizontalDivider from "@/components/ui/elements/horizontal-divider";
import GlassPanel from "@/components/ui/glass/glass-panel";
import AdminUserEditModal from "@/features/admin/components/admin-user-edit-modal";
import AdminUserSearchBar from "@/features/admin/components/admin-user-searchbar";
import AdminUserTable from "@/features/admin/components/admin-user-table";
import { useUsers } from "@/features/admin/hooks/use-admin-users";
import { User } from "@/types/user.type";
import { Group, Pagination, Stack } from "@mantine/core";
import React, { useState } from "react";

export default function AdminUserPage() {
  const {
    users,
    isLoading,
    search,
    setSearch,
    page,
    setPage,
    totalPages,
    updateUserRole,
  } = useUsers();

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modalOpened, setModalOpened] = useState(false);

  const handleOpenEdit = (user: User) => {
    setSelectedUser(user);
    setModalOpened(true);
  };

  const handleCloseEdit = () => {
    setSelectedUser(null);
    setModalOpened(false);
  };

  return (
    <Stack gap="md">
      <AdminUserSearchBar
        handleSearchChange={(val) => {
          setSearch(val);
          setPage(1);
        }}
        search={search}
      />

      <GlassPanel p={{ base: "xs", sm: "lg" }}>
        <AdminUserTable
          users={users}
          isLoading={isLoading}
          handleOpenEdit={handleOpenEdit}
        />

        {totalPages > 1 && (
          <>
            <HorizontalDivider my="md" />
            <Group justify="center" wrap="wrap">
              <Pagination
                total={totalPages}
                value={page}
                onChange={setPage}
                color="yellow.6"
                size="sm"
              />
            </Group>
          </>
        )}
      </GlassPanel>

      <AdminUserEditModal
        opened={modalOpened}
        onClose={handleCloseEdit}
        user={selectedUser}
        onSaveRole={updateUserRole}
      />
    </Stack>
  );
}
