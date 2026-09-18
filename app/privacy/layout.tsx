import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Informativa privacy | Santese Art",
  description:
    "Informativa sul trattamento dei dati personali e sull'uso di cookie e storage tecnici del sito Santese Art di Rocco Santese.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
