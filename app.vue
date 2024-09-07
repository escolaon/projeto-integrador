<template>
  <div>
    <ConfigProvider :use-id="useIdFunction" />
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
  // Used to provide id's to radix components in nuxt until Vue releases a useId
  import { ConfigProvider } from "radix-vue";

  const useIdFunction = () => useId();

  useSeoMeta({
    ogImage: "/icon.png"
  });

  useHead({
    htmlAttrs: {
      lang: "pt",
    },
    link: [
      {
        rel: "icon",
        type: "image/png",
        href: "/icon.png",
      },
    ],
  });
</script>

<style>

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.2s;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0%;
    filter: blur(1rem);
  }
</style>