<script setup lang="ts">
const localePath = useLocalePath()
</script>

<template>
  <div class="flex flex-col dark:text-zinc-300 my-5 items-center sm:items-start">
    <p class="text-black dark:text-zinc-300 text-base font-semibold mb-4">
      {{ $t('footerData.quickLink') }}
    </p>
    <NuxtLink :to="localePath('/')" class="hover:underline">
      {{ $t('homePage.link') }}
    </NuxtLink>
    <NuxtLink :to="localePath('/cv')" class="hover:underline">
      {{ $t('mycv.link') }}
    </NuxtLink>
    <NuxtLink :to="localePath('/about')" class="hover:underline">
      {{ $t('aboutPage.link') }}
    </NuxtLink>
  </div>
</template>
