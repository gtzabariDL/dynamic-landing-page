/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/dynamic-landing-page' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/dynamic-landing-page/' : '',
}

module.exports = nextConfig 