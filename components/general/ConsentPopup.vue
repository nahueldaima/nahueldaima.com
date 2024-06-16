<script setup>
import { ref } from 'vue'

const { gtag, enableAnalytics, disableAnalytics, initialize } = useGtag()

const showPopup = ref(true)

function acceptConsent() {
  allConsentGranted()
  enableAnalytics()
  showPopup.value = false
}

function allConsentGranted() {
  initialize()
}

function denyConsent() {
  disableAnalytics()
  gtag('consent', 'update', {
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    ad_storage: 'denied',
    analytics_storage: 'denied',
  })
  showPopup.value = false
}
</script>

<template>
  <div v-if="showPopup" class="z-40 w-80 fixed rounded-lg bottom-0 right-0 bg-gray-800 bg-opacity-95 px-6 py-4">
    <div class="mx-auto max-w-lg">
      <h2 class="text-lg font-semibold mb-2 text-white font-heading">
        {{ $t('cookies.title') }}
      </h2>
      <p class="mb-4 text-white font-content text-sm">
        {{ $t('cookies.description') }}
      </p>
      <div class="flex justify-end space-x-4">
        <generalButton @click="denyConsent">
          {{ $t('cookies.deny') }}
        </generalButton>
        <generalButton @click="acceptConsent">
          {{ $t('cookies.accept') }}
        </generalButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add your custom styles here */
</style>
