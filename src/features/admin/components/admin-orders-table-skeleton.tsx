import { Table, Center, Skeleton } from "@mantine/core";

export default function AdminOrdersTableSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <Table.Tr
          key={i}
          style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.04)" }}
        >
          <Table.Td ta="center">
            <Center>
              <Skeleton height={14} width={30} radius="sm" opacity={0.15} />
            </Center>
          </Table.Td>

          <Table.Td ta="center">
            <Center style={{ flexDirection: "column", gap: 4 }}>
              <Skeleton height={14} width={110} radius="sm" opacity={0.2} />
              <Skeleton height={10} width={130} radius="sm" opacity={0.12} />
            </Center>
          </Table.Td>

          <Table.Td ta="center">
            <Center>
              <Skeleton height={14} width={120} radius="sm" opacity={0.15} />
            </Center>
          </Table.Td>

          <Table.Td ta="center">
            <Center>
              <Skeleton height={14} width={75} radius="sm" opacity={0.15} />
            </Center>
          </Table.Td>

          <Table.Td ta="center">
            <Center>
              <Skeleton height={22} width={80} radius="xl" opacity={0.18} />
            </Center>
          </Table.Td>

          <Table.Td ta="center">
            <Center>
              <Skeleton height={14} width={70} radius="sm" opacity={0.15} />
            </Center>
          </Table.Td>

          <Table.Td ta="center">
            <Center>
              <Skeleton height={28} width={28} radius="md" opacity={0.15} />
            </Center>
          </Table.Td>
        </Table.Tr>
      ))}
    </>
  );
}
