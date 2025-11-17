import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx"],
  async redirects() {
    return [
      {
        source: "/",
        destination: "/hu",
        permanent: false,
      },
      {
        source: "/about",
        destination: "/hu/about",
        permanent: false,
      },
      {
        source: "/blog",
        destination: "/hu/blog",
        permanent: false,
      },
      {
        source: "/contact",
        destination: "/hu/contact",
        permanent: false,
      },
      // Also handle blog slugs
      {
        source: "/blog/:slug",
        destination: "/hu/blog/:slug",
        permanent: false,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
