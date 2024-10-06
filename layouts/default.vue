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
import { ref } from 'vue';

interface Page {
  _path: string;
  title: string;
  icon: string;
  userType: string[];
}

const { data: sessionData } = await useFetch('/api/session');

const userType = sessionData.value?.tipo || '';

const { data: allPages } = await useFetch('/api/pages');

const pages = ref<Page[]>(allPages.value.filter((page: Page) => page.userType.includes(userType)));

pages.value.sort((a, b) => a.title.localeCompare(b.title));

const dashboardPageIndex = pages.value.findIndex(p => p._path === "/dashboard");
if (dashboardPageIndex !== -1) {
  const [dashboardPage] = pages.value.splice(dashboardPageIndex, 1);
  pages.value.unshift(dashboardPage);
}
</script>
