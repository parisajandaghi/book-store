import { useUser } from "@/features/profile/hook/use-user";
import { notify } from "@/utils/notification";
import { useTranslations } from "next-intl";
import useSWR from "swr";
import { CartItem } from "../cart.type";

const fetcher = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || "خطا در دریافت اطلاعات سبد خرید");
  }

  return response.json();
};

export const useCart = () => {
  const { user, isLoading: isUserLoading } = useUser();
  const t = useTranslations("Notifications");
  const {
    data,
    error,
    isLoading: isCartLoading,
    mutate,
  } = useSWR<CartItem[]>(user ? "/api/cart" : null, fetcher);

  const cartItems = data || [];

  const isLoading =
    isUserLoading ||
    (!!user && isCartLoading) ||
    (!!user && data === undefined && !error);

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

      if (!res.ok) {
        notify.warning({
          title: t("WarningTitle"),
          message: t("StockLimit"),
        });
        return false;
      }

      await mutate();
      notify.success({
        title: t("SuccessTitle"),
        message: t("AddedSuccess"),
      });
      return true;
    } catch (err) {
      console.error(err);
      notify.error({
        title: t("ErrorTitle"),
        message: t("NetworkError"),
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

      if (!response.ok) {
        notify.warning({
          title: t("WarningTitle"),
          message: t("StockLimit"),
        });
        return false;
      }

      await mutate();

      return true;
    } catch {
      notify.error({
        title: t("ErrorTitle"),
        message: t("NetworkError"),
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

      if (!response.ok) {
        notify.error({
          title: t("ErrorTitle"),
          message: t("DecreaseError"),
        });
        return false;
      }

      await mutate();

      return true;
    } catch {
      notify.error({
        title: t("ErrorTitle"),
        message: t("NetworkError"),
      });
      return false;
    }
  };

  const removeFromCart = async (itemId: number): Promise<boolean> => {
    try {
      const response = await fetch(`/api/cart?id=${itemId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        notify.error({
          title: t("ErrorTitle"),
          message: t("RemoveError"),
        });
        return false;
      }

      await mutate();
      notify.success({
        title: t("SuccessTitle"),
        message: t("RemoveSuccess"),
      });
      return true;
    } catch {
      notify.error({
        title: t("ErrorTitle"),
        message: t("NetworkError"),
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
