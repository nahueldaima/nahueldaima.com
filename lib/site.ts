export const SITE_URL = 'https://nahueldaima.com'
export const SITE_NAME = 'Nahuel Daima'
export const TWITTER_HANDLE = '@leodaima'

export const SEO = {
  description: 'Nahuel Daima: a technology enthusiast and digital nomad with over a decade of experience in software',
  ogTitle: 'Nahuel Daima: a technology enthusiast and digital nomad with over a decade of experience in software',
  image: 'https://media.bio.site/sites/7356f2d9-1a98-4878-9bc5-dda6d4e1dbc5/FgVJfZc3k6CracH25Mf36Z.jpg',
}

export const LINKS = {
  github: 'https://github.com/nahueldaima',
  linkedin: 'https://www.linkedin.com/in/nahueldaima/?locale=en_US',
  x: 'https://x.com/leodaima',
  bioSite: 'https://bio.site/nahueldaima',
}

/** ConvertKit form ids per locale. */
export const CONVERTKIT_UID = { en: 'ba0d8bc4f0', es: '1b7a2eaa61' } as const

/** Hand-picked case studies for the homepage. Add a tech post slug here to feature it. */
export const CASE_STUDIES = [
  'scaling-your-infrastructure-at-low-cost-with-aws-lambdas',
]

/** localStorage key holding the visitor's cookie choice ('granted' | 'denied'). */
export const CONSENT_STORAGE_KEY = 'cookie-consent'
