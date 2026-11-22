
import OrdersClient from "@/features/orders/components/orders-client";
import { getCurrentUser } from "@/lib/auth";
import { getOrderHistory } from "@/services/order.service";


export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const user = await getCurrentUser();

  const initialOrders = user
    ? getOrderHistory(user.id)
    : [];

  return <OrdersClient initialOrders={initialOrders} />;
}
