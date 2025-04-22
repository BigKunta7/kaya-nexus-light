/** @type {import('next').NextConfig} */
const config = {
  // Configuration pour next-international
  // Pas besoin de configuration i18n spécifique car géré par le middleware
  allowedDevOrigins: ['http://127.0.0.1:64615', 'http://localhost:3000'],
};

export default config;
