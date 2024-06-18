<template>
  <div class="my-5 flex flex-col items-center sm:items-start text-center sm:text-left">
    <p class="text-black dark:text-white   text-base font-semibold">
      {{ $t('footerData.connect') }}
    </p>
    <p class="dark:text-white  ">
      {{ $t('footerData.authorInterest') }}
    </p>
    <div class="mt-4">
      <NuxtLink
        to="https://bio.site/nahueldaima"
        target="_blank"
        aria-label="Bio Site"
      >
        <generalButton>{{ $t('footerData.connect') }}</generalButton>
      </NuxtLink>
    </div>
  </div>
</template>
