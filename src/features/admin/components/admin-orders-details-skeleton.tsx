import GlassPanel from "@/components/ui/glass/glass-panel";
import { Stack, Group, Skeleton, Grid } from "@mantine/core";

export default function AdminOrdersDetailsSkeleton() {
  return (
    <Stack gap="lg" w="100%" maw={1400} mx="auto" px={{ base: 0, sm: "xs" }}>
      <GlassPanel p={{ base: "sm", sm: "md" }}>
        <Group justify="space-between" align="center" wrap="nowrap">
          <Stack gap={6}>
            <Skeleton height={22} width={180} radius="sm" opacity={0.2} />
            <Group gap="xs">
              <Skeleton height={20} width={80} radius="xl" opacity={0.15} />
              <Skeleton height={14} width={130} radius="sm" opacity={0.12} />
            </Group>
          </Stack>
          <Skeleton height={38} width={38} radius="md" opacity={0.15} />
        </Group>
      </GlassPanel>

      <Grid gutter={{ base: "md", md: "lg" }} align="stretch" w="100%">
        <Grid.Col span={{ base: 12, md: 8 }}>
          <GlassPanel p={{ base: "md", sm: "lg" }} style={{ height: "100%" }}>
            <Skeleton
              height={20}
              width={140}
              radius="sm"
              opacity={0.2}
              mb="lg"
            />
            <Stack gap="md">
              {Array.from({ length: 2 }).map((_, i) => (
                <Group key={i} justify="space-between" wrap="nowrap">
                  <Group gap="sm" wrap="nowrap">
                    <Skeleton
                      height={50}
                      width={36}
                      radius="xs"
                      opacity={0.15}
                      style={{ flexShrink: 0 }}
                    />
                    <div>
                      <Skeleton
                        height={14}
                        width={160}
                        radius="sm"
                        opacity={0.2}
                        mb={6}
                      />
                      <Skeleton
                        height={12}
                        width={80}
                        radius="sm"
                        opacity={0.12}
                      />
                    </div>
                  </Group>
                  <Skeleton height={16} width={70} radius="sm" opacity={0.15} />
                </Group>
              ))}
            </Stack>
          </GlassPanel>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <GlassPanel p={{ base: "md", sm: "lg" }} style={{ height: "100%" }}>
            <Skeleton
              height={20}
              width={120}
              radius="sm"
              opacity={0.2}
              mb="md"
            />
            <Stack gap="md">
              <div>
                <Skeleton
                  height={12}
                  width={60}
                  radius="sm"
                  opacity={0.15}
                  mb={6}
                />
                <Skeleton height={36} width="100%" radius="md" opacity={0.15} />
              </div>
              <div>
                <Skeleton
                  height={12}
                  width={80}
                  radius="sm"
                  opacity={0.15}
                  mb={6}
                />
                <Skeleton height={36} width="100%" radius="md" opacity={0.15} />
              </div>
              <Skeleton
                height={38}
                width="100%"
                radius="md"
                opacity={0.2}
                mt="sm"
              />
            </Stack>
          </GlassPanel>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 8 }}>
          <GlassPanel p={{ base: "md", sm: "lg" }}>
            <Skeleton
              height={20}
              width={130}
              radius="sm"
              opacity={0.2}
              mb="md"
            />
            <Stack gap="sm">
              <Group justify="space-between">
                <Skeleton height={14} width={100} radius="sm" opacity={0.15} />
                <Skeleton height={14} width={80} radius="sm" opacity={0.15} />
              </Group>
              <Group justify="space-between">
                <Skeleton height={14} width={100} radius="sm" opacity={0.15} />
                <Skeleton height={14} width={80} radius="sm" opacity={0.15} />
              </Group>
              <Group justify="space-between" mt="xs">
                <Skeleton height={18} width={120} radius="sm" opacity={0.2} />
                <Skeleton height={18} width={100} radius="sm" opacity={0.2} />
              </Group>
            </Stack>
          </GlassPanel>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <GlassPanel p={{ base: "md", sm: "lg" }}>
            <Skeleton
              height={20}
              width={140}
              radius="sm"
              opacity={0.2}
              mb="md"
            />
            <Stack gap="sm">
              <Skeleton height={14} width="80%" radius="sm" opacity={0.15} />
              <Skeleton height={14} width="90%" radius="sm" opacity={0.15} />
              <Skeleton height={14} width="60%" radius="sm" opacity={0.15} />
              <Skeleton height={14} width="100%" radius="sm" opacity={0.15} />
            </Stack>
          </GlassPanel>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
