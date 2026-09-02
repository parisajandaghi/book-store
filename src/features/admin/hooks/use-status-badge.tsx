import { Badge, Text } from "@mantine/core";
import { useTranslations } from "next-intl";

export function useStatusBadge() {
  const t2 = useTranslations("Orders");
  const getStatusBadge = (status: string) => {
    switch (status.toUpperCase()) {
      case "PENDING":
        return (
          <Badge color="surface" variant="light">
            <Text fz={"xs"} fw={"bold"} mt={2}>
              {t2("Status.pending")}
            </Text>
          </Badge>
        );
      case "PROCESSING":
        return (
          <Badge color="surface" variant="light">
            <Text fz={"xs"} fw={"bold"} mt={2}>
              {t2("Status.processing")}
            </Text>
          </Badge>
        );
      case "DELIVERED":
        return (
          <Badge color="#86A789" variant="light">
            <Text fz={"xs"} fw={"bold"} mt={2}>
              {t2("Status.delivered")}
            </Text>
          </Badge>
        );
      case "CANCELLED":
        return (
          <Badge color="#C5705D" variant="light">
            <Text fz={"xs"} fw={"bold"} mt={2}>
              {t2("Status.cancelled")}
            </Text>
          </Badge>
        );
    }
  };
  return { getStatusBadge };
}
