import { Table, Group, Skeleton, Center } from "@mantine/core";

export default function BooksTableSkeleton() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, i) => (
        <Table.Tr
          key={i}
          style={{
            borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
          }}
        >
          <Table.Td>
            <Group gap="xs" wrap="nowrap">
              <Skeleton
                height={50}
                width={36}
                radius="xs"
                opacity={0.15}
                style={{ flexShrink: 0 }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <Skeleton
                  height={14}
                  width="70%"
                  radius="sm"
                  opacity={0.2}
                  mb={6}
                />
                <Skeleton height={10} width="45%" radius="sm" opacity={0.12} />
              </div>
            </Group>
          </Table.Td>

          <Table.Td ta="center">
            <Center>
              <Skeleton height={14} width={60} radius="sm" opacity={0.15} />
            </Center>
          </Table.Td>

          <Table.Td ta="center">
            <Center>
              <Skeleton height={14} width={45} radius="sm" opacity={0.15} />
            </Center>
          </Table.Td>

          <Table.Td ta="center">
            <Center>
              <Skeleton height={24} width={24} radius="md" opacity={0.15} />
            </Center>
          </Table.Td>
        </Table.Tr>
      ))}
    </>
  );
}
