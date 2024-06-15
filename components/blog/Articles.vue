<script lang="ts" setup>
const props = defineProps({
  allArticles: {
    type: Array,
    required: true,
  },
  locale: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  metaDescription: {
    type: String,
    required: true,
  },
  metaContent: {
    type: String,
    required: true,
  },
})

const elementPerPage = ref(50)
const pageNumber = ref(1)
const searchVal = ref('')

const formattedData = computed(() => {
  return props.allArticles.map((articles) => {
    // remove language from articles._path
    articles._path = articles._path.replace(`/${props.locale}/`, '')
    return {
      path: articles._path,
      title: articles.title || 'no-title available',
      description: articles.description || 'no-description available',
      image: articles.image || '/not-found.jpg',
      alt: articles.alt || 'no alter data available',
      ogImage: articles.ogImage || '/not-found.jpg',
      date: articles.date || '2024-01-01',
      tags: articles.tags || [],
      published: articles.published || false,
    }
  }) || []
})

const searchData = computed(() => {
  return formattedData.value.filter((data) => {
    const lowerTitle = data.title.toLocaleLowerCase()
    if (lowerTitle.search(searchVal.value) !== -1)
      return true
    else return false
  }) || []
})

const paginatedData = computed(() => {
  return searchData.value.filter((data, idx) => {
    const startInd = ((pageNumber.value - 1) * elementPerPage.value)
    const endInd = (pageNumber.value * elementPerPage.value) - 1

    if (idx >= startInd && idx <= endInd)
      return true
    else return false
  }) || []
})

// function onPreviousPageClick() {
//   if (pageNumber.value > 1)
//     pageNumber.value -= 1
// }

// const totalPage = computed(() => {
//   const ttlContent = searchData.value.length || 0
//   const totalPage = Math.ceil(ttlContent / elementPerPage.value)
//   return totalPage
// })

// function onNextPageClick() {
//   if (pageNumber.value < totalPage.value)
//     pageNumber.value += 1
// }

useHead({
  title: props.title,
  meta: [
    {
      name: props.metaDescription,
      content: props.metaContent,
    },
  ],
  titleTemplate: 'Nahuel Daima - %s',
})

// Generate OG Image
const siteData = useSiteConfig()
defineOgImage({
  props: {
    title: props.title,
    description: props.metaContent,
    siteName: siteData.url,
  },
})
</script>

<template>
  <main>
    <ArchiveHero :title="title" :description="metaDescription" />

    <div class="container mx-auto max-w-4xl mt-9">
      <div class="px-6 max-w-xl mx-auto mb-10">
        <input
          v-model="searchVal" :placeholder="$t('articles.search')" type="text"
          class="text-lg border-b-2 border-b border-0 border-slate-100 dark:border-slate-500 block w-full dark:placeholder-white text-black dark:text-white dark:bg-transparent placeholder:text-black  border-gray-300   focus:border-none focus:ring focus:ring-transparent dark:focus:ring-transparent"
        >
      </div>

      <ClientOnly>
        <div v-auto-animate class="space-y-5 my-5 px-4">
          <template v-for="post in paginatedData" :key="post.title">
            <ArchiveCard
              :path="post.path" :title="post.title" :date="post.date"
              :description="post.description" :image="post.image" :alt="post.alt" :og-image="post.ogImage"
              :tags="post.tags" :published="post.published"
            />
          </template>

          <ArchiveCard v-if="paginatedData.length <= 0" title="No Post Found" image="/not-found.jpg" />
        </div>

        <template #fallback>
          <BlogLoader />
          <BlogLoader />
        </template>
      </ClientOnly>

      <!-- <div class="flex justify-center items-center space-x-6 ">
                <button :disabled="pageNumber <= 1" @click="onPreviousPageClick">
                    <Icon name="mdi:code-less-than" size="30"
                        :class="{ 'text-sky-700 dark:text-sky-400': pageNumber > 1 }" />
                </button>
                <p>{{ pageNumber }} / {{ totalPage }}</p>
                <button :disabled="pageNumber >= totalPage" @click="onNextPageClick">
                    <Icon name="mdi:code-greater-than" size="30"
                        :class="{ 'text-sky-700 dark:text-sky-400': pageNumber < totalPage }" />
                </button>
            </div> -->
    </div>
  </main>
</template>
