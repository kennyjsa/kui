/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: [
    "@kui/core",
    "@kui/forms",
    "@kui/theme",
    "@kui/ui",
    "@kui/zod-extension",
  ],

  // Configuração mínima absoluta
  webpack: (config) => {
    // Desabilita apenas o cache
    config.cache = false;

    // Fallbacks básicos
    config.resolve.fallback = {
      fs: false,
      net: false,
      tls: false,
      crypto: false,
      stream: false,
      util: false,
      buffer: false,
      process: false,
      path: false,
      os: false,
    };

    return config;
  },

  poweredByHeader: false,
};

module.exports = nextConfig
