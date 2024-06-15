<script lang="ts" setup>
const { locale } = useI18n()
const { data } = await useAsyncData('recent-post', () =>
  queryContent(`/${locale.value}/tech/`).limit(3).sort({ _id: -1 }).find(),
)
</script>

<template>
  <BlogArticles
    :all-articles="data"
    :locale="locale"
    :title="$t('tech.title')"
    :meta-description="$t('tech.metaDescription')"
    :meta-content="$t('tech.metaContent')"
  />
</template>
