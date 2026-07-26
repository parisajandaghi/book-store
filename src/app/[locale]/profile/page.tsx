"use client";
import PrimaryButton from "@/components/ui/action-panel/primary-button";
import HorizontalDivider from "@/components/ui/elements/horizontal-divider";
import GlassPanel from "@/components/ui/glass/glass-panel";
import OrderCard from "@/features/orders/components/order-card";
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
} from "@mantine/core";
import { IconMail, IconPencil } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useTranslations } from "next-intl";

export default function Profile() {
  const { user } = useUser();
  const t = useTranslations("Profile");
  const [, setIsInfoModalOpen] = useAtom(informationModalAtom);
  return (
    <Container w={"100%"}>
      <GlassPanel py={"lg"} px={"xl"}>
        <Group>
          <Avatar color="var(--mantine-color-surface-9)" size={70} />
          <Group justify="space-between" flex={2}>
            <Stack gap={5}>
              <Text fz={"h4"} c={"textMain.2"}>
                {user?.name}
              </Text>
              <Group>
                <IconMail color="var(--mantine-color-surface-9)" />
                <Text fz={"xs"} c={"textMain.2"}>
                  {user?.email}
                </Text>
              </Group>
              <Text>reer</Text>
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
        <Group>
          <Box w={70} h={70}></Box>
          <Text fz={"h4"} c={"textMain.2"}>
            {t("MyOrders")}
          </Text>
        </Group>
        <Center>
          <ScrollArea h={300}>
            <OrderCard />
          </ScrollArea>
        </Center>
      </GlassPanel>
      <UserInformationModal />
    </Container>
  );
}
