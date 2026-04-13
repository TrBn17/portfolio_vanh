/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ESLint tooling conflict from parent node_modules — code is valid
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    domains: ["images.unsplash.com"],
    remotePatterns: [{ protocol: "http", hostname: "localhost" }],
  },
  outputFileTracingRoot: __dirname,
};

module.exports = nextConfig;
