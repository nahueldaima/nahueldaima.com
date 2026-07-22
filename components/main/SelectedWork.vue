<script lang="ts" setup>
// Hand-picked case studies for the homepage. Add a slug here to feature a new one.
const CASE_STUDIES = [
  'scaling-your-infrastructure-at-low-cost-with-aws-lambdas',
]

const { locale } = useI18n()

const { data } = await useAsyncData(`selected-work-${locale.value}`, () => {
  return Promise.all(
    CASE_STUDIES.map(slug => queryContent(`/${locale.value}/tech/${slug}`).findOne()),
  )
}, {
  watch: [locale],
})

const formattedData = computed(() => {
  return (data.value || []).filter(Boolean).map((articles) => {
    return {
      path: articles._path,
      title: articles.title || 'no-title available',
      description: articles.description || 'no-description available',
      image: articles.image || '/not-found.jpg',
      alt: articles.alt || 'no alter data available',
      ogImage: articles.ogImage || '/not-found.jpg',
      date: articles.date || 'not-date-available',
      tags: articles.tags || [],
      published: articles.published || false,
    }
  })
})
</script>

<template>
  <div class="pb-10 px-4">
    <div class="flex flex-row items-center space-x-3 pt-5 pb-3">
      <Icon name="mdi:star-three-points-outline" size="2em" class="text-black dark:text-white" />
      <h2 class="text-4xl font-semibold text-black dark:text-white">
        Selected Work
      </h2>
    </div>

    <div class="grid grid-cols-1">
      <template v-for="post in formattedData" :key="post.path">
        <ArchiveCard
          :path="post.path"
          :title="post.title"
          :date="post.date"
          :description="post.description"
          :image="post.image"
          :alt="post.alt"
          :og-image="post.ogImage"
          :tags="post.tags"
          :published="post.published"
        />
      </template>
    </div>
  </div>
</template>
