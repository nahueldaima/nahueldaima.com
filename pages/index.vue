<script lang="ts" setup>
useHead({
  title: 'Home',
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
    <MainHero />
    <!-- <MainRecent />
    <MainTrending /> -->
  </main>
</template>
