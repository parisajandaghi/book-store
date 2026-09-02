import { useUser } from "@/features/profile/hook/use-user";
import { CartItem } from "../cart.type";
import useSWR from "swr";
import { useRouter } from "@/navigation";
import { notifications } from "@mantine/notifications";

const fetcher = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || "خطا در دریافت اطلاعات سبد خرید");
  }

  return response.json();
};

export const useCart = () => {
  const { user } = useUser();
  const router = useRouter();

  const {
    data: cartItems = [],
    error,
    isLoading,
    mutate,
  } = useSWR<CartItem[]>(user ? "/api/cart" : null, fetcher);

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const addToCart = async (
    bookId: number,
    quantity: number = 1,
  ): Promise<boolean> => {
    
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId, quantity }),
      });

      const data = await res.json().catch(() => ({}));

      // نمایش نوتیفیکیشن در صورت کمبود موجودی یا هر خطای دیگر
      if (!res.ok) {
        notifications.show({
          color: "red",
          title: "محدودیت موجودی",
          message: data.error || "خطا در افزودن به سبد خرید.",
        });
        return false;
      }

      await mutate(); // رفرش کش
      return true;
    } catch (err) {
      console.error(err);
      notifications.show({
        color: "red",
        title: "خطا",
        message: "خطا در ارتباط با سرور.",
      });
      return false;
    }
  };

  const increaseQuantity = async (
    itemId: number,
    currentQuantity: number,
  ): Promise<boolean> => {
    try {
      const response = await fetch("/api/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemId,
          quantity: currentQuantity + 1,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        notifications.show({
          color: "red",
          title: "محدودیت موجودی",
          message: data.error || "امکان افزایش تعداد بیشتر وجود ندارد.",
        });
        return false;
      }

      await mutate();
      return true;
    } catch {
      notifications.show({
        color: "red",
        title: "خطا",
        message: "خطایی در به‌روزرسانی تعداد رخ داد.",
      });
      return false;
    }
  };

  const decreaseQuantity = async (
    itemId: number,
    currentQuantity: number,
  ): Promise<boolean> => {
    if (currentQuantity <= 1) {
      return await removeFromCart(itemId);
    }

    try {
      const response = await fetch("/api/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemId,
          quantity: currentQuantity - 1,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        notifications.show({
          color: "red",
          title: "خطا",
          message: data.error || "خطا در کاهش تعداد محصول.",
        });
        return false;
      }

      await mutate();
      return true;
    } catch {
      notifications.show({
        color: "red",
        title: "خطا",
        message: "خطا در ارتباط با سرور.",
      });
      return false;
    }
  };

  const removeFromCart = async (itemId: number): Promise<boolean> => {
    try {
      const response = await fetch(`/api/cart?id=${itemId}`, {
        method: "DELETE",
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        notifications.show({
          color: "red",
          title: "خطا",
          message: data.error || "خطا در حذف آیتم از سبد خرید.",
        });
        return false;
      }

      await mutate();
      return true;
    } catch {
      notifications.show({
        color: "red",
        title: "خطا",
        message: "خطا در حذف آیتم.",
      });
      return false;
    }
  };

  return {
    cartItems,
    cartTotal,
    cartCount,
    isLoading,
    error,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  };
};
