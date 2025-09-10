/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    domains: ['www.havacilar.com.tr', 'images.pexels.com']
  },
};

module.exports = nextConfig;