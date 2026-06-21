import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { headers } from "next/headers";
import { LocaleProvider } from "@/context/LocaleContext";
import { detectLocaleFromAcceptLanguage } from "@/lib/i18n";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.santeseart.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  title: "Santese Art - Ebanisteria & Falegnameria Artistica",
  description:
    "Santese Art — L'arte di saper intagliare il legno. Ebanisteria e falegnameria artistica di Rocco Santese a Oria (BR). Specializzati in intaglio, intarsio, restauro di oggetti antichi d'arte e manufatti artigianali su misura.",
  openGraph: {
    title: "Santese Art - Ebanisteria & Falegnameria Artistica",
    description:
      "Santese Art — L'arte di saper intagliare il legno. Ebanisteria e falegnameria artistica di Rocco Santese a Oria (BR). Specializzati in intaglio, intarsio, restauro di oggetti antichi d'arte e manufatti artigianali su misura.",
    url: siteUrl,
    siteName: "Santese Art",
    locale: "it_IT",
    type: "website",
    images: [
      {
        url: "/og-image.jpg?v=9",
        width: 1200,
        height: 630,
        alt: "Santese Art — rosa",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Santese Art - Ebanisteria & Falegnameria Artistica",
    description:
      "Santese Art — L'arte di saper intagliare il legno. Ebanisteria e falegnameria artistica di Rocco Santese a Oria (BR). Specializzati in intaglio, intarsio, restauro di oggetti antichi d'arte e manufatti artigianali su misura.",
    images: ["/og-image.jpg?v=9"],
  },
  icons: {
    icon: [
      { url: "/icon-rose-black.png", sizes: "512x512", type: "image/png" },
      { url: "/icon-rose-black.svg", type: "image/svg+xml" },
    ],
    apple: "/icon-rose-black.png",
  },
  other: {
    google: "notranslate",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const locale = detectLocaleFromAcceptLanguage(headersList.get("accept-language"));

  return (
    <html
      lang={locale}
      translate="no"
      suppressHydrationWarning
      className={`notranslate ${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased minimal-scrollbar`}
    >
      <body className="min-h-full flex flex-col bg-white text-black">
        <LocaleProvider initialLocale={locale}>{children}</LocaleProvider>
      </body>
    </html>
  );
}
