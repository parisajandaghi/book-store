import GlassPanel from "@/components/ui/glass/glass-panel";
import { Container, Flex, Skeleton, Stack } from "@mantine/core";

export default function UserOrderDetailsSkeleton() {
  return (
    <Container w="100%" maw="75rem" mt="xl" p={{ base: "xs", sm: "md" }}>
      <GlassPanel p="md">
        <Flex
          direction={{ base: "column", md: "row" }}
          gap="md"
          align="stretch"
        >
          <Stack flex={{ base: "1 1 auto", md: 1 }} gap="lg">
            <Stack gap="sm">
              <Skeleton height={32} width={150} radius="sm" opacity={0.2} />
              <Skeleton height={40} width={120} radius="lg" opacity={0.15} />
              <Skeleton height={14} width={200} radius="sm" opacity={0.12} />
              <Skeleton height={14} width={180} radius="sm" opacity={0.12} />
            </Stack>

            <Stack gap="sm">
              <Skeleton height={20} width={100} radius="sm" opacity={0.15} />
              <Skeleton height={20} width="100%" radius="sm" opacity={0.15} />
              <Skeleton height={20} width="100%" radius="sm" opacity={0.15} />
            </Stack>

            <Skeleton height={40} width="100%" radius="md" opacity={0.2} />
          </Stack>

          <Stack flex={{ base: "1 1 auto", md: 3 }} gap="md">
            <Skeleton height={200} width="100%" radius="md" opacity={0.15} />
            <Skeleton height={150} width="100%" radius="md" opacity={0.15} />
          </Stack>
        </Flex>
      </GlassPanel>
    </Container>
  );
}
