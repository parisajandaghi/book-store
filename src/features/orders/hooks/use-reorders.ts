import { useState } from "react";
import { useSWRConfig } from "swr";
import { useRouter } from "@/navigation";
import { notifications } from "@mantine/notifications";
import { OrderItem } from "../order-item.type";

export const useReOrder = () => {
  const [isReordering, setIsReordering] = useState(false);
  const { mutate } = useSWRConfig();
  const router = useRouter();

  const reorder = async (items: OrderItem[]): Promise<boolean> => {
    if (!items || items.length === 0) {
      notifications.show({
        color: "yellow",
        title: "خطا",
        message: "هیچ آیتمی برای خرید مجدد یافت نشد.",
      });
      return false;
    }

    setIsReordering(true);

    try {
      // ارسال درخواست افزودن به سبد با تعداد واقعی هر آیتم
      const results = await Promise.allSettled(
        items.map(async (item) => {
          const response = await fetch("/api/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              bookId: item.book_id,
              quantity: item.quantity, // ارسال دقیق تعداد سفارش قبلی
            }),
          });

          if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(errData.error || `خطا در افزودن کتاب ${item.title || item.book_id}`);
          }

          return response.json();
        })
      );

      // بررسی موفقیت یا شکست آیتم‌ها
      const failed = results.filter((r) => r.status === "rejected");
      const succeeded = results.filter((r) => r.status === "fulfilled");

      // به‌روزرسانی کش سبد خرید
      await mutate("/api/cart");

      if (failed.length === 0) {
        notifications.show({
          color: "teal",
          title: "خرید مجدد موفق",
          message: "تمامی اقلام سفارش به سبد خرید شما اضافه شدند.",
        });
        router.push("/cart");
        return true;
      } else if (succeeded.length > 0) {
        notifications.show({
          color: "yellow",
          title: "افزودن ناقص",
          message: "برخی از اقلام به دلیل اتمام موجودی اضافه نشدند.",
        });
        router.push("/cart");
        return true;
      } else {
        notifications.show({
          color: "red",
          title: "خطا",
          message: "امکان افزودن اقلام به سبد خرید وجود نداشت.",
        });
        return false;
      }
    } catch {
      notifications.show({
        color: "red",
        title: "خطای ارتباط",
        message: "مشکلی در برقراری ارتباط با سرور رخ داد.",
      });
      return false;
    } finally {
      setIsReordering(false);
    }
  };

  return {
    reorder,
    isReordering,
  };
};
