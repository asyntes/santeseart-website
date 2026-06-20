import { messagesIt } from "./messages/it";
import { messagesEn } from "./messages/en";

export type Locale = "it" | "en";

export const LOCALE_STORAGE_KEY = "santeseart-locale";

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "it" || value === "en";
}
export type Messages = typeof messagesIt | typeof messagesEn;

export const messages: Record<Locale, Messages> = {
  it: messagesIt,
  en: messagesEn,
};

export function detectLocaleFromLanguage(language: string): Locale {
  return language.toLowerCase().startsWith("it") ? "it" : "en";
}

export function detectLocaleFromNavigator(): Locale {
  if (typeof navigator === "undefined") return "it";
  return detectLocaleFromLanguage(navigator.language);
}

export function detectLocaleFromAcceptLanguage(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return "en";
  const primary = acceptLanguage.split(",")[0]?.trim().split(";")[0] ?? "";
  return detectLocaleFromLanguage(primary);
}
