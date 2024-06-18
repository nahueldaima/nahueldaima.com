<script setup lang="ts">
interface Props {
  title: string
  image: string
  alt: string
  description: string
  date: string
  tags: Array<string>
}

withDefaults(defineProps<Props>(), {
  title: 'no-title',
  image: '#',
  alt: 'no-img',
  description: 'no description',
  date: 'no-date',
  tags: () => ([]),
})
</script>

<template>
  <header>
    <div class="mb-10">
      <div class="flex justify-between">
        <div>
          <p class="text-center mb-2 font-thin dark:text-white">
            {{ $d(date) || '' }}
          </p>
          <h1 class="text-4xl sm:text-6xl uppercase pb-2 text-center dark:text-white ">
            {{ title || '' }}
          </h1>
        </div>
      </div>
      <h3 class="font-content text-md sm:text-xl pb-7 text-center sm:pb-1 dark:text-white">
        {{ description || '' }}
      </h3>
    </div>
  </header>
</template>
