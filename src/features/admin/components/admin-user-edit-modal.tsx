import {
  Modal,
  Stack,
  Text,
  Select,
  Button,
  Group,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { User } from "@/types/user.type";
import { useTranslations } from "next-intl";
import GlassPanel from "@/components/ui/glass/glass-panel";
import style from "../../../features/carts/cart.module.css";
import styles from "../admin.module.css";
type AdminUserEditModalProps = {
  opened: boolean;
  onClose: () => void;
  user: User | null;
  onSaveRole: (userId: number | string, newRole: string) => Promise<boolean>;
};

function AdminUserEditForm({
  user,
  onClose,
  onSaveRole,
}: {
  user: User;
  onClose: () => void;
  onSaveRole: (userId: number | string, newRole: string) => Promise<boolean>;
}) {
  const t = useTranslations("Admin");
  const [role, setRole] = useState<string>(user.role || "user");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const success = await onSaveRole(user.id, role);
    setLoading(false);
    if (success) onClose();
  };

  return (
    <GlassPanel p={"md"}>
      <Title order={4} c={"textMain.0"}>
        {t("User.EditRole")}
      </Title>
      <Text size="sm" c="surface.6">
        {user.name} ({user.email})
      </Text>
      <Select
        label={t("User.Role")}
        value={role}
        onChange={(val) => val && setRole(val)}
        classNames={{
          dropdown: "custom-select-dropdown",
          option: "custom-select-option",
          input: style.input,
          label: style.label,
        }}
        data={[
          { value: "user", label: "User" },
          { value: "ADMIN", label: "Admin" },
        ]}
      />
      <Group justify="flex-end" mt="md">
        <Button
          onClick={onClose}
          disabled={loading}
          className={styles.modalButton}
        >
          {t("User.Cancle")}
        </Button>
        <Button
          onClick={handleSubmit}
          loading={loading}
          className={styles.modalButton}
        >
          {t("User.Save")}
        </Button>
      </Group>
    </GlassPanel>
  );
}

export default function AdminUserEditModal({
  opened,
  onClose,
  user,
  onSaveRole,
}: AdminUserEditModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      withCloseButton={false}
      overlayProps={{
        backgroundOpacity: 0.6,
        blur: 4,
      }}
      styles={{
        content: {
          backgroundColor: "#f6c7f648",
          border: "1px solid #1f0f1f",
        },
      }}
    >
      {user && (
        <AdminUserEditForm
          key={user.id}
          user={user}
          onClose={onClose}
          onSaveRole={onSaveRole}
        />
      )}
    </Modal>
  );
}
