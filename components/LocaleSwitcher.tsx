"use client";

import { useLocale } from "@/context/LocaleContext";
import type { Locale } from "@/lib/i18n";

const locales: Locale[] = ["it", "en"];

export function LocaleSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <div
      className="locale-switcher flex items-center rounded-full border border-gray-200 p-0.5 text-xs font-medium tracking-wider"
      role="group"
      aria-label="Language"
    >
      {locales.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          className={`locale-switcher-btn px-2.5 py-1 rounded-full uppercase transition-colors ${
            locale === code ? "locale-switcher-btn-active" : ""
          }`}
          aria-pressed={locale === code}
        >
          {code}
        </button>
      ))}
    </div>
  );
}
