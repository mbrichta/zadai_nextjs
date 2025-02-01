import { locales, defaultLocale } from "./constants/locales";

export const i18nConfig = {
  locales: locales.map((locale) => locale.locale),
  defaultLocale,
} as const;

export type Locale = (typeof i18nConfig)["locales"][number];
