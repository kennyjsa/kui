/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@kui/core', '@kui/forms', '@kui/theme', '@kui/ui', '@kui/zod-extension'],
}

module.exports = nextConfig

