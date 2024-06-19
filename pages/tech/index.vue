<script lang="ts" setup>
const { locale } = useI18n()

const key = ref(Math.random().toString(36).substring(7))

const { data: articles, error, refresh } = await useAsyncData('tech-posts', () => {
  return queryContent(`/${locale.value}/tech/`).limit(3).sort({ _id: -1 }).find()
},
{
  watch: [key],
},
)

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
      :all-articles="data"
      :locale="locale"
      :title="$t('tech.title')"
      :meta-description="$t('tech.metaDescription')"
      :meta-content="$t('tech.metaContent')"
    />
  </div>
</template>
