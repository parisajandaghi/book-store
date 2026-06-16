import { generateDeliveryDates } from "@/utils/checkout.utils";
import { useLocale } from "next-intl";
import { Carousel } from "@mantine/carousel";
import { Stack, Text } from "@mantine/core";

export default function ShippingDateTimePicker() {
  const currentLocale = useLocale();
  const locale = currentLocale === "fa" ? "fa-IR" : "en-US";
  const deliveryDates = generateDeliveryDates(locale, 7);
  console.log("deliveryDates", deliveryDates);

  return (
    <Carousel
      slideSize="30%"
      withControls
      dir={currentLocale === "fa" ? "rtl" : "ltr"}
    >
      {deliveryDates.map((date) => (
        <Carousel.Slide key={date.id}>
          <Stack gap={"xs"} justify="center" align="center">
            <Text fz={"xs"}>{date.dayOfWeek}</Text>
            <Text fz={"xs"}>{date.dayOfMonth}</Text>
          </Stack>
          
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}
