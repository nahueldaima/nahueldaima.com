export const seoData = {
  description: 'Nahuel Daima: a technology enthusiast and digital nomad with over a decade of experience in software',
  ogTitle: 'Nahuel Daima: a technology enthusiast and digital nomad with over a decade of experience in software',
  twitterDescription: 'Nahuel Daima: a technology enthusiast and digital nomad with over a decade of experience in software',
  image: 'https://media.bio.site/sites/7356f2d9-1a98-4878-9bc5-dda6d4e1dbc5/FgVJfZc3k6CracH25Mf36Z.jpg',
  mySite: 'https://nahueldaima.com/',
}

export const siteMetaData = [
  {
    name: 'description',
    content: seoData.description,
  },
  // Test on: https://developers.facebook.com/tools/debug/ or https://socialsharepreview.com/
  { property: 'og:site_name', content: seoData.mySite },
  { property: 'og:type', content: 'website' },
  {
    property: 'og:url',
    content: seoData.mySite,
  },
  {
    property: 'og:title',
    content: seoData.ogTitle,
  },
  {
    property: 'og:description',
    content: seoData.description,
  },
  {
    property: 'og:image',
    content: seoData.image,
  },
  // Test on: https://cards-dev.twitter.com/validator or https://socialsharepreview.com/
  { name: 'twitter:site', content: '@leodaima' },
  { name: 'twitter:card', content: 'summary_large_image' },
  {
    name: 'twitter:url',
    content: seoData.mySite,
  },
  {
    name: 'twitter:title',
    content: seoData.ogTitle,
  },
  {
    name: 'twitter:description',
    content: seoData.twitterDescription,
  },
  {
    name: 'twitter:image',
    content: seoData.image,
  },
]
