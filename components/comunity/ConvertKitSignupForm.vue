<script setup>
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const convertKitContainer = ref(null)
let currentScript = null
let scrollListener = null

function cleanupConvertKit() {
  // Remove the existing script if any
  if (currentScript) {
    currentScript.remove()
    currentScript = null
  }

  // Remove existing form elements
  if (convertKitContainer.value) {
    while (convertKitContainer.value.firstChild)
      convertKitContainer.value.removeChild(convertKitContainer.value.firstChild)
  }

  // Remove the stored event listener if it exists
  if (scrollListener) {
    window.removeEventListener('scroll', scrollListener)
    scrollListener = null
  }
}

function setupConvertKit() {
  cleanupConvertKit()

  const scriptValue = locale.value === 'en' ? 'ba0d8bc4f0' : '1b7a2eaa61'

  // Create a new script element
  const script = document.createElement('script')
  script.src = `https://nahueldaima.ck.page/${scriptValue}/index.js`
  script.async = true
  script.setAttribute('data-uid', scriptValue)

  // Store the event listener
  // scrollListener = function () {
  //   // Event listener logic goes here, if needed
  // }

  // Append the script to the container
  convertKitContainer.value.appendChild(script)
  currentScript = script

  // Manually add the event listener named "r" (if needed for setup)
  // window.addEventListener('scroll', scrollListener)
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
