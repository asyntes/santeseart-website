import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
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
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-black">{children}</body>
    </html>
  );
}
