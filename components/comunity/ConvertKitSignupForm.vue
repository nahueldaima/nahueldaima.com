<script setup>
import { onMounted, ref } from 'vue'

const { locale } = useI18n()

const convertKitContainer = ref(null)

function setupConvertKit() {
  const script = document.createElement('script')
  const scriptValue = locale.value === 'en' ? 'ba0d8bc4f0' : '1b7a2eaa61'
  script.src = `https://nahueldaima.ck.page/${scriptValue}/index.js`
  script.async = true
  script.setAttribute('data-uid', scriptValue)

  convertKitContainer.value.appendChild(script)
}

onMounted(() => {
  setupConvertKit()
})

// add watcher of locale
watch(locale, () => {
  // check if previous script exists => remove it
  const previousScript = document.querySelector('script[data-uid]')
  if (previousScript)
    previousScript.remove()

  setupConvertKit()
})
</script>

<template>
  <div ref="convertKitContainer" />
</template>
