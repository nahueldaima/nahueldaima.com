<script setup lang="ts">
const head = useLocaleHead({
  addDirAttribute: true, // Adds dir
  addSeoAttributes: true, // Adds lang
  identifierAttribute: 'id',
})
const title = computed(() => 'Nahuel Daima')
</script>

<template>
  <div>
    <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">
      <Head>
        <Title>{{ title }}</Title>
        <template v-for="link in head.link" :key="link.id">
          <Link :id="link.id" :rel="link.rel" :href="link.href" :hreflang="link.hreflang" />
        </template>
        <template v-for="meta in head.meta" :key="meta.id">
          <Meta :id="meta.id" :property="meta.property" :content="meta.content" />
        </template>
      </Head>
      <Body>
        <div class="gd-container font-heading">
          <header class="fixed w-full bg-[#FFFFFF] dark:bg-slate-950 z-10">
            <MainHeader />
          </header>
          <main>
            <div class="p-9" />
            <slot />
          </main>
          <footer>
            <MainFooter />
          </footer>
        </div>
      </Body>
    </Html>
  </div>
</template>

<style scoped>
/* .gd-container {
  display: grid;
  grid-template-rows: 1fr auto;
  min-height: 100vh;
} */
</style>
