<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '#app'
import type { BlogPost } from '@/types/blog'

const props = defineProps({
  articles: {
    type: Object,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
})

const data = computed<BlogPost>(() => {
  return {
    title: props.articles?.title || 'no-title available',
    description: props.articles?.description || 'no-description available',
    image: props.articles?.image || '/not-found.jpg',
    alt: props.articles?.alt || 'no alter data available',
    ogImage: props.articles?.ogImage || '/not-found.jpg',
    date: props.articles?.date || 'not-date-available',
    tags: props.articles?.tags || [],
    published: props.articles?.published || false,
  }
})

useHead({
  title: data.value.title || '',
  meta: [
    { name: 'description', content: data.value.description },
    { property: 'og:site_name', content: 'Nahuel Daima' },
    { hid: 'og:type', property: 'og:type', content: 'website' },
    { property: 'og:url', content: `https://nahueldaima.com${props.path}` },
    { property: 'og:title', content: data.value.title },
    { property: 'og:description', content: data.value.description },
    { property: 'og:image', content: data.value.ogImage || data.value.image },
    { name: 'twitter:site', content: '@qdnvubp' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:url', content: `https://nahueldaima.com${props.path}` },
    { name: 'twitter:title', content: data.value.title },
    { name: 'twitter:description', content: data.value.description },
    { name: 'twitter:image', content: data.value.ogImage || data.value.image },
  ],
  link: [{ rel: 'canonical', href: `https://nahueldaima.com${props.path}` }],
})

defineOgImageComponent('About', {
  headline: data.value.title || '',
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
    </div>
    <div class="container mx-auto max-w-4xl mt-9">
      <div
        class="font-content text-lg text-justify prose prose-zinc dark:prose-invert prose-h1:no-underline prose-h2:no-underline prose-h3:no-underline prose-h4:no-underline prose-a:no-underline prose-h1:font-heading prose-h2:font-heading prose-h3:font-heading prose-h4:font-heading prose-h1:font-normal prose !max-w-none"
      >
        <ContentRenderer v-if="articles" :value="articles" class="w-full">
          <template #empty>
            <p>No content found.</p>
          </template>
        </ContentRenderer>
      </div>
    </div>
  </div>
</template>
