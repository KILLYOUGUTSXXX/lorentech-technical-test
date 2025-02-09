// const nodeExternals = require('webpack-node-externals')

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    removeConsole: false
  },
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  webpack: (config, { isServer }) => {
    if (isServer)
      config.externals.push({
        'utf-8-validate': 'commonjs utf-8-validate',
        bufferutil: 'commonjs bufferutil'
      })

    config.snapshot = {
      ...(config.snapshot ?? {}),
      managedPaths: [/^(.+?[\\/]node_modules[\\/])(?!@next)/]
    }
    
    return config
  },
  typescript: {
    ignoreBuildErrors: true
  },
  // cleanDistDir: true,
  distDir: 'dist',
  images: {
    domains: []
  },
  env: {
    MAIN_API_HOST: 'http://localhost:6758'
  },
  async rewrites() {
    return {}
  }
}

module.exports = nextConfig
