<template>
  <div class="flex flex-col">
    <UiVueSonner />
    <Header :links="navigation" />
    <main class="container grid grid-cols-1 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-10">
      <div class="sticky top-14 z-20 hidden h-[calc(100dvh-57px)] border-r bg-card text-card-foreground lg:block">
        <UiScrollArea class="h-[calc(100dvh-57px)] px-2 py-5">
          <SideNav :links="navigation" />
        </UiScrollArea>
      </div>
      <slot />
    </main>
  </div>
</template>

<script lang="ts" setup>
  const { data } = await useFetch('/api/pages')
  const navigation = data.value;
</script>
