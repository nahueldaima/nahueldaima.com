import { getPosts } from '@/lib/content'
import { SEO, SITE_NAME, SITE_URL } from '@/lib/site'

// Generated at build time from the published English tech posts (replaces generateRSS.sh).
export const dynamic = 'force-static'

function escape(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function GET() {
  const items = getPosts('en').map(post => `    <item>
      <title>${escape(post.title)}</title>
      <link>${SITE_URL}${post.path}</link>
      <guid isPermaLink="true">${SITE_URL}${post.path}</guid>
      <description>${escape(post.description)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`).join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(SITE_NAME)}</title>
    <link>${SITE_URL}</link>
    <description>${escape(SEO.description)}</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`
  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  })
}
