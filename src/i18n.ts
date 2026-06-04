import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

const locales = ["fa", "en"];

export default getRequestConfig(async ({ requestLocale }) => {
  // در نسخه‌های جدید باید requestLocale را await کنید
  const locale = await requestLocale;

  if (!locale || !locales.includes(locale)) {
    notFound();
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
