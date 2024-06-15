<script setup lang="ts">
// Get active locale and supported locales
import { useRuntimeConfig } from '#app'

const { locale, locales } = useI18n()
// Cast to avoid TypeScript errors in template
const supportedLocales = locales.value

const router = useRouter()

const config = useRuntimeConfig()
const defaultLocale = config?.i18n?.defaultLocale || 'en'

const computedLocale = computed(() => {
  return locale.value
})

function onLocaleChanged(event: Event) {
  const target = event.target as HTMLInputElement
  // navigate user to the selected locale home page
  const path = defaultLocale === target.value ? '/' : `/${target.value}`
  router.push({ path })
}
</script>

<template>
  <div>
    <select
      v-model="computedLocale"
      class="border-none dark:text-white focus:ring-0 dark:bg-transparent hover:cursor-pointer text-sm sm:text-lg bg-transparent appearance-none"
      @change="onLocaleChanged"
    >
      <option v-for="loc in supportedLocales" :key="loc.code" :value="loc.code">
        {{ loc.name }}
      </option>
    </select>
  </div>
</template>
