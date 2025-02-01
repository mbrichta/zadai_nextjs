/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  i18n: {
    locales: ["en", "es", "de"],
    defaultLocale: "en",
    // optional: localeDetection: false,
  },
};

module.exports = nextConfig;
