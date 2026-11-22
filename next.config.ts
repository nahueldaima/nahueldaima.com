import type { NextConfig } from 'next'

const LAMBDAS_POST = 'scaling-your-infrastructure-at-low-cost-with-aws-lambdas'

const nextConfig: NextConfig = {
  // Lint runs separately (`npm run lint`); a lint issue should never block a deploy.
  eslint: { ignoreDuringBuilds: true },
  poweredByHeader: false,
  // app/global-not-found.tsx: one 404 page (with the site layout) for every unknown URL.
  experimental: { globalNotFound: true },
  async redirects() {
    return [
      // Legacy non-prefixed post URL.
      { source: `/tech/${LAMBDAS_POST}`, destination: `/en/tech/${LAMBDAS_POST}`, statusCode: 301 },
      // The travel section was folded into the About page.
      { source: '/travel', destination: '/en/about', statusCode: 301 },
      { source: '/travel/:slug*', destination: '/en/about', statusCode: 301 },
      { source: '/en/travel', destination: '/en/about', statusCode: 301 },
      { source: '/en/travel/:slug*', destination: '/en/about', statusCode: 301 },
      { source: '/es/travel', destination: '/es/about', statusCode: 301 },
      { source: '/es/travel/:slug*', destination: '/es/about', statusCode: 301 },
    ]
  },
}

export default nextConfig
