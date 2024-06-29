<script setup lang="ts">
defineProps({
  links: {
    type: Array,
    default: () => [],
  },
})

const isOpen = ref(false)
</script>

<template>
  <div v-show="links && links.length" class="flex justify-center items-center">
    <div class="p-1">
      <h3
        class="mb-3 pb-2 cursor-pointer font-content text-sm sm:text-xs text-center sm:pb-1 dark:text-white"
        @click="isOpen = !isOpen"
      >
        {{ $t('articles.tableOfContents') }}
        <Icon
          name="mdi:chevron-down" size="20"
          :class="{ 'rotate-180': isOpen }"
        />
      </h3>
      <div v-if="isOpen" class="mt-2">
        <NuxtLink
          v-for="link in links" :key="link.id" :to="`#${link.id}`"
          class="sm:text-lg text-xl block text-center text-sm mb-5 sm:mb-2 hover:underline"
        >
          {{ link.text }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
