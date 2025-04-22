/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { appDir: true },
  i18n: {
    locales: ['fr-FR', 'en-US', 'gwp' /* , …autres langues */],
    defaultLocale: 'fr-FR',
    localeDetection: true
  }
};

module.exports = nextConfig;
