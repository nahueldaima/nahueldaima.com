<script setup lang="ts">
import type { BlogPost } from '@/types/blog'
import { useRuntimeConfig } from '#app'

const { locale } = useI18n()
const route = useRoute()

const config = useRuntimeConfig()
const defaultLocale = config?.i18n?.defaultLocale || 'en'

const { data: articles, error } = await useAsyncData(`blog-post-${route.path}`, () => {
  // return queryContent(`${route.path}`).findOne()
  // if (locale.value !== defaultLocale)
    return queryContent(`${route.path}`).findOne()
  // else
  //   return queryContent(`/${locale.value}${route.path}`).findOne()
})

if (error && error.value)
  navigateTo('/404')

const data = computed<BlogPost>(() => {
  return {
    title: articles.value?.title || 'no-title available',
    description: articles.value?.description || 'no-description available',
    image: articles.value?.image || '/not-found.jpg',
    alt: articles.value?.alt || 'no alter data available',
    ogImage: articles.value?.ogImage || '/not-found.jpg',
    date: articles.value?.date || '2024-01-01',
    tags: articles.value?.tags || [],
    published: articles.value?.published || false,
  }
})

useHead({
  title: data.value.title || '',
  meta: [
    { name: 'description', content: data.value.description },
    {
      name: 'description',
      content: data.value.description,
    },
    // Test on: https://developers.facebook.com/tools/debug/ or https://socialsharepreview.com/
    { property: 'og:site_name', content: 'Nahuel Daima' },
    { hid: 'og:type', property: 'og:type', content: 'website' },
    {
      property: 'og:url',
      content: `https://nahueldaima.com/${route.path}`,
    },
    {
      property: 'og:title',
      content: data.value.title,
    },
    {
      property: 'og:description',
      content: data.value.description,
    },
    {
      property: 'og:image',
      content: data.value.ogImage || data.value.image,
    },
    // Test on: https://cards-dev.twitter.com/validator or https://socialsharepreview.com/
    { name: 'twitter:site', content: '@leodaima' },
    { name: 'twitter:card', content: 'summary_large_image' },
    {
      name: 'twitter:url',
      content: `https://nahueldaima.com/${route.path}`,
    },
    {
      name: 'twitter:title',
      content: data.value.title,
    },
    {
      name: 'twitter:description',
      content: data.value.description,
    },
    {
      name: 'twitter:image',
      content: data.value.ogImage || data.value.image,
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: `https://nahueldaima.com/${route.path}`,
    },
  ],
})

// Generate OG Image
defineOgImageComponent('About', {
  headline: 'Nahuel Daima - Digital Nomad',
  title: data.value.title || '',
  description: data.value.description || '',
  link: data.value.ogImage,

})
</script>

<template>
  <div class="py-5">
    <div class="container mx-auto max-w-3xl mt-9 px-8">
      <BlogHeader
        :title="data.title" :image="data.image" :alt="data.alt" :date="data.date"
        :description="data.description" :tags="data.tags"
      />
      <div
        class="font-content text-md text-justify text-lg prose prose-zinc dark:prose-invert
      prose-h1:no-underline prose-h2:no-underline prose-h3:no-underline prose-h4:no-underline"
      >
        <ContentRenderer v-if="articles" :value="articles">
          <template #empty>
            <p>No content found.</p>
          </template>
        </ContentRenderer>
      </div>
    </div>
  </div>
</template>
