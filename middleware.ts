import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { locales } from "./src/i18n/request";

function getLocaleFromAcceptLanguage(acceptLanguage: string | null): string {
  if (!acceptLanguage) return "en";

  // Parse Accept-Language header
  const languages = acceptLanguage
    .split(",")
    .map((lang) => {
      const [locale, q = "1"] = lang.trim().split(";q=");
      return {
        locale: locale.split("-")[0], // Get language code (e.g., 'en' from 'en-US')
        quality: parseFloat(q),
      };
    })
    .sort((a, b) => b.quality - a.quality);

  // Check if any preferred language matches our supported locales
  for (const lang of languages) {
    if (locales.includes(lang.locale as any)) {
      return lang.locale;
    }
  }

  return "en"; // Default fallback
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for API routes, static files, etc.
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return;
  }

  // If accessing root path without locale prefix, redirect based on Accept-Language
  if (pathname === "/") {
    const acceptLanguage = request.headers.get("accept-language");
    const detectedLocale = getLocaleFromAcceptLanguage(acceptLanguage);

    // Redirect to the detected locale
    const url = request.nextUrl.clone();
    url.pathname = `/${detectedLocale}`;
    return NextResponse.redirect(url);
  }

  // For all other paths, use next-intl middleware
  return createMiddleware({
    locales,
    defaultLocale: "en",
    localeDetection: false, // We handle detection manually above
  })(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
