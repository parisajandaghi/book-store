import { notifications } from "@mantine/notifications";
import {
  IconAlertTriangle,
  IconCheck,
  IconInfoCircle,
  IconX,
} from "@tabler/icons-react";
import React from "react";

interface NotifyOptions {
  id?: string;
  title?: string;
  message: string;
  autoClose?: number | boolean;
}

export const notify = {
  success: ({
    id,
    title = "success",
    message,
    autoClose = 3500,
  }: NotifyOptions) => {
    notifications.show({
      id,
      title,
      message,
      color: "toastSuccess.5",
      icon: React.createElement(IconCheck, { size: 18 }),
      autoClose,
    });
  },

  error: ({
    id,
    title = "error",
    message,
    autoClose = 5000,
  }: NotifyOptions) => {
    notifications.show({
      id,
      title,
      message,
      color: "toastError.5",
      icon: React.createElement(IconX, { size: 18 }),
      autoClose,
    });
  },

  warning: ({
    id,
    title = "warning",
    message,
    autoClose = 4000,
  }: NotifyOptions) => {
    notifications.show({
      id,
      title,
      message,
      color: "toastWarning.5",
      icon: React.createElement(IconAlertTriangle, { size: 18 }),
      autoClose,
    });
  },

  info: ({
    id,
    title = "information",
    message,
    autoClose = 3500,
  }: NotifyOptions) => {
    notifications.show({
      id,
      title,
      message,
      color: "toastInfo.5",
      icon: React.createElement(IconInfoCircle, { size: 18 }),
      autoClose,
    });
  },
};
