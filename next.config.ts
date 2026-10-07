import type { NextConfig } from 'next';

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=31536000' },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  serverExternalPackages: ['imagekit'],
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'ik.imagekit.io', pathname: '/**' }],
  },
  async redirects() {
    return [
      { source: '/blog', destination: '/insights', permanent: true },
      { source: '/blog/:slug', destination: '/insights/:slug', permanent: true },
    ];
  },
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      { source: '/admin', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
      { source: '/admin/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
    ];
  },
};

export default nextConfig;