import GlassPanel from "@/components/ui/glass/glass-panel";
import AdminDashboardTable from "@/features/admin/components/admin-dashboard-table";
import { Sparkline } from "@mantine/charts";
import { Center, Group, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import {
  IconBooks,
  IconChartLine,
  IconMoodSpark,
  IconPackage,
  IconUserPlus,
} from "@tabler/icons-react";
import { useTranslations } from "next-intl";
export default function AdminDashboardPage() {
  const t = useTranslations("Admin");
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
      <Group w="100%" maw={1000} mx="auto" justify="space-between">
        <GlassPanel w={200} p={"md"}>
          <Group>
            <ThemeIcon variant="outline" color="#a78622" radius="xl">
              <IconBooks color="#a78622" size={20} />
            </ThemeIcon>
            <Text fz={"sm"} c={"#ffffffb2"}>
              {t("BooksInStock")}
            </Text>
          </Group>
          <Center>
            <Text c={"#ffffff"}>12</Text>
          </Center>
          <Center>
            <Sparkline
              w={100}
              h={60}
              data={[1, 2, 4, 8]}
              curveType="linear"
              color="#a78622"
              fillOpacity={0.6}
              strokeWidth={2}
            />
          </Center>
        </GlassPanel>
        <GlassPanel w={200} p={"md"}>
          <Group>
            <ThemeIcon variant="outline" color="#a78622" radius="xl">
              <IconUserPlus color="#a78622" size={20} />
            </ThemeIcon>
            <Text fz={"sm"} c={"#ffffffb2"}>
              {t("NewCustomers")}
            </Text>
          </Group>
          <Center>
            <Text c={"#ffffff"}>12</Text>
          </Center>
          <Center>
            <Sparkline
              w={100}
              h={60}
              data={[10, 20, 40, 20, 40, 10, 50]}
              curveType="linear"
              color="#a78622"
              fillOpacity={0.6}
              strokeWidth={2}
            />
          </Center>
        </GlassPanel>
        <GlassPanel w={200} p={"md"}>
          <Group>
            <ThemeIcon variant="outline" color="#a78622" radius="xl">
              <IconPackage color="#a78622" size={20} />
            </ThemeIcon>
            <Text fz={"sm"} c={"#ffffffb2"}>
              {t("ActiveOrders")}
            </Text>
          </Group>
          <Center>
            <Text c={"#ffffff"}>12</Text>
          </Center>
          <Center>
            <Sparkline
              w={100}
              h={60}
              data={[10, 20, 40, 20, 40, 10, 50]}
              curveType="linear"
              color="#a78622"
              fillOpacity={0.6}
              strokeWidth={2}
            />
          </Center>
        </GlassPanel>
        <GlassPanel w={200} p={"md"}>
          <Group>
            <ThemeIcon variant="outline" color="#a78622" radius="xl">
              <IconChartLine color="#a78622" size={20} />
            </ThemeIcon>
            <Text fz={"sm"} c={"#ffffffb2"}>
              {t("TotalRevenue")}
            </Text>
          </Group>
          <Center>
            <Text c={"#ffffff"}>12</Text>
          </Center>
          <Center>
            <Sparkline
              w={100}
              h={60}
              data={[10, 20, 40, 20, 40, 10, 50]}
              curveType="linear"
              color="#a78622"
              fillOpacity={0.6}
              strokeWidth={2}
            />
          </Center>
        </GlassPanel>
      </Group>
      <AdminDashboardTable />
    </Stack>
  );
}
