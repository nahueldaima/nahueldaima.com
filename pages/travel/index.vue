<script lang="ts" setup>
const { locale } = useI18n()

const key = ref(Math.random().toString(36).substring(7))

const { data: articles, error, refresh } = await useAsyncData('travel-post', () => {
  return queryContent(`/${locale.value}/travel/`).limit(3).sort({ _id: -1 }).find()
},
{
  watch: [key],
})

onMounted(() => {
  refresh()
})

if (error && error.value)
  navigateTo('/404')

const data = computed(() => {
  return articles?.value || []
})
</script>

<template>
  <div :key="key">
    <BlogArticles
      :key="locale"
      :all-articles="data"
      :locale="locale"
      :title="$t('travel.title')"
      :meta-description="$t('travel.metaDescription')"
      :meta-content="$t('travel.metaContent')"
    />
  </div>
</template>
