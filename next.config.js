/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 70000,
        }
      }
    }
    return config
  },
  // Enable progressive web app
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['react-icons', '@heroicons/react']
  }
}

module.exports = nextConfig
