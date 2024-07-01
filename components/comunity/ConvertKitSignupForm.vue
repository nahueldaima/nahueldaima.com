<script setup>
const { locale } = useI18n()

const convertKitContainer = ref(null)
let currentScript = null

function setupConvertKit() {
  const scriptValue = locale.value === 'en' ? 'ba0d8bc4f0' : '1b7a2eaa61'

  // Remove the existing script if any
  if (currentScript) {
    currentScript.remove()
    currentScript = null
  }

  // Create a new script element
  const script = document.createElement('script')
  script.src = `https://nahueldaima.ck.page/${scriptValue}/index.js`
  script.async = true
  script.setAttribute('data-uid', scriptValue)

  // Append the script to the container
  convertKitContainer.value.appendChild(script)
  currentScript = script
}

onMounted(() => {
  setupConvertKit()
})

// Watch for changes in locale
watch(locale, () => {
  setupConvertKit()
})
</script>

<template>
  <div ref="convertKitContainer" />
</template>
