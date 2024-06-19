<script lang="ts" setup>
const { locale } = useI18n()

const key = ref()

const { data: articles, error } = await useAsyncData(`tech-post-${key}`, () => {
  return queryContent(`/${locale.value}/tech/`).limit(3).sort({ _id: -1 }).find()
})

if (error && error.value)
  navigateTo('/404')

const data = computed(() => {
  return articles?.value || []
})
</script>

<template>
  <BlogArticles
    :key="key"
    :all-articles="data"
    :locale="locale"
    :title="$t('tech.title')"
    :meta-description="$t('tech.metaDescription')"
    :meta-content="$t('tech.metaContent')"
  />
</template>
