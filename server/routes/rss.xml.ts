import RSS from 'rss'
import { serverQueryContent } from '#content/server'

export default defineEventHandler(async (event) => {
  const feed = new RSS({
    title: 'Nahuel Daima',
    description: 'Hi! I’m Nahuel Daima, Digital nomad and technology enthusiast',
    site_url: 'https://nahueldaima.com',
    feed_url: 'https://nahueldaima.com/rss.xml',
    language: 'en',
  })

  const docs = await serverQueryContent(event).sort({ date: -1 }).where({ _partial: false }).find()
  const blogPosts = docs.filter(doc => doc?._path?.includes('/en/travel') || doc?._path?.includes('/en/tech'))

  for (const doc of blogPosts) {
    feed.item({
      title: doc.title ?? '-',
      url: `https://nahueldaima.com${doc._path}`,
      date: doc.date,
      description: doc.description,
    })
  }

  const feedString = feed.xml({ indent: true })
  event.res.setHeader('content-type', 'text/xml')
  event.res.end(feedString)
})
