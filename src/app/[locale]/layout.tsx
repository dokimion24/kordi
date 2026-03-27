import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import { routing } from "@/shared/config/i18n/routing";
import { RippleBackground } from "@/shared/ui/ripple-background";
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
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {/* Background gradient blobs */}
          <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            {/* Gradient blobs - visible through glass elements */}
            <div className="absolute -left-32 -top-32 h-[700px] w-[700px] rounded-full bg-[oklch(0.78_0.1_195)] opacity-20 blur-[100px] dark:bg-[oklch(0.35_0.08_195)] dark:opacity-50" />
            <div className="absolute -bottom-32 -right-32 h-[600px] w-[600px] rounded-full bg-[oklch(0.72_0.08_280)] opacity-15 blur-[90px] dark:bg-[oklch(0.28_0.06_270)] dark:opacity-40" />
            <div className="absolute left-1/3 top-1/3 h-[500px] w-[500px] rounded-full bg-[oklch(0.8_0.06_165)] opacity-12 blur-[80px] dark:bg-[oklch(0.3_0.05_220)] dark:opacity-30" />
          </div>
          <NextIntlClientProvider messages={messages}>
            <RippleBackground>
              {children}
            </RippleBackground>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
