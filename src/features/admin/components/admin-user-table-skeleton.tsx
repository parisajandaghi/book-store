import { Skeleton, Stack, Table } from "@mantine/core";

interface AdminUserTableSkeletonProps {
  rowsCount?: number;
}

export default function AdminUserTableSkeleton({
  rowsCount = 5,
}: AdminUserTableSkeletonProps) {
  return (
    <Table.ScrollContainer minWidth={640} maxHeight={360}>
      <Table
        layout="fixed"
        verticalSpacing="sm"
        borderColor="rgba(255, 255, 255, 0.08)"
      >
        <Table.Thead>
          <Table.Tr
            style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}
          >
            <Table.Th style={{ width: "35%" }}>
              <Skeleton opacity={0.15} height={14} width="40%" radius="sm" />
            </Table.Th>
            <Table.Th style={{ width: "15%" }}>
              <Skeleton
                opacity={0.15}
                height={14}
                width="50%"
                mx="auto"
                radius="sm"
              />
            </Table.Th>
            <Table.Th style={{ width: "15%" }}>
              <Skeleton
                opacity={0.15}
                height={14}
                width="50%"
                mx="auto"
                radius="sm"
              />
            </Table.Th>
            <Table.Th style={{ width: "23%" }}>
              <Skeleton
                opacity={0.15}
                height={14}
                width="60%"
                mx="auto"
                radius="sm"
              />
            </Table.Th>
            <Table.Th style={{ width: "12%" }}>
              <Skeleton
                opacity={0.15}
                height={14}
                width="40%"
                mx="auto"
                radius="sm"
              />
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {Array.from({ length: rowsCount }).map((_, index) => (
            <Table.Tr
              key={index}
              style={{
                borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
              }}
            >
              {/* User Details */}
              <Table.Td>
                <Stack gap={6}>
                  <Skeleton
                    opacity={0.15}
                    height={14}
                    width="60%"
                    radius="sm"
                  />
                  <Skeleton
                    opacity={0.15}
                    height={10}
                    width="80%"
                    radius="sm"
                  />
                </Stack>
              </Table.Td>

              {/* Role Badge */}
              <Table.Td>
                <Skeleton
                  opacity={0.15}
                  height={20}
                  width={65}
                  mx="auto"
                  radius="xl"
                />
              </Table.Td>

              {/* Orders Count */}
              <Table.Td>
                <Skeleton
                  opacity={0.15}
                  height={14}
                  width={24}
                  mx="auto"
                  radius="sm"
                />
              </Table.Td>

              {/* Joined Date */}
              <Table.Td>
                <Skeleton
                  opacity={0.15}
                  height={12}
                  width={120}
                  mx="auto"
                  radius="sm"
                />
              </Table.Td>

              {/* Action Button */}
              <Table.Td>
                <Skeleton
                  opacity={0.15}
                  height={26}
                  width={26}
                  mx="auto"
                  radius="md"
                />
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
