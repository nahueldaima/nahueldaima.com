<script setup lang="ts">
import { sanitizeHTML } from '@/utils/sanitize'

const { t } = useI18n()
const rawMessage = t('aboutPage.aboutMe')
const sanitizedMessage = ref('')

// Sanitize the message on client-side after the component mounts
onMounted(() => {
  sanitizedMessage.value = sanitizeHTML(rawMessage)
})

defineOgImageComponent('About', {
  headline: 'Tech and Travel Blog',
  title: 'Nahuel Daima',
  description: 'I’m a technology enthusiast and digital nomad with over a decade of experience in software',
  link: '/nahuel-daima-home-hero.jpg',
})
</script>

<template>
  <div class="py-5 px-6">
    <div class="container mx-auto max-w-3xl mt-9">
      <!-- <div class="sm:grid grid-cols-8 px-6 py-5 sm:py-9 gap-5 container max-w-5xl  mx-auto"> -->

      <div class="justify-between">
        <div>
          <h1 class="text-4xl sm:text-7xl uppercase pb-2 text-center">
            {{ $t('aboutPage.title') }}
          </h1>
        </div>
      </div>
      <h3 class="text-base sm:text-3xl text-5xl pb-7 font-content text-center sm:pb-12">
        {{ $t('aboutPage.description') }}
      </h3>
      <p class="font-content text-justify text-lg" v-html="sanitizedMessage" />
      <div class="hidden sm:block col-span-3" />
    </div>
  </div>
</template>
