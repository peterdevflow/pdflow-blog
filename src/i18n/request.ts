import { getRequestConfig } from "next-intl/server";

// Can be imported from a shared config
export const locales = ["hu", "en"] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(({ locale }) => ({
  locale: locale || "hu",
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  messages: require(`../messages/${locale || "hu"}.json`),
}));
