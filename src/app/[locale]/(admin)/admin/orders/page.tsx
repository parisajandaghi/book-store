"use client";

import { ScrollArea, Stack } from "@mantine/core";
import GlassPanel from "@/components/ui/glass/glass-panel";
import AdminOrdersHeader from "@/features/admin/components/admin-orders-header";
import { AdminOrdersTable } from "@/features/admin/components/admin-orders-table";
import { useAdminOrders } from "@/features/admin/hooks/use-admin-orders";
import { Order } from "@/features/orders/order.type";
import { adminSearchQueryAtom } from "@/store/admin-atom";
import { notify } from "@/utils/notification";
import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import { useEffect, useMemo } from "react";

export default function AdminOrdersPage() {
  const [searchQuery] = useAtom(adminSearchQueryAtom);
  const { isLoading, error, orders } = useAdminOrders();
  const t = useTranslations("Admin");
  const t1 = useTranslations("Notifications");

  useEffect(() => {
    if (error) {
      notify.error({
        title: t("Orders"),
        message: t1("FetchingOrderMessage"),
      });
    }
  }, [error, t, t1]);

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

  return (
    <Stack gap="md">
      <AdminOrdersHeader />
      <GlassPanel p={{ base: "sm", sm: "md", md: "xl" }} w="100%" mx="auto">
        <ScrollArea h={{ base: 360, sm: 400 }} offsetScrollbars>
          <AdminOrdersTable orders={filteredOrders} isLoading={isLoading} />
        </ScrollArea>
      </GlassPanel>
    </Stack>
  );
}
