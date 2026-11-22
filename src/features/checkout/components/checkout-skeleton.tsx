import GlassPanel from "@/components/ui/glass/glass-panel";
import { Flex, Group, Skeleton, Stack } from "@mantine/core";

export default function CheckoutSkeleton() {
  return (
    <Stack gap="md" w="100%" mt={"md"}>
      <GlassPanel p="md" w="100%">
        <Group justify="space-between" align="center" wrap="nowrap">
          {Array.from({ length: 3 }).map((_, i) => (
            <Group key={i} gap="xs" wrap="nowrap" style={{ flex: 1 }}>
              <Skeleton height={32} width={32} circle opacity={0.15} />

              <Stack gap={5} style={{ flex: 1 }}>
                <Skeleton height={12} width="75%" radius="sm" opacity={0.15} />
                <Skeleton height={9} width="50%" radius="sm" opacity={0.15} />
              </Stack>

              {i !== 2 && (
                <Skeleton height={2} width="20%" radius="sm" opacity={0.15} />
              )}
            </Group>
          ))}
        </Group>
      </GlassPanel>

      {/* Checkout Content Skeleton */}
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
              {Array.from({ length: 8 }).map((_, i) => (
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
    </Stack>
  );
}
