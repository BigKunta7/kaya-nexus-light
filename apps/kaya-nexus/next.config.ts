/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['fr-FR', 'en-US', 'gwp'],
    defaultLocale: 'fr-FR',
    localeDetection: true,
  },
  /* config options here */
};

module.exports = nextConfig;
