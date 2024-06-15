<template>
  <div class="flex items-center justify-center mt-6 md:mt-0 md:h-[calc(100vh-100px)] w-full mb-8">
    <div class="grid grid-cols-1 sm:grid-cols-2 items-center w-full max-w-screen-xl">
      <div class="px-6 justify-self-center h-[40vh] sm:h-[60vh] flex items-center">
        <NuxtImg
          src="/nahuel-daima-home-hero.jpg" loading="lazy"
          quality="50"
          alt="Nahuel Daima"
          class="rounded-md h-full w-auto object-cover"
        />
      </div>
      <div class="px-6">
        <h1 class="text-center md:text-left text-black dark:text-zinc-300 leading-10 sm:leading-7 font-heading antialiased font-medium leading-tight text-4xl md:text-6xl my-5">
          {{ $t('homePage.title') }}
          <br>
          {{ $t('homePage.title2') }}
        </h1>
        <p class="dark:text-zinc-300 text-xl font-normal font-content antialiased my-6">
          {{ $t('homePage.description') }}
        </p>
        <div class="flex md:justify-end md:mr-6 pt-6 justify-center">
          <NuxtLink :to="localePath('/tech')" class="mr-6">
            <generalButton>{{ $t('homePage.button1') }}</generalButton>
          </NuxtLink>
          <NuxtLink :to="localePath('/travel')">
            <generalButton>{{ $t('homePage.button2') }}</generalButton>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
