<script setup lang="ts">
defineOgImageComponent('About', {
  headline: 'Tech and Travel Blog',
  title: 'Nahuel Daima',
  description: 'I’m a technology enthusiast and digital nomad with over a decade of experience in software',
  link: '/nahuel-daima-home-hero.jpg',
})
</script>

<template>
  <div class="pt-5">
    <div class="container mx-auto max-w-3xl mt-9">
      <!-- <div class="sm:grid grid-cols-8 px-6 py-5 sm:py-9 gap-5 container max-w-5xl  mx-auto"> -->

      <h1 class="text-5xl sm:text-7xl uppercase pb-2 text-center dark:text-zinc-300">
        {{ $t('mycv.title') }}
      </h1>
      <p class="text-base text-4xl sm:text-2xl pb-7 text-center sm:pb-12 font-normal text-zinc-500">
        {{ $t('mycv.subtitle') }}
      </p>
    </div>

    <div class="container mx-auto max-w-5xl sm:mt-9 mb-20 ">
      <div class="grid grid-cols-1 sm:grid-cols-3 items-center">
        <div class="px-6 sm:hidden justify-self-center h-[30vh] flex items-center mt-5 mb-10">
          <NuxtImg
            src="/nahuel-daima-profile-cv.jpg" loading="lazy" quality="50" alt="Nahuel Daima Profile CV"
            class="rounded-md h-full w-auto object-cover"
          />
        </div>
        <div class="px-6 col-span-2">
          <h2
            class="text-base sm:text-5xl text-5xl uppercase pb-4 sm:pb-6 text-black sm:text-left text-center dark:text-zinc-300"
          >
            Bio
          </h2>
          <p
            class="dark:text-zinc-300 text-xl text-center sm:text-justify font-normal font-content antialiased my-6"
            v-html="$t('mycv.bio')"
          />
        </div>
        <div class="hidden sm:block px-6 justify-self-center h-[40vh] flex items-center">
          <NuxtImg
            src="/nahuel-daima-profile-cv.jpg" alt="Nahuel Daima Profile CV" loading="lazy" quality="50"
            class="rounded-md h-full w-auto object-cover"
          />
        </div>
      </div>
    </div>

    <div class="container mx-auto max-w-5xl items-center min-h-screen content-center">
      <div class="px-6">
        <h2
          class="text-base sm:text-5xl text-5xl uppercase pb-5 sm:pb-8 text-black dark:text-zinc-300 sm:text-left text-center"
        >
          {{ $t('mycv.highlights') }}
        </h2>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-5 items-center mt-4">
        <div class="px-6 justify-self-center flex items-center">
          <NuxtImg
            src="/nahuel-daima-tookane-vtlab.png" alt="Nahuel Daima Tookane CTO" loading="lazy" quality="50"
            class="rounded-md h-full w-auto object-cover"
          />
        </div>
        <div class="px-6 col-span-4">
          <h3
            class="text-base sm:text-3xl text-4xl uppercase pb-4 text-black dark:text-zinc-300 sm:text-left text-center "
          >
            {{ $t('mycv.latestCompany') }}
          </h3>
          <h4
            class="text-base sm:text-xl text-4xl uppercase pb-2 text-black text-zinc-600 dark:text-zinc-300 sm:text-left text-center"
          >
            {{ $t('mycv.latestPositionTitle') }}
          </h4>
          <p class="sm:text-left text-center">
            {{ $d('2019-05-25') }} - {{ $t('mycv.now') }}
          </p>
          <p
            class="dark:text-zinc-300 text-xl text-center sm:text-justify font-normal font-content antialiased my-6"
            v-html="$t('mycv.latestPositionDescription')"
          />
        </div>
      </div>
      <div class="px-6 grid grid-cols-1 sm:grid-cols-5 items-center mt-8">
        <div class="px-2 col-start-2 col-span-4">
          <h4
            class="text-base sm:text-xl text-3xl uppercase pb-2 text-black text-zinc-600 dark:text-zinc-300 sm:text-left text-center"
          >
            {{ $t('mycv.previousPositionTitle') }}
          </h4>
          <p class="sm:text-left text-center">
            {{ $d('2021-03-21') }} - {{ $d('2022-10-21') }}
          </p>
          <p
            class="dark:text-zinc-300 text-xl text-center sm:text-justify font-normal font-content antialiased my-6"
            v-html="$t('mycv.previousPositionDescription')"
          />
        </div>
      </div>
      <div class="px-6 grid grid-cols-1 sm:grid-cols-5 items-center mt-8">
        <div class="px-2 col-start-2 col-span-4">
          <h4
            class="text-base sm:text-xl text-3xl uppercase pb-2 text-black text-zinc-600 dark:text-zinc-300 sm:text-left text-center"
          >
            {{ $t('mycv.previousPositionTitle2') }}
          </h4>
          <p class="sm:text-left text-center">
            {{ $d('2019-05-25') }} - {{ $d('2021-03-21') }}
          </p>
          <p
            class="dark:text-zinc-300 text-xl text-center sm:text-justify font-normal font-content antialiased my-6"
            v-html="$t('mycv.previousPositionDescription2')"
          />
        </div>
      </div>
    </div>

    <div class="container mx-auto max-w-5xl items-center content-center">
      <div class="grid grid-cols-1 sm:grid-cols-5 items-center mt-4">
        <div class="px-6 justify-self-center flex items-center">
          <NuxtImg
            src="/nahuel-daima-ycombinator.png" alt="Nahuel Daima Ycombinator" loading="lazy" quality="50"
            class="rounded-md h-full w-auto object-cover"
          />
        </div>
        <div class="px-6 col-span-4">
          <h3
            class="text-base sm:text-3xl text-4xl uppercase pb-4 text-black dark:text-zinc-300 sm:text-left text-center "
          >
            {{ $t('mycv.previousCompany') }}
          </h3>
          <h4
            class="text-base sm:text-xl text-4xl uppercase pb-2 text-black text-zinc-600 dark:text-zinc-300 sm:text-left text-center"
          >
            {{ $t('mycv.previousCompanyPositionTitle') }}
          </h4>
          <p class="sm:text-left text-center">
            {{ $d('2016-10-01') }} - {{ $d('2017-01-31') }}
          </p>
          <p
            class="dark:text-zinc-300 text-xl text-center sm:text-justify font-normal font-content antialiased my-6"
            v-html="$t('mycv.previousCompanyPositionDescription')"
          />
        </div>
      </div>
    </div>

    <div class="container mx-auto max-w-5xl items-center content-center mt-12">
      <div class="grid grid-cols-1 sm:grid-cols-5 items-center mt-4">
        <div class="px-6 justify-self-center flex items-center">
          <NuxtImg
            src="/nahuel-daima-waleeto.png" alt="Nahuel Daima Waleeto" loading="lazy" quality="50"
            class="rounded-md h-full w-auto object-cover"
          />
        </div>
        <div class="px-6 col-span-4">
          <h3
            class="text-base sm:text-3xl text-4xl uppercase pb-4 text-black dark:text-zinc-300 sm:text-left text-center "
          >
            {{ $t('mycv.previousCompany2') }}
          </h3>
          <h4
            class="text-base sm:text-xl text-4xl uppercase pb-2 text-black text-zinc-600 dark:text-zinc-300 sm:text-left text-center"
          >
            {{ $t('mycv.previousCompanyPositionTitle2') }}
          </h4>
          <p class="sm:text-left text-center">
            {{ $d('2023-02-10') }} - {{ $t('mycv.now') }}
          </p>
          <p
            class="dark:text-zinc-300 text-xl text-center sm:text-justify font-normal font-content antialiased my-6"
            v-html="$t('mycv.previousCompanyPositionDescription2')"
          />
        </div>
      </div>
    </div>

    <div class="container mx-auto max-w-5xl items-center content-center mt-12">
      <div class="grid grid-cols-1 sm:grid-cols-5 items-center mt-4">
        <div class="px-6 justify-self-center flex items-center">
          <NuxtImg
            src="/nahuel-daima-shift-metrics.png" alt="Nahuel Daima Shift metrics" loading="lazy" quality="50"
            class="rounded-md h-full w-auto object-cover"
          />
        </div>
        <div class="px-6 col-span-4">
          <h3
            class="text-base sm:text-3xl text-4xl uppercase pb-4 text-black dark:text-zinc-300 sm:text-left text-center "
          >
            {{ $t('mycv.previousCompany3') }}
          </h3>
          <h4
            class="text-base sm:text-xl text-4xl uppercase pb-2 text-black text-zinc-600 dark:text-zinc-300 sm:text-left text-center"
          >
            {{ $t('mycv.previousCompanyPositionTitle3') }}
          </h4>
          <p class="sm:text-left text-center">
            {{ $d('2016-10-01') }} - {{ $d('2019-01-31') }}
          </p>
          <p
            class="dark:text-zinc-300 text-xl text-center sm:text-justify font-normal font-content antialiased my-6"
            v-html="$t('mycv.previousCompanyPositionDescription3')"
          />
        </div>
      </div>
    </div>

    <div class="flex items-center justify-center bg-gray-200 dark:bg-transparent h-64 w-full mx-auto mt-12">
      <NuxtLink
        to="https://www.linkedin.com/in/nahueldaima/?locale=en_US" target="_blank"
        class="p-2 text-gray-800 rounded-md  dark:text-[#F1F2F4]" aria-label="LinkedIn"
      >
        <generalButton>{{ $t('mycv.viewFullProfile') }}</generalButton>
      </NuxtLink>
    </div>
  </div>
</template>
