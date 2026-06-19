import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
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

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Santese Art | Ebanisteria & Falegnameria Artistica",
  description: "Ebanisteria e falegnameria artistica di Rocco Santese a Oria (BR). Specializzati in intaglio, intarsio, restauro di oggetti antichi d'arte e manufatti artigianali su misura.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Santese Art - Ebanisteria Artistica",
    description: "Intaglio, intarsio e restauro di oggetti d'arte. Mobili, porte e manufatti artigianali su misura a Oria, Brindisi.",
    images: [{ url: "/og-image.jpg" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-black">{children}</body>
    </html>
  );
}
