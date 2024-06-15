<template>
  <div class="flex flex-col items-center sm:items-start">
    <NuxtImg
      src="/nahuel-daima-caricature.jpg"
      alt="Nahuel Daima" width="80" height="80"
      class="rounded-full"
      loading="lazy"
      quality="50"
    />
    <!-- <p class="text-black dark:text-zinc-300   text-2xl py-1 font-semibold">
      {{ footerData.author }}
    </p> -->
    <p class="py-2 dark:text-zinc-300  ">
      {{ $t('footerData.aboutAuthor') }}
    </p>
    <div class="my-1 pb-3">
      <NuxtLink
        to="https://github.com/nahueldaima"
        target="_blank"
        class="py-2 pr-2 text-gray-800 rounded-md  dark:text-[#F1F2F4]"
        aria-label="Github"
      >
        <Icon name="fa:github" size="1em" />
      </NuxtLink>
      <NuxtLink
        to="https://www.linkedin.com/in/nahueldaima/?locale=en_US"
        target="_blank"
        class="p-2 text-gray-800 rounded-md  dark:text-[#F1F2F4]"
        aria-label="LinkedIn"
      >
        <Icon name="fa:linkedin-square" size="1em" />
      </NuxtLink>
      <NuxtLink
        to="https://x.com/leodaima"
        target="_blank"
        class="p-2 text-gray-800 rounded-md  dark:text-[#F1F2F4]"
        aria-label="X"
      >
        <Icon name="fa:twitter-square" size="1em" />
      </NuxtLink>
    </div>
  </div>
</template>
