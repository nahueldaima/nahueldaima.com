<script setup lang="ts">
const localePath = useLocalePath()
const colorMode = useColorMode()
function onClick(val: string) {
  colorMode.preference = val
}

const isMenuOpen = ref(false)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <div class="py-5">
    <div class="flex px-6 container justify-between mx-auto items-baseline hidden sm:flex">
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
    <div class="flex px-6 container justify-between mx-auto items-center sm:hidden">
      <!-- Logo -->
      <div>
        <NuxtLink :to="localePath('/')">
          <span class="hover:scale-110 transition-all ease-out hover:cursor-pointer flex items-center text-base sm:text-xl font-light dark:text-white">
            NAHUEL DAIMA
          </span>
        </NuxtLink>
      </div>

      <!-- Right side: light/dark mode toggle and menu icon -->
      <div class="flex items-center space-x-4">
        <!-- Light/Dark Mode Toggle -->
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

        <!-- Menu Icon -->
        <button class="hover:scale-110 transition-all ease-out hover:cursor-pointer flex items-center" @click="toggleMenu">
          <Icon name="material-symbols:menu-rounded" size="24" />
        </button>
      </div>
    </div>

    <!-- Dropdown Menu -->
    <div v-if="isMenuOpen" class="absolute top-16 right-0 bg-white dark:bg-black shadow-lg rounded-lg p-4 z-50 min-w-48">
      <ul class="flex flex-col space-y-4 dark:text-white">
        <li>
          <NuxtLink :to="localePath('/tech')" @click="toggleMenu">
            <span class="hover:scale-110 transition-all ease-out hover:cursor-pointer flex items-center">
              {{ $t('tech.link') }}
            </span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localePath('/travel')" @click="toggleMenu">
            <span class="hover:scale-110 transition-all ease-out hover:cursor-pointer flex items-center">
              {{ $t('travel.link') }}
            </span>
          </NuxtLink>
        </li>
        <li title="About Me">
          <NuxtLink :to="localePath('/about')" aria-label="About me" @click="toggleMenu">
            <span class="hover:scale-110 transition-all ease-out hover:cursor-pointer flex items-center">
              {{ $t('aboutPage.link') }}
            </span>
          </NuxtLink>
        </li>
        <i18nLangSwitcher />
      </ul>
    </div>
  </div>
</template>

<style>
.router-link-active .router-link-exact-active  {
  @apply underline
}
</style>
