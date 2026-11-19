import GlassPanel from "@/components/ui/glass/glass-panel";
import { Flex, Skeleton, Stack, Box, Group } from "@mantine/core";

export default function CheckoutSkeleton() {
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      align="stretch"
      gap="md"
      w="100%"
    >
      <GlassPanel flex={{ base: "1 1 auto", md: 2 }} p="md" w="100%">
        <Stack gap="xl">
          <Skeleton height={30} width="40%" radius="sm" opacity={0.15} />
          <Stack gap="sm">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton
                key={i}
                height={40}
                width="100%"
                radius="md"
                opacity={0.15}
              />
            ))}
          </Stack>
        </Stack>
      </GlassPanel>

      <GlassPanel flex={{ base: "1 1 auto", md: 1 }} p="sm">
        <Stack gap="md">
          <Group>
            <Skeleton height={20} width={20} radius="sm" opacity={0.15} />
            <Skeleton height={20} width={100} radius="sm" opacity={0.15} />
          </Group>
          <Skeleton height={1} width="100%" opacity={0.15} />
          <Stack gap="xs">
            {Array.from({ length: 3 }).map((_, i) => (
              <Group key={i} justify="space-between">
                <Skeleton height={14} width={60} radius="sm" opacity={0.15} />
                <Skeleton height={14} width={80} radius="sm" opacity={0.15} />
              </Group>
            ))}
          </Stack>
          <Skeleton height={40} width="100%" radius="md" opacity={0.15} />
        </Stack>
      </GlassPanel>
    </Flex>
  );
}
