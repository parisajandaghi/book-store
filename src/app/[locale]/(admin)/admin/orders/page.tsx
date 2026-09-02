"use client";

import { Alert, Center, Loader } from "@mantine/core";

import GlassPanel from "@/components/ui/glass/glass-panel";
import AdminOrdersHeader from "@/features/admin/components/admin-orders-header";
import { AdminOrdersTable } from "@/features/admin/components/admin-orders-table";
import { useAdminOrders } from "@/features/admin/hooks/use-admin-orders";
import { Order } from "@/features/orders/order.type";
import { adminSearchQueryAtom } from "@/store/admin-atom";
import { IconAlertCircle } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useMemo } from "react";

export default function AdminOrdersPage() {
  const [searchQuery] = useAtom(adminSearchQueryAtom);

  const { isLoading, error, orders } = useAdminOrders();
  console.log('orders in admin',orders);
  
  const filteredOrders = useMemo(() => {
    if (!orders) return [];
    if (!searchQuery.trim()) return orders;

    const query = searchQuery.toLowerCase();

    return orders.filter((order: Order) => {
      const idMatch = order.id.toString().includes(query);
      const nameMatch = order.customer_name?.toLowerCase().includes(query);
      const emailMatch = order.customer_email?.toLowerCase().includes(query);
      const trackingMatch = order.tracking_code?.toLowerCase().includes(query);

      return idMatch || nameMatch || emailMatch || trackingMatch;
    });
  }, [orders, searchQuery]);
  if (isLoading) {
    return (
      <Center h="70vh">
        <Loader size="lg" variant="dots" color="surface.9" />
      </Center>
    );
  }

  if (error) {
    return (
      <Alert
        icon={<IconAlertCircle size={16} />}
        title="خطا"
        color="red"
        variant="light"
      >
        مشکلی در دریافت اطلاعات سفارش‌ها به وجود آمد.
      </Alert>
    );
  }
  console.log("order", orders);

  return (
    <GlassPanel p="xl">
      <AdminOrdersHeader />
      <AdminOrdersTable orders={filteredOrders} />
    </GlassPanel>
  );
}
