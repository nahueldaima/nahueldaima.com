<script lang="ts" setup>
interface Props {
  path?: string
  title?: string
  date?: string
  description?: string
  image?: string
  alt?: string
  ogImage?: string
  tags?: Array<string>
  published?: boolean
}

withDefaults(defineProps<Props>(), {
  path: '/',
  title: 'no-title',
  date: 'no-date',
  description: 'no-description',
  image: '/blogs-img/blog.jpg',
  alt: 'no-alt',
  ogImage: '/blogs-img/blog.jpg',
  tags: () => [],
  published: false,
})
</script>

<template>
  <article class="relative group m-2 my-10 rounded-md overflow-hidden text-white">
    <NuxtLink :to="path" class="block h-full w-full">
      <div class="relative h-96 w-full">
        <NuxtImg
          class="absolute inset-0 h-full w-full object-cover object-center transition-all duration-500 group-hover:scale-[1.10]"
          :src="image"
          provider="s3"
          :alt="alt"
        />
        <div class="absolute top-4 left-4 text-white">
          <!-- <div class="bg-black bg-opacity-50 px-2 py-1 rounded text-sm font-thin"> -->
          <div class="px-2 py-1 rounded text-sm font-thin bg-black bg-opacity-50">
            {{ $d(date) }}
          </div>
        </div>
        <div class="absolute bottom-4 left-4 text-white">
          <h2 class="text-3xl bg-black bg-opacity-50 rounded px-2">
            {{ title }}
          </h2>
        </div>
      </div>
    </NuxtLink>
  </article>
  <!-- <article class="group border dark:border-gray-800  m-2 rounded-2xl overflow-hidden shadow-sm text-zinc-700 dark:text-white  ">
    <NuxtLink :to="path" class="grid grid-cols-1 sm:grid-cols-10 gap-1">
      <div class="sm:col-span-3">
        <NuxtImg
          class="h-full w-full object-cover object-center rounded-t-2xl sm:rounded-l-2xl sm:rounded-t-none shadow-lg group-hover:scale-[1.02] transition-all duration-500"
          width="300"
          :src="image"
          :alt="alt"
        />
      </div>
      <div class="sm:col-span-7 p-5">
        <h2 class="text-xl font-semibold text-black dark:text-white   pb-1 group-hover:text-sky-700 dark:group-hover:text-sky-400">
          {{ title }}
        </h2>
        <p class="text-ellipsis line-clamp-2">
          {{ description }}
        </p>
        <div class="text-black dark:text-white   text-sm mt-2 mb-1 md:flex md:space-x-6">
          <div class="flex items-center">
            <GeneralDate />
            <p> {{ date }}</p>
          </div>
          <div class="flex items-center gap-1 flex-wrap">
            <GeneralTag />
            <p v-for="tag in tags" :key="tag">
              {{ tag }}
            </p>
          </div>
        </div>
        <div class="flex group-hover:underline text-sky-700 dark:text-sky-400 items-center pt-2">
          <p>Read More</p>
          <GeneralArrow />
        </div>
      </div>
    </NuxtLink>
  </article> -->
</template>
