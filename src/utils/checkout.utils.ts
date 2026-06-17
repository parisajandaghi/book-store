export const generateDeliveryDates = (locale: string, daysCount: number) => {
  const dates = [];
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < daysCount; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);

    dates.push({
      id: nextDate.toISOString().split("T")[0],

      dayOfWeek: new Intl.DateTimeFormat(locale, { weekday: "short" }).format(
        nextDate,
      ),
      dayOfMonth: new Intl.DateTimeFormat(locale, { day: "numeric" }).format(
        nextDate,
      ),
      month: new Intl.DateTimeFormat(locale, { month: "short" }).format(
        nextDate,
      ),
      isToday: i === 0,
    });
  }

  return dates;
};
