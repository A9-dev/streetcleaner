import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        port: '',
        pathname: '/**',
      },

      {
        protocol: 'https',
        hostname: 'external-content.duckduckgo.com',
        port: '',
        pathname: '/iu/**',
      },
      {
        protocol: 'https',
        hostname: 'jwjeuqbkksddragbdbue.supabase.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://127.0.0.1:8000/api/:path*',
      },
    ];
  },

};

export default nextConfig;
