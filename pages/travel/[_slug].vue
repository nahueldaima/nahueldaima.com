<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAsyncData, useRuntimeConfig } from '#app'

const { locale } = useI18n()
const route = useRoute()
const config = useRuntimeConfig()
const defaultLocale = config?.i18n?.defaultLocale || 'en'

const { data: articles, error } = await useAsyncData(`travel-post-${route.path}`, () => {
  if (locale.value !== defaultLocale)
    return queryContent(`${route.path}`).findOne()
  else
    return queryContent(`/${locale.value}${route.path}`).findOne()
})

if (error && error.value) {
  console.error('error', error.value)
  navigateTo('/404')
}
</script>

<template>
  <BlogArticleRender :articles="articles" :path="route.path" />
</template>
