"use client";

import { checkoutAtom } from "@/store/checkout-atom";
import { generateDeliveryDates } from "@/utils/checkout.utils";
import { ActionIcon, Box, Flex, Group, Stack, Text } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import useEmblaCarousel from "embla-carousel-react";
import { useAtom } from "jotai";
import { useLocale } from "next-intl";
import { useMemo } from "react";
import style from "../../carts/cart.module.css";
const TIME_SLOTS = [
  { id: "1", label: "09:00 - 12:00" },
  { id: "2", label: "12:00 - 15:00" },
  { id: "3", label: "15:00 - 18:00" },
  { id: "4", label: "18:00 - 21:00" },
];
export default function ShippingDatePicker() {
  const [checkout, setCheckout] = useAtom(checkoutAtom);
  const currentLocale = useLocale();

  const locale = currentLocale === "fa" ? "fa-IR" : "en-US";

  const deliveryDates = useMemo(() => {
    return generateDeliveryDates(locale, 10);
  }, [locale]);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    direction: currentLocale === "fa" ? "rtl" : "ltr",

    align: "start",
    containScroll: "trimSnaps",
    slidesToScroll: 1,
    dragFree: false,
  });
  const deliveryDate = checkout.deliveryDate;
  const deliverTime = checkout.deliveryTime;
  return (
    <Stack gap={0}>
      <Flex gap={3} align="center" p={"sm"}>
        <ActionIcon
          size={40}
          h={58}
          radius="md"
          bg={"#1f0f1fa8"}
          onClick={() => emblaApi?.scrollPrev()}
        >
          {currentLocale === "fa" ? (
            <IconChevronRight size={16} color="#d4af37" />
          ) : (
            <IconChevronLeft size={16} color="#d4af37" />
          )}
        </ActionIcon>

        <Box
          ref={emblaRef}
          style={{
            overflow: "hidden",
            flex: 1,
          }}
        >
          <Box
            style={{
              display: "flex",
            }}
          >
            {deliveryDates.map((date) => {
              const active = deliveryDate === date.id;

              return (
                <Box
                  key={date.id}
                  style={{
                    // 3 اسلاید در موبایل کوچک، 4 اسلاید در تبلت، 6 اسلاید در دسکتاپ
                    flex: "0 0 clamp(28%, 20%, 16.666%)",
                    minWidth: 0,
                    paddingInline: 3,
                  }}
                  className={style.dateSlideItem} // یا اعمال استایل ریسپانسیو
                >
                  <Box
                    onClick={() =>
                      setCheckout((prev) => ({
                        ...prev,
                        deliveryDate: date.id,
                      }))
                    }
                    className={style.dateCard}
                    data-active={active}
                  >
                    <Stack gap={2} align="center">
                      <Text
                        size="10px"
                        fw={500}
                        c={"textMain.0"}
                        ff={
                          currentLocale === "en"
                            ? "system-ui, sans-serif"
                            : "inherit"
                        }
                      >
                        {date.dayOfWeek}
                      </Text>

                      <Group gap={3}>
                        <Text
                          size="11px"
                          fw={500}
                          c={"textMain.0"}
                          ff={
                            currentLocale === "en"
                              ? "system-ui, sans-serif"
                              : "inherit"
                          }
                        >
                          {date.dayOfMonth}
                        </Text>
                        <Text
                          size="11px"
                          fw={500}
                          c={"textMain.0"}
                          ff={
                            currentLocale === "en"
                              ? "system-ui, sans-serif"
                              : "inherit"
                          }
                        >
                          {date.month}
                        </Text>
                      </Group>
                    </Stack>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>

        <ActionIcon
          size={40}
          h={58}
          radius="md"
          bg={"#1f0f1fa8"}
          onClick={() => emblaApi?.scrollNext()}
        >
          {currentLocale === "fa" ? (
            <IconChevronLeft size={16} color="#d4af37" />
          ) : (
            <IconChevronRight size={16} color="#d4af37" />
          )}
        </ActionIcon>
      </Flex>
      <Group gap={10} justify="center" p={"sm"}>
        <Group
          gap="xs"
          justify="center"
          p={{ base: "xs", sm: "sm" }}
          wrap="wrap"
        >
          {TIME_SLOTS.map((slot) => {
            const isActive = deliverTime === slot.id;

            return (
              <Box
                key={slot.id}
                className={style.timeSlot}
                data-active={isActive}
                style={{ fontSize: "12px", padding: "6px 10px" }}
                onClick={() =>
                  setCheckout((prev) => ({
                    ...prev,
                    deliveryTime: slot.id,
                  }))
                }
                ff={
                  currentLocale === "en" ? "system-ui, sans-serif" : "inherit"
                }
              >
                {slot.label}
              </Box>
            );
          })}
        </Group>
      </Group>
    </Stack>
  );
}
