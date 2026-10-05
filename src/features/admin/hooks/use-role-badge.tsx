import { Badge, Text } from "@mantine/core";
import { useTranslations } from "next-intl";

export function useRoleBadge() {
  const t = useTranslations("Admin");
  const getRoleBadge = (status: string) => {
    console.log('status',status.toUpperCase());
    
    switch (status.toUpperCase()) {
      case "ADMIN":
        return (
          <Badge color="surface" variant="light">
            <Text fz={"xs"} fw={"bold"} mt={2}>
              {t("User.Admin")}
            </Text>
          </Badge>
        );
      case "USER":
        return (
          <Badge color="surface" variant="light">
            <Text fz={"xs"} fw={"bold"} mt={2}>
              {t("User.Customer")}
            </Text>
          </Badge>
        );
    }
  };
  return { getRoleBadge };
}
