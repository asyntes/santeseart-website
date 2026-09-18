"use client";

import Link from "next/link";
import { LogoMonochrome } from "@/components/LogoMonochrome";
import { useLocale } from "@/context/LocaleContext";

export function SiteFooter() {
  const { t } = useLocale();

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col items-center text-center">
        <Link href="/" className="mb-6 inline-flex" aria-label="Santese Art">
          <LogoMonochrome className="h-28 md:h-40 w-auto" />
        </Link>
        <p className="font-serif italic text-lg md:text-xl text-black mb-10 tracking-wide">{t.brand.motto}</p>
        <div className="text-xs text-gray-500 flex flex-col md:flex-row items-center gap-y-3 md:gap-x-6">
          <span>
            © {new Date().getFullYear()} Santese Art — Rocco Santese. {t.footer.rights}
          </span>
          <span className="hidden md:inline">•</span>
          <span>{t.footer.location}</span>
          <span className="hidden md:inline">•</span>
          <Link href="/privacy" className="hover:text-black transition-colors underline-offset-4 hover:underline">
            {t.footer.privacy}
          </Link>
        </div>
      </div>
    </footer>
  );
}
