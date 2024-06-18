<script setup lang="ts">
import { withBase } from 'ufo'
import { computed, useRuntimeConfig } from '#imports'

const props = defineProps({
  src: {
    type: String,
    default: '',
  },
  alt: {
    type: String,
    default: '',
  },
  width: {
    type: [String, Number],
    default: undefined,
  },
  height: {
    type: [String, Number],
    default: undefined,
  },
})

const refinedSrc = computed(() => {
  if (props.src?.startsWith('/') && !props.src.startsWith('//'))
    return withBase(props.src, useRuntimeConfig().app.baseURL)

  return props.src
})
</script>

<template>
  <div>
    <NuxtImg
      class="inset-0 w-full h-auto rounded object-cover object-center transition-all duration-500 group-hover:scale-[1.10] dark:shadow-gray-800"
      :src="refinedSrc"
      provider="s3"
      :alt="alt"
      :width="width" :height="height"
    />
  </div>
</template>
