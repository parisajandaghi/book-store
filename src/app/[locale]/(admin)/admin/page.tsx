"use client";

import GlassPanel from "@/components/ui/glass/glass-panel";
import AdminDashboardTable from "@/features/admin/components/admin-dashboard-table";
import MetricCardsSkeleton from "@/features/admin/components/metric-cards-skeleton";

import { useAdminMetrics } from "@/features/admin/hooks/use-admin-metrics";
import { getFormattedPrice } from "@/utils/book.utils";
import { Sparkline } from "@mantine/charts";
import {
  Box,
  Center,
  Group,
  ScrollArea,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
  Tooltip,
} from "@mantine/core";
import {
  IconBooks,
  IconChartLine,
  IconMoodSpark,
  IconPackage,
  IconUserPlus,
} from "@tabler/icons-react";
import { useLocale, useTranslations } from "next-intl";
import style from "./admin-page.module.css";
import DashboardTableSkeleton from "@/features/admin/components/dashboard-table-skeleton";

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
          value: metrics.totalTitles,
          data: metrics.booksHistory,
          tooltip: t("Tooltips.Books"),
        },
        {
          label: t("NewCustomers"),
          icon: IconUserPlus,
          value: metrics.newCustomers,
          data: metrics.customersHistory,
          tooltip: t("Tooltips.Customers"),
        },
        {
          label: t("ActiveOrders"),
          icon: IconPackage,
          value: metrics.activeOrders,
          data: metrics.ordersHistory,
          tooltip: t("Tooltips.Orders"),
        },
        {
          label: t("TotalRevenue"),
          icon: IconChartLine,
          value:
            locale === "en"
              ? `${t2("CurrencySymbol")} ${getFormattedPrice(metrics.totalRevenue, locale)}`
              : `${getFormattedPrice(metrics.totalRevenue, locale)} ${t2("CurrencySymbol")}`,
          data: metrics.revenueHistory,
          tooltip: t("Tooltips.Revenue"),
        },
      ]
    : [];

  return (
    <Stack gap="xl" w="100%" maw={1200} mx="auto">
      <Stack gap={4}>
        <Title order={2} c="surface.5">
          {t("Dashboard")}
        </Title>
        <Group gap={6}>
          <IconMoodSpark color="#d4af37" size={18} />
          <Text c="textMain.0" fz="xs">
            {t("Wellcom")}
          </Text>
        </Group>
      </Stack>

      {isLoading ? (
        <MetricCardsSkeleton />
      ) : (
        <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }} spacing="md">
          {cards.map((card) => (
            <GlassPanel key={card.label} p="md" w="100%">
              <Stack gap="xs">
                <Group justify="space-between" wrap="nowrap">
                  <Text
                    fz="xs"
                    c="#ffffffb2"
                    fw={500}
                    ff={locale === "en" ? "system-ui, sans-serif" : "inherit"}
                  >
                    {card.label}
                  </Text>
                  <ThemeIcon
                    variant="outline"
                    color="#a78622"
                    radius="xl"
                    size="sm"
                  >
                    <card.icon color="#a78622" size={16} />
                  </ThemeIcon>
                </Group>

                <Center my={4}>
                  <Text
                    c="#ffffff"
                    fw={700}
                    fz="xl"
                    ff={locale === "en" ? "system-ui, sans-serif" : "inherit"}
                  >
                    {card.value}
                  </Text>
                </Center>

                <Center>
                  <Tooltip
                    label={card.tooltip}
                    position="top"
                    withArrow
                    arrowSize={6}
                    transitionProps={{ transition: "fade-up", duration: 150 }}
                    classNames={{
                      tooltip: `${style.glassTooltip} ${locale === "en" ? style.glassTooltipEn : ""}`,
                      arrow: style.glassTooltipArrow,
                    }}
                  >
                    <Box w="100%" maw={140} style={{ cursor: "pointer" }}>
                      <Sparkline
                        w="100%"
                        h={50}
                        data={card.data}
                        curveType="linear"
                        color="#a78622"
                        fillOpacity={0.6}
                        strokeWidth={2}
                      />
                    </Box>
                  </Tooltip>
                </Center>
              </Stack>
            </GlassPanel>
          ))}
        </SimpleGrid>
      )}

      {isLoading ? (
        <DashboardTableSkeleton />
      ) : (
        <ScrollArea h={{ base: 360, sm: 300 }} offsetScrollbars type="hover">
          <AdminDashboardTable />
        </ScrollArea>
      )}
    </Stack>
  );
}
