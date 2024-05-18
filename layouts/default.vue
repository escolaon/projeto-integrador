<template>
  <div class="flex flex-col">
    <UiVueSonner />
    <Header :pages="pages" />
    <main class="container grid grid-cols-1 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-10">
      <div class="sticky top-14 z-20 hidden h-[calc(100dvh-57px)] border-r bg-card text-card-foreground lg:block">
        <UiScrollArea class="h-[calc(100dvh-57px)] px-2 py-5">
          <SideNav :pages="pages" />
        </UiScrollArea>
      </div>
      <slot />
    </main>
  </div>
</template>

<script lang="ts" setup>
  const { data } = await useFetch('/api/pages')

  interface Page {
    _path: string;
    title: string;
    icon: string;
    userType: string[];
  }

  const pages = data.value as Page[];
</script>
