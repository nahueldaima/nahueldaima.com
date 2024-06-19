<script lang="ts" setup>
const { locale } = useI18n()

const key = ref()

const { data: articles, error } = await useAsyncData(`travel-post-${key}`, () => {
  return queryContent(`/${locale.value}/travel/`).limit(3).sort({ _id: -1 }).find()
})

if (error && error.value)
  navigateTo('/404')

const data = computed(() => {
  return articles?.value || []
})
</script>

<template>
  <BlogArticles
    :key="locale"
    :all-articles="data"
    :locale="locale"
    :title="$t('travel.title')"
    :meta-description="$t('travel.metaDescription')"
    :meta-content="$t('travel.metaContent')"
  />
</template>
