import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import "@/styles/globals.css";

import { theme } from "@/styles/theme";
import "@mantine/carousel/styles.css";
import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";

import { Notifications } from "@mantine/notifications";

import localFont from "next/font/local";

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

const IRANSansWeb = localFont({
  src: [
    { path: "../../../public/fonts/woff/IRANSansWeb_Bold.woff", weight: "700" },
    { path: "../../../public/fonts/woff/IRANSansWeb.woff", weight: "400" },
    {
      path: "../../../public/fonts/woff/IRANSansWebFaNum_Bold.woff",
      weight: "700",
    },
    { path: "../../../public/fonts/woff/IRANSansWebFaNum.woff", weight: "400" },
    {
      path: "../../../public/fonts/woff2/IRANSansWeb_Bold.woff2",
      weight: "700",
    },
    { path: "../../../public/fonts/woff2/IRANSansWeb.woff2", weight: "400" },
    {
      path: "../../../public/fonts/woff2/IRANSansWebFaNum_Bold.woff2",
      weight: "700",
    },
    {
      path: "../../../public/fonts/woff2/IRANSansWebFaNum.woff2",
      weight: "400",
    },
  ],
});

export const metadata = {
  title: "Book Store",
  description: "I have followed setup instructions carefully",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!["en", "fa"].includes(locale)) {
    notFound();
  }

  const dir = locale === "fa" ? "rtl" : "ltr";

  const messages = await getMessages();

  return (
    <html lang={locale} dir={dir} {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`${IRANSansWeb.className} appBackground`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <MantineProvider
            theme={{
              ...theme,
              fontFamily: "'IRANSansWeb', 'IRANSansWeb Fallback'",
            }}
          >
            <Notifications
              position="top-center"
              zIndex={2000}
              autoClose={4000}
            />
            {children}
          </MantineProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
