import createMiddleware from 'next-intl/middleware';
import { locales } from './src/i18n/request';

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale: 'hu',

  // Automatically detect the user's locale based on:
  // 1. The `locale` URL parameter (e.g. `/en/about`)
  // 2. A cookie named `NEXT_LOCALE`
  // 3. The `Accept-Language` header
  localeDetection: true
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(hu|en)/:path*']
};