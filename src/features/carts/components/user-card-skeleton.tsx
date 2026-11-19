import GlassPanel from "@/components/ui/glass/glass-panel";
import { Flex, Group, Skeleton, Stack } from "@mantine/core";

export default function UserCardSkeleton() {
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      align={{ base: "stretch", md: "flex-start" }}
      gap="md"
    >
      <GlassPanel flex={{ base: "1 1 auto", md: 2 }} p={"md"} w="100%">
        <Stack gap="md">
          {Array.from({ length: 3 }).map((_, i) => (
            <Group key={i} gap="sm" wrap="nowrap">
              <Skeleton height={60} width={40} radius="sm" opacity={0.15} />
              <Stack gap="xs" flex={1}>
                <Skeleton height={12} width="60%" opacity={0.15} />
                <Skeleton height={10} width="40%" opacity={0.15} />
              </Stack>
              <Skeleton height={20} width={60} opacity={0.15} />
            </Group>
          ))}
        </Stack>
      </GlassPanel>

      <GlassPanel
        flex={{ base: "1 1 auto", md: 1 }}
        w={{ base: "100%", md: "auto" }}
        p={"sm"}
      >
        <Stack gap="sm">
          <Group>
            <Skeleton height={18} width={18} opacity={0.15} />
            <Skeleton height={18} width={100} opacity={0.15} />
          </Group>
          <Skeleton height={1} width="100%" opacity={0.15} />
          <Group justify="space-between" px="xs">
            <Skeleton height={12} width={50} opacity={0.15} />
            <Skeleton height={12} width={70} opacity={0.15} />
          </Group>
          <Group justify="space-between" px="xs">
            <Skeleton height={12} width={50} opacity={0.15} />
            <Skeleton height={12} width={70} opacity={0.15} />
          </Group>
          <Skeleton height={1} width="100%" opacity={0.15} />
          <Group justify="space-between" p="xs">
            <Skeleton height={14} width={50} opacity={0.15} />
            <Skeleton height={14} width={80} opacity={0.15} />
          </Group>
          <Skeleton height={40} width="100%" radius="sm" opacity={0.15} />
        </Stack>
      </GlassPanel>
    </Flex>
  );
}
