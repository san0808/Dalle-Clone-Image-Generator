/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  webpack: (config, { isServer }) => {
    // Add the dns module as an external
    if (!isServer) {
      config.externals.push('dns');
    }
    return config;
  },
}

module.exports = nextConfig
