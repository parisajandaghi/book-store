import GlassPanel from "@/components/ui/glass/glass-panel";
import { Box, Group, ScrollArea, Skeleton, Stack } from "@mantine/core";

export default function UserOrderCardSkeleton({
  count = 5,
}: {
  count?: number;
}) {
  return (
    <ScrollArea w="100%" type="auto" offsetScrollbars scrollbarSize={6}>
      <Box miw={700} pb="xs">
        <Stack gap="sm">
          {Array.from({ length: count }).map((_, index) => (
            <GlassPanel key={index} w="100%" h={100} p="md">
              <Group
                w="100%"
                align="center"
                justify="space-around"
                h="100%"
                wrap="nowrap"
              >
                <Skeleton height={35} width={35} radius="md" opacity={0.15} />

                <Group flex={1} justify="space-around" wrap="nowrap">
                  <Stack align="center" gap={6}>
                    <Skeleton
                      height={12}
                      width={50}
                      radius="sm"
                      opacity={0.15}
                    />
                    <Skeleton
                      height={14}
                      width={80}
                      radius="sm"
                      opacity={0.2}
                    />
                  </Stack>
                  <Stack align="center" gap={6}>
                    <Skeleton
                      height={12}
                      width={50}
                      radius="sm"
                      opacity={0.15}
                    />
                    <Skeleton
                      height={14}
                      width={100}
                      radius="sm"
                      opacity={0.2}
                    />
                  </Stack>
                  <Stack align="center" gap={6}>
                    <Skeleton
                      height={12}
                      width={50}
                      radius="sm"
                      opacity={0.15}
                    />
                    <Skeleton
                      height={14}
                      width={60}
                      radius="sm"
                      opacity={0.2}
                    />
                  </Stack>
                </Group>

                <Skeleton height={25} width={80} radius="xl" opacity={0.15} />

                <Skeleton height={20} width={20} radius="sm" opacity={0.12} />
              </Group>
            </GlassPanel>
          ))}
        </Stack>
      </Box>
    </ScrollArea>
  );
}
