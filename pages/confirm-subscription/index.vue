<script lang="ts" setup>
useHead({
  title: 'Confirm Subscription',
  meta: [
    {
      name: 'description',
      content:
        'Welcome To My Blog Site. Get Web Development, Javascript, Typescript, NodeJs, Vue, and Nuxt, Related Articles, Tips, Learning resources and more.',
    },
  ],
  titleTemplate: 'Nahuel Daima - %s',
})

// Generate OG Image
defineOgImageComponent('About', {
  headline: 'Tech and Travel Blog',
  title: 'Nahuel Daima',
  description: 'I’m a technology enthusiast and digital nomad with over a decade of experience in software',
  link: '/nahuel-daima-home-hero.jpg',
})
</script>

<template>
  <main class="md:container md:mx-auto text-zinc-600">
    <div class="dark:text-white text-black flex flex-col items-center justify-center mt-6 md:mt-0 md:h-[calc(100vh-500px)] w-full mb-8">
      <h1 class="text-4xl sm:text-7xl uppercase pb-2 text-center">
        {{ $t('confirmSubscription.title') }}
      </h1>
      <p class="font-content text-justify text-lg">
        {{ $t('confirmSubscription.description') }}
      </p>
      <div class="mt-4">
        <generalButton @click="denyConsent">
          {{ $t('confirmSubscription.button') }}
        </generalButton>
      </div>
    </div>
  </main>
</template>
