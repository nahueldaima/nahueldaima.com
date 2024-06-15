<script setup lang="ts">
const localePath = useLocalePath()
const colorMode = useColorMode()
function onClick(val: string) {
  colorMode.preference = val
}
</script>

<template>
  <div class="py-5">
    <div class="flex px-6 container justify-between mx-auto items-baseline ">
      <ul class="flex items-baseline space-x-5">
        <li class="text-base sm:text-xl font-light dark:text-white">
          <NuxtLink :to="localePath('/')">
            <span class="hover:scale-110 transition-all ease-out hover:cursor-pointer flex items-center">
              NAHUEL DAIMA
            </span>
          </NuxtLink>
        </li>
      </ul>
      <ul class="flex items-center space-x-3 sm:space-x-6 text-sm sm:text-lg dark:text-white">
        <li>
          <NuxtLink :to="localePath('/tech')">
            <span class="hover:scale-110 transition-all ease-out hover:cursor-pointer flex items-center">
              {{ $t('tech.link') }}
            </span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localePath('/travel')">
            <span class="hover:scale-110 transition-all ease-out hover:cursor-pointer flex items-center">
              {{ $t('travel.link') }}
            </span>
          </NuxtLink>
        </li>
        <li title="About Me">
          <NuxtLink :to="localePath('/about')" aria-label="About me">
            <span class="hover:scale-110 transition-all ease-out hover:cursor-pointer flex items-center">
              {{ $t('aboutPage.link') }}
            </span>
          </NuxtLink>
        </li>

        <li>
          <i18nLangSwitcher />
        </li>
        <li class="flex items-center">
          <ClientOnly>
            <button
              v-if="colorMode.value === 'light'"
              name="light-mode"
              title="Light"
              class="hover:scale-110 transition-all ease-out hover:cursor-pointer flex items-center"
              @click="onClick('dark')"
            >
              <Icon name="material-symbols:dark-mode-rounded" size="18" />
            </button>

            <button
              v-if="colorMode.value === 'dark'"
              name="dark-mode"
              title="Dark"
              class="hover:scale-110 transition-all ease-out hover:cursor-pointer flex items-center"
              @click="onClick('light')"
            >
              <Icon name="material-symbols:light-mode-rounded" size="18" />
            </button>
            <template #fallback>
              <!-- this will be rendered on server side -->
              <Icon name="svg-spinners:180-ring" size="20" class="flex items-center" />
            </template>
          </ClientOnly>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.router-link-active .router-link-exact-active  {
  @apply underline
}
</style>
