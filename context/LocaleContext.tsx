"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  detectLocaleFromNavigator,
  messages,
  type Locale,
  type Messages,
} from "@/lib/i18n";

interface LocaleContextValue {
  locale: Locale;
  t: Messages;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: React.ReactNode;
}) {
  const [locale, setLocale] = useState<Locale>(initialLocale);

  useEffect(() => {
    const browserLocale = detectLocaleFromNavigator();
    setLocale(browserLocale);
    document.documentElement.lang = browserLocale;
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, t: messages[locale] }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return context;
}
