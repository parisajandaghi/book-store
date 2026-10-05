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
  console.log("users", users);

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
    <Stack gap="lg">
      {/* 1. Header Section */}
      <Group justify="space-between" align="center" wrap="wrap"></Group>

      {/* 2. Filter & Search Bar */}
      <AdminUserSearchBar
        handleSearchChange={(val) => {
          setSearch(val);
          setPage(1);
        }}
        search={search}
      />

      <GlassPanel p={"lg"}>
        <AdminUserTable
          users={users}
          isLoading={isLoading}
          handleOpenEdit={handleOpenEdit}
        />
        <HorizontalDivider my="xs" />
        {/* 4. Table Pagination Footer */}
        {totalPages > 1 && (
          <>
            <HorizontalDivider my="md" />
            <Group justify="flex-end" wrap="wrap">
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
