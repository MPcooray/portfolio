/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true, // Ensures proper routing for GitHub Pages
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
