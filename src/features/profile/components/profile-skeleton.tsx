"use client";

import GlassPanel from "@/components/ui/glass/glass-panel";
import HorizontalDivider from "@/components/ui/elements/horizontal-divider";
import { Container, Flex, Group, Skeleton, Stack, Box } from "@mantine/core";

export default function ProfileSkeleton() {
  return (
    <Container
      w="100%"
      maw="70rem"
      mt={{ base: "md", sm: "xl" }}
      mb={{ base: "xl", sm: "2xl" }}
      px={{ base: "xs", sm: "md" }}
    >
      <GlassPanel
        mih={{ base: "auto", sm: "60vh" }}
        py={{ base: "md", sm: "xl" }}
        px={{ base: "md", sm: "xl" }}
        style={{ opacity: 0.85 }} // شفافیت کلی گلس
      >
        {/* اسکلتون هدر پروفایل (آواتار و اطلاعات) */}
        <Flex
          direction={{ base: "column", sm: "row" }}
          align={{ base: "center", sm: "flex-start" }}
          gap="md"
          w="100%"
        >
          {/* اسکلتون آواتار */}
          <Skeleton height={70} circle style={{ opacity: 0.15, flexShrink: 0 }} />

          <Flex
            direction={{ base: "column", sm: "row" }}
            justify="space-between"
            align={{ base: "stretch", sm: "center" }}
            gap="md"
            style={{ flex: 1, width: "100%" }}
          >
            {/* اسکلتون نام، ایمیل و تلفن */}
            <Flex
              direction="column"
              gap={10}
              align={{ base: "center", sm: "flex-start" }}
            >
              <Skeleton height={24} width={160} radius="sm" style={{ opacity: 0.15 }} />
              <Group gap="xs" justify="center" wrap="nowrap">
                <Skeleton height={18} circle width={18} style={{ opacity: 0.15 }} />
                <Skeleton height={16} width={180} radius="sm" style={{ opacity: 0.15 }} />
              </Group>
              <Group gap="xs" justify="center" wrap="nowrap">
                <Skeleton height={18} circle width={18} style={{ opacity: 0.15 }} />
                <Skeleton height={16} width={140} radius="sm" style={{ opacity: 0.15 }} />
              </Group>
            </Flex>

            {/* اسکلتون دکمه ویرایش */}
            <Box w={{ base: "100%", sm: 120 }} mx={{ base: "auto", sm: 0 }}>
              <Skeleton height={38} radius="md" style={{ opacity: 0.15 }} />
            </Box>
          </Flex>
        </Flex>

        <HorizontalDivider my="lg" />

        {/* اسکلتون بخش عنوان و کارت‌های سفارش */}
        <Box w="100%">
          <Skeleton height={26} width={130} radius="sm" mb="md" style={{ opacity: 0.15 }} />
          
          <Stack gap="sm">
            {Array.from({ length: 3 }).map((_, idx) => (
              <Skeleton
                key={idx}
                height={100}
                radius="md"
                style={{ opacity: 0.15 }}
              />
            ))}
          </Stack>
        </Box>
      </GlassPanel>
    </Container>
  );
}
