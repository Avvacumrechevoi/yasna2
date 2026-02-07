import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { SignupModalProvider } from "@/components/forms/SignupModalContext";
import { OrganizationJsonLd, FaqJsonLd } from "@/components/seo/JsonLd";
import { assetUrl } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Русская Ясна — сообщество исследователей русской культуры",
  description:
    "8 направлений: история, литература, астрономия, праздники, здоровье, путешествия, язык, обучение детей. Бесплатно вступить, от 1 часа в неделю.",
  openGraph: {
    title: "Русская Ясна — исследуйте русскую культуру через язык",
    description:
      "Совместные исследования русского языка, истории и архитектуры. 8 направлений, 900+ участников.",
    type: "website",
    locale: "ru_RU",
    // TODO: convert og-image.svg → og-image.png for better social platform support
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Русская Ясна" }],
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://russkaya-yasna.ru"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${inter.variable} ${cormorant.variable}`}>
      <head>
        <link rel="icon" href={assetUrl("/favicon.svg")} type="image/svg+xml" />
        <OrganizationJsonLd />
        <FaqJsonLd />
      </head>
      <body className="bg-bg text-text-primary antialiased font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-gold focus:text-white focus:text-sm focus:font-semibold"
        >
          Перейти к содержимому
        </a>
        <SignupModalProvider>{children}</SignupModalProvider>
      </body>
    </html>
  );
}
