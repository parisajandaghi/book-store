import { notifications } from "@mantine/notifications";
import {
  IconCheck,
  IconAlertTriangle,
  IconX,
} from "@tabler/icons-react";

const baseStyles = {
  root: {
    backdropFilter: "blur(20px)",
    boxShadow: "0 8px 32px rgba(0,0,0,.35)",
    width: 320,
  },
  description: {
    color: "#f5f5f5",
  },
};

export function showSuccessNotification(message: string) {
  notifications.show({
    id: "success",
    message,
    icon: <IconCheck size={18} />,
    styles: {
      ...baseStyles,
      root: {
        ...baseStyles.root,
        background: "rgba(16, 37, 23, 0.95)",
        border: "1px solid rgba(81, 207, 102, 0.4)",
      },
    },
  });
}

export function showErrorNotification(message: string) {
  notifications.show({
    id: "error",
    message,
    icon: <IconX size={18} />,
    styles: {
      ...baseStyles,
      root: {
        ...baseStyles.root,
        background: "rgba(42, 17, 17, 0.43)",
        border: "1px solid #ff4d4f66",
        marginTop:50
      },
    },
  });
}

export function showWarningNotification(message: string) {
  notifications.show({
    id: "warning",
    message,
    icon: <IconAlertTriangle size={18} />,
    styles: {
      ...baseStyles,
      root: {
        ...baseStyles.root,
        background: "rgba(42, 36, 18, 0.95)",
        border: "1px solid rgba(245, 194, 66, 0.4)",
      },
    },
  });
}