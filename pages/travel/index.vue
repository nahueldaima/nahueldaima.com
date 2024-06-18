<script lang="ts" setup>
const { locale } = useI18n()
const { data } = await useAsyncData('recent-post', () =>
  queryContent(`/${locale.value}/travel/`).limit(3).sort({ _id: -1 }).find(),
)
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
