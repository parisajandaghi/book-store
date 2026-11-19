import GlassPanel from "@/components/ui/glass/glass-panel";
import { Stack, Group, Skeleton } from "@mantine/core";

export default function DashboardTableSkeleton() {
  return (
    <GlassPanel p="md" w="100%">
      <Stack gap="md">
        <Group justify="space-between" mb="xs">
          <Skeleton height={20} width="15%" radius="sm" opacity={0.2} />

          <Skeleton height={20} width="10%" radius="sm" opacity={0.2} />
        </Group>
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton
            key={i}
            height={36}
            width="100%"
            radius="md"
            opacity={0.12}
          />
        ))}
      </Stack>
    </GlassPanel>
  );
}
