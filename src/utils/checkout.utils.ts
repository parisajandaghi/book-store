export const generateDeliveryDates = (locale: string, daysCount :number) => {
  const dates = [];
  const today = new Date();

  for (let i = 0; i < daysCount; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);

    dates.push({
      id: nextDate.toISOString(),
      dayOfWeek: new Intl.DateTimeFormat(locale, {
        weekday: "long",
      }).format(nextDate),

      dayOfMonth: new Intl.DateTimeFormat(locale, {
        day: "numeric",
      }).format(nextDate),

      month: new Intl.DateTimeFormat(locale, {
        month: "long",
      }).format(nextDate),

      isToday: i === 0,
    });
  }

  return dates;
};
