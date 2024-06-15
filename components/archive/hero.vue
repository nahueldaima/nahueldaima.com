<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="mb-10 container mx-auto max-w-3xl mt-9 px-8">
    <div>
      <h1 class="text-4xl sm:text-6xl uppercase dark:text-white pb-2 text-center">
        {{ title || '' }}
      </h1>
    </div>
    <h3 class="font-content text-md dark:text-white sm:text-xl pb-7 text-center sm:pb-1">
      {{ description || '' }}
    </h3>
  </div>
</template>
