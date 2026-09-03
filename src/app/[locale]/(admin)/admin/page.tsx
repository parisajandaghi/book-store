"use client";
import GlassPanel from "@/components/ui/glass/glass-panel";
import AdminDashboardTable from "@/features/admin/components/admin-dashboard-table";
import { useAdminMetrics } from "@/features/admin/hooks/use-admin-metrics";
import { getFormattedPrice } from "@/utils/book.utils";
import { Sparkline } from "@mantine/charts";
import {
  Center,
  Group,
  Loader,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import {
  IconBooks,
  IconChartLine,
  IconMoodSpark,
  IconPackage,
  IconUserPlus,
} from "@tabler/icons-react";
import { useLocale, useTranslations } from "next-intl";
export default function AdminDashboardPage() {
  const t = useTranslations("Admin");
  const t2 = useTranslations("Product");
  const locale = useLocale();
  const { metrics, isLoading } = useAdminMetrics();

  const cards = metrics
    ? [
        {
          label: t("BooksInStock"),
          icon: IconBooks,
          value: metrics.booksInStock,
          data: metrics.booksHistory,
        },
        {
          label: t("NewCustomers"),
          icon: IconUserPlus,
          value: metrics.newCustomers,
          data: metrics.customersHistory,
        },
        {
          label: t("ActiveOrders"),
          icon: IconPackage,
          value: metrics.activeOrders,
          data: metrics.ordersHistory,
        },
        {
          label: t("TotalRevenue"),
          icon: IconChartLine,
          value:
            locale === "en"
              ? `${t2("CurrencySymbol")} ${getFormattedPrice(metrics.totalRevenue, locale)}`
              : `${getFormattedPrice(metrics.totalRevenue, locale)} ${t2("CurrencySymbol")}`,
          data: metrics.revenueHistory,
        },
      ]
    : [];
  return (
    <Stack gap={"xl"}>
      <Stack gap={2}>
        <Title order={2} c="surface.5" mb="md">
          {t("Dashboard")}
        </Title>
        <Group gap={6}>
          <IconMoodSpark color="#d4af37" />
          <Text c="textMain.0" fz={"xs"}>
            {t("Wellcom")}
          </Text>
        </Group>
      </Stack>
      {isLoading ? (
        <Center h={120}>
          <Loader size="sm" color="#a78622" />
        </Center>
      ) : (
        <Group w="100%" maw={1000} mx="auto" justify="space-between">
          {cards.map((card) => (
            <GlassPanel key={card.label} w={200} p="md">
              <Group>
                <ThemeIcon variant="outline" color="#a78622" radius="xl">
                  <card.icon color="#a78622" size={20} />
                </ThemeIcon>
                <Text fz="sm" c="#ffffffb2"   ff={locale === "en" ? "system-ui, sans-serif" : "inherit"}>
                  {card.label}
                </Text>
              </Group>
              <Center>
                <Text c="#ffffff" fw={700} fz="xl"   ff={locale === "en" ? "system-ui, sans-serif" : "inherit"}>
                  {card.value}
                </Text>
              </Center>
              <Center>
                <Sparkline
                  w={100}
                  h={60}
                  data={card.data}
                  curveType="linear"
                  color="#a78622"
                  fillOpacity={0.6}
                  strokeWidth={2}
                />
              </Center>
            </GlassPanel>
          ))}
        </Group>
      )}
      <AdminDashboardTable />
    </Stack>
  );
}
