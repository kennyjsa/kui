/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ["@kui/core", "@kui/forms", "@kui/theme", "@kui/ui", "@kui/zod-extension"],

  // Configurações experimentais para resolver WasmHash
  /*experimental: {
    webpackBuildWorker: false,
    esmExternals: false,
  },*/

  // Configuração webpack para resolver WasmHash definitivamente
  webpack: (config, { dev, isServer }) => {
    // Desabilita TODOS os tipos de cache
    config.cache = false;

    // Desabilita cache de filesystem
    if (config.infrastructureLogging) {
      config.infrastructureLogging.level = "error";
    }

    // Configurações específicas para resolver WasmHash
    config.snapshot = {
      managedPaths: [],
      immutablePaths: [],
      buildDependencies: {
        hash: false,
        timestamp: false,
      },
      module: {
        timestamp: false,
        hash: false,
      },
      resolve: {
        timestamp: false,
        hash: false,
      },
      resolveBuildDependencies: {
        hash: false,
        timestamp: false,
      },
    };

    // Desabilita otimizações que podem causar problemas
    config.optimization = {
      ...config.optimization,
      removeAvailableModules: false,
      removeEmptyChunks: false,
      splitChunks: false,
    };

    // Fallbacks básicos para Node.js
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

  // Configurações básicas
  //swcMinify: false,
  poweredByHeader: false,

  // Desabilita cache de build
  generateBuildId: async () => {
    return "build-" + Date.now();
  },
};

module.exports = nextConfig
