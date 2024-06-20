<script setup lang="ts">
// Get active locale and supported locales
import { useRuntimeConfig } from '#app'

const { locale, locales } = useI18n()
// Cast to avoid TypeScript errors in template
const supportedLocales = locales.value

const switchLocalePath = useSwitchLocalePath()

const router = useRouter()

const config = useRuntimeConfig()
const defaultLocale = config?.i18n?.defaultLocale || 'en'

const computedLocale = computed(() => {
  return locale.value
})

function onLocaleChanged(event: Event) {
  const target = event.target as HTMLInputElement
  // navigate user to the selected locale home page
  // const path = defaultLocale === target.value ? '/' : `/${target.value}`
  // router.push({ path })
  router.push({ path: switchLocalePath(target.value) })
}
</script>

<template>
  <div>
    <select
      v-model="computedLocale"
      class="border-none dark:text-white focus:ring-0 dark:bg-black hover:cursor-pointer text-black text-sm sm:text-lg bg-white appearance-none"
      @change="onLocaleChanged"
    >
      <option v-for="loc in supportedLocales" :key="loc.code" :value="loc.code">
        {{ loc.name }}
      </option>
    </select>
  </div>
</template>
