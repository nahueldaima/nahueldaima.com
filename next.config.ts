import type { NextConfig } from 'next'

const LAMBDAS_POST = 'scaling-your-infrastructure-at-low-cost-with-aws-lambdas'

const CSP = [
  'default-src \'self\'',
  // Next.js, next-themes and the GA init snippet are inline scripts; a static site can't use nonces.
  'script-src \'self\' \'unsafe-inline\' https://www.googletagmanager.com https://nahueldaima.ck.page https://f.convertkit.com',
  'style-src \'self\' \'unsafe-inline\' https://nahueldaima.ck.page https://f.convertkit.com',
  'img-src \'self\' data: https:',
  'font-src \'self\' data: https:',
  'connect-src \'self\' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://nahueldaima.ck.page https://api.convertkit.com',
  'frame-src https://nahueldaima.ck.page',
  'form-action \'self\' https://nahueldaima.ck.page https://app.kit.com https://app.convertkit.com',
  'object-src \'none\'',
  'base-uri \'self\'',
  'frame-ancestors \'none\'',
].join('; ')

const SECURITY_HEADERS = [
  { key: 'Content-Security-Policy', value: CSP },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
]

const nextConfig: NextConfig = {
  // Lint runs separately (`npm run lint`); a lint issue should never block a deploy.
  eslint: { ignoreDuringBuilds: true },
  poweredByHeader: false,
  // app/global-not-found.tsx: one 404 page (with the site layout) for every unknown URL.
  experimental: { globalNotFound: true },
  async headers() {
    return [{ source: '/:path*', headers: SECURITY_HEADERS }]
  },
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
