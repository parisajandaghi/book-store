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
  Flex,
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
    <Container w="100%" px={{ base: "xs", sm: "md" }}>
      <GlassPanel py={{ base: "md", sm: "lg" }} px={{ base: "md", sm: "xl" }}>
        {/* بخش اطلاعات کاربر */}
        <Flex
          direction={{ base: "column", sm: "row" }}
          align={{ base: "center", sm: "flex-start" }}
          gap="md"
          w="100%"
        >
          <Avatar
            color="var(--mantine-color-surface-9)"
            size={70}
            style={{ flexShrink: 0 }}
          />

          <Flex
            direction={{ base: "column", sm: "row" }}
            justify="space-between"
            align={{ base: "stretch", sm: "center" }}
            gap="md"
            style={{ flex: 1, width: "100%" }}
          >
            <Flex
              direction="column"
              gap={6}
              align={{ base: "center", sm: "flex-start" }}
            >
              <Text
                fz={{ base: "h4", sm: "h3" }}
                fw={600}
                c="textMain.2"
                ta={{ base: "center", sm: "start" }}
              >
                {user?.name}
              </Text>

              <Group gap="xs" justify="center" wrap="nowrap">
                <IconMail
                  size={18}
                  color="var(--mantine-color-surface-9)"
                  style={{ flexShrink: 0 }}
                />
                <Text
                  fz={{ base: "xs", sm: "sm" }}
                  c="textMain.2"
                  ff={locale === "en" ? "system-ui, sans-serif" : "inherit"}
                >
                  {user?.email}
                </Text>
              </Group>

              <Group gap="xs" justify="center" wrap="nowrap">
                <IconPhone
                  size={18}
                  color="var(--mantine-color-surface-9)"
                  style={{ flexShrink: 0 }}
                />
                <Text
                  fz={{ base: "xs", sm: "sm" }}
                  c="textMain.2"
                  ff={locale === "en" ? "system-ui, sans-serif" : "inherit"}
                >
                  {user?.phone}
                </Text>
              </Group>
            </Flex>

            <Box
              w={{ base: "fit-content", sm: "auto" }}
              mx={{ base: "auto", sm: 0 }}
            >
              <PrimaryButton
                onClick={() => setIsInfoModalOpen(true)}
                btnText={t("InfoEdit")}
                icon={
                  <IconPencil
                    size={18}
                    color="var(--mantine-color-surface-9)"
                  />
                }
                width="100%"
              />
            </Box>
          </Flex>
        </Flex>

        <HorizontalDivider my="md" />

        {/* لیست سفارش‌ها */}
        {orders.length !== 0 ? (
          <Flex justify="center" w="100%">
            {/* ظرف مشترک تایتل و کارت تا دقیقاً هم‌تراز بمانند */}
            <Box w={{ base: "100%", sm: "fit-content" }}>
              <Text
                fz={{ base: "h5", sm: "h4" }}
                fw={600}
                c="textMain.2"
                ta="start"
                mb="md"
              >
                {t("MyOrders")}
              </Text>

              <ScrollArea h={{ base: 360, sm: 300 }} offsetScrollbars>
                <OrderCard />
              </ScrollArea>
            </Box>
          </Flex>
        ) : (
          <Center my="xl">
            <Title
              order={3}
              fz={{ base: "md", sm: "h3" }}
              c="var(--mantine-color-surface-9)"
              ta="center"
            >
              {t1("EmptyState.Description")}
            </Title>
          </Center>
        )}
      </GlassPanel>

      <UserInformationModal />
    </Container>
  );
}
