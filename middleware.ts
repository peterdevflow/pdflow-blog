import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["hu", "en"],
  defaultLocale: "hu",
  localePrefix: "always",
});

export const config = {
  matcher: [
    /*
     * Match all paths except static assets
     */
    "/((?!_next|api|favicon.ico).*)",
  ],
};
