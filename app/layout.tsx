import type { Metadata } from "next";
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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://santeseart.vercel.app");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Santese Art | Ebanisteria & Falegnameria Artistica",
  description:
    "Ebanisteria e falegnameria artistica di Rocco Santese a Oria (BR). Specializzati in intaglio, intarsio, restauro di oggetti antichi d'arte e manufatti artigianali su misura.",
  openGraph: {
    title: "Santese Art | Ebanisteria & Falegnameria Artistica",
    description:
      "Ebanisteria e falegnameria artistica di Rocco Santese a Oria (BR). Specializzati in intaglio, intarsio, restauro di oggetti antichi d'arte e manufatti artigianali su misura.",
    url: siteUrl,
    siteName: "Santese Art",
    locale: "it_IT",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Santese Art — logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Santese Art | Ebanisteria & Falegnameria Artistica",
    description:
      "Ebanisteria e falegnameria artistica di Rocco Santese a Oria (BR). Specializzati in intaglio, intarsio, restauro di oggetti antichi d'arte e manufatti artigianali su misura.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/logo_santeseart.svg",
    apple: "/og-image.png",
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
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-black">
        <LocaleProvider initialLocale={locale}>{children}</LocaleProvider>
      </body>
    </html>
  );
}
