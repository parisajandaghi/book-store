import GlassPanel from "@/components/ui/glass/glass-panel";
import { Center, Group, SimpleGrid, Skeleton, Stack } from "@mantine/core";

export default function MetricCardsSkeleton() {
  return (
    <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }} spacing="md">
      {Array.from({ length: 4 }).map((_, i) => (
        <GlassPanel key={i} p="md" w="100%">
          <Stack gap="xs">
            <Group justify="space-between" wrap="nowrap">
              <Skeleton height={14} width="55%" radius="sm" opacity={0.15} />
              <Skeleton height={24} width={24} circle opacity={0.15} />
            </Group>
            <Center my={4}>
              <Skeleton height={28} width="40%" radius="sm" opacity={0.2} />
            </Center>
            <Center>
              <Skeleton height={50} width={140} radius="md" opacity={0.15} />
            </Center>
          </Stack>
        </GlassPanel>
      ))}
    </SimpleGrid>
  );
}
