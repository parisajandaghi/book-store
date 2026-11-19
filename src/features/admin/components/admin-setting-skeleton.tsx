import GlassPanel from "@/components/ui/glass/glass-panel";
import HorizontalDivider from "@/components/ui/elements/horizontal-divider";
import { Group, SimpleGrid, Skeleton, Stack } from "@mantine/core";

export default function AdminSettingsSkeleton() {
  return (
    <Stack gap="md" pos="relative">
      {/* Header Skeleton */}
      <GlassPanel p={{ base: "sm", sm: "md" }}>
        <Group align="center" wrap="nowrap" gap="sm">
          <Skeleton height={36} width={36} radius="md" opacity={0.15} />
          <Stack gap={6} style={{ minWidth: 0 }}>
            <Skeleton height={24} width={200} radius="sm" opacity={0.15} />
            <Skeleton height={12} width={300} radius="sm" opacity={0.15} />
          </Stack>
        </Group>
      </GlassPanel>

      {/* Form Content Skeleton */}
      <GlassPanel p={{ base: "sm", sm: "md", md: "lg" }}>
        <Stack gap="md">
          {/* Section 1: Store Info Header */}
          <Group align="flex-start" wrap="nowrap" gap="sm">
            <Skeleton height={26} width={26} radius="sm" opacity={0.15} />
            <Stack gap={6}>
              <Skeleton height={18} width={140} radius="sm" opacity={0.15} />
              <Skeleton height={12} width={220} radius="sm" opacity={0.15} />
            </Stack>
          </Group>

          {/* Section 1 Inputs Grid */}
          <SimpleGrid
            cols={{ base: 1, sm: 2, lg: 3 }}
            spacing="md"
            px={{ base: 0, sm: "xs", md: "md" }}
          >
            <Skeleton height={38} radius="md" opacity={0.15} />
            <Skeleton height={38} radius="md" opacity={0.15} />
            <Skeleton height={38} radius="md" opacity={0.15} />
          </SimpleGrid>

          <HorizontalDivider my="xs" />

          {/* Section 2: Shipping Rules Header */}
          <Group align="flex-start" wrap="nowrap" gap="sm">
            <Skeleton height={26} width={26} radius="sm" opacity={0.15} />
            <Stack gap={6}>
              <Skeleton height={18} width={130} radius="sm" opacity={0.15} />
              <Skeleton height={12} width={200} radius="sm" opacity={0.15} />
            </Stack>
          </Group>

          {/* Section 2 Inputs Grid */}
          <SimpleGrid
            cols={{ base: 1, sm: 2, lg: 3 }}
            spacing="md"
            px={{ base: 0, sm: "xs", md: "md" }}
          >
            <Skeleton height={38} radius="md" opacity={0.15} />
            <Skeleton height={38} radius="md" opacity={0.15} />
          </SimpleGrid>

          <HorizontalDivider my="xs" />

          {/* Footer Actions */}
          <Group
            justify="space-between"
            align="center"
            px={{ base: 0, sm: "xs", md: "md" }}
            wrap="wrap-reverse"
            gap="md"
          >
            <Group gap="xs" w={{ base: "100%", sm: "auto" }}>
              <Skeleton height={36} width={70} radius="md" opacity={0.15} />
              <Skeleton height={36} width={100} radius="md" opacity={0.15} />
            </Group>
            <Skeleton height={14} width={180} radius="sm" opacity={0.15} />
          </Group>
        </Stack>
      </GlassPanel>
    </Stack>
  );
}
