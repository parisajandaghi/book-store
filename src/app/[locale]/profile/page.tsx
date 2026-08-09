"use client";
import PrimaryButton from "@/components/ui/action-panel/primary-button";
import HorizontalDivider from "@/components/ui/elements/horizontal-divider";
import GlassPanel from "@/components/ui/glass/glass-panel";
import OrderCard from "@/features/orders/components/order-card";
import { useOrderHistory } from "@/features/orders/hooks/use-order-history";
import UserInformationModal from "@/features/profile/components/user-information-modal";
import { useUser } from "@/features/profile/hook/use-user";
import { informationModalAtom } from "@/store/profile-atom";
import {
  Avatar,
  Box,
  Center,
  Container,
  Group,
  ScrollArea,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconMail, IconPencil, IconPhone } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useLocale, useTranslations } from "next-intl";

export default function Profile() {
  const { user } = useUser();
  const t = useTranslations("Profile");
  const t1 = useTranslations("Orders");
  const [, setIsInfoModalOpen] = useAtom(informationModalAtom);
  const { orders } = useOrderHistory();
  const locale = useLocale();

  return (
    <Container w={"100%"}>
      <GlassPanel py={"lg"} px={"xl"}>
        <Group>
          <Avatar color="var(--mantine-color-surface-9)" size={70} />
          <Group justify="space-between" flex={2}>
            <Stack gap={5}>
              <Text fz={"h3"} c={"textMain.2"}>
                {user?.name}
              </Text>
              <Group>
                <IconMail color="var(--mantine-color-surface-9)" />
                <Text
                  fz={"h6"}
                  c={"textMain.2"}
                  ff={locale === "en" ? "system-ui, sans-serif" : "inherit"}
                >
                  {user?.email}
                </Text>
              </Group>
              <Group>
                <IconPhone color="var(--mantine-color-surface-9)" />
                <Text
                  fz={"h6"}
                  c={"textMain.2"}
                  ff={locale === "en" ? "system-ui, sans-serif" : "inherit"}
                >
                  {user?.phone}
                </Text>
              </Group>
            </Stack>
            <PrimaryButton
              onClick={() => setIsInfoModalOpen(true)}
              btnText={t("InfoEdit")}
              icon={
                <IconPencil size={18} color="var(--mantine-color-surface-9)" />
              }
              width={160}
            />
          </Group>
        </Group>
        <HorizontalDivider />
        {orders.length !== 0 ? (
          <>
            {" "}
            <Group>
              <Box w={70} h={70} />
              <Text fz={"h4"} c={"textMain.2"}>
                {t("MyOrders")}
              </Text>
            </Group>
            <Center>
              <ScrollArea h={300}>
                <OrderCard />
              </ScrollArea>
            </Center>
          </>
        ) : (
          <Center my={"xl"}>
            <Title order={3} c="var(--mantine-color-surface-9)">
              {t1("EmptyState.Description")}
            </Title>
          </Center>
        )}
      </GlassPanel>
      <UserInformationModal />
    </Container>
  );
}
