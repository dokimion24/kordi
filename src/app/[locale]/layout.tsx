import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { ThemeProvider } from "@/shared/lib/react/theme-provider";
import { routing } from "@/shared/config/i18n/routing";
import { RippleBackground } from "@/shared/ui/ripple-background";
import { QueryProvider } from "@/shared/lib/react/query-provider";
import "../globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kordi",
  description: "Piano web service",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="relative min-h-full flex flex-col overflow-x-hidden">
        <ThemeProvider defaultTheme="light">
          {/* Background gradient blobs */}
          <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute -left-32 -top-32 h-[700px] w-[700px] rounded-full bg-[oklch(0.85_0.08_155)] opacity-15 blur-[100px] dark:bg-[oklch(0.35_0.06_155)] dark:opacity-30" />
            <div className="absolute -bottom-32 -right-32 h-[600px] w-[600px] rounded-full bg-[oklch(0.85_0.06_280)] opacity-12 blur-[90px] dark:bg-[oklch(0.3_0.04_280)] dark:opacity-25" />
            <div className="absolute left-1/3 top-1/3 h-[500px] w-[500px] rounded-full bg-[oklch(0.88_0.06_60)] opacity-10 blur-[80px] dark:bg-[oklch(0.32_0.04_40)] dark:opacity-20" />
          </div>
          <QueryProvider>
            <NextIntlClientProvider messages={messages}>
              <RippleBackground>
                {children}
              </RippleBackground>
            </NextIntlClientProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
