<template>
  
  <div class="flex flex-col">
    <!-- HEADER -->
    <header class="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
      <div class="container flex h-14 items-center justify-between">
        <div class="flex items-center gap-10">
          <div class="flex items-center gap-5">
            <UiButton
              size="icon-sm"
              variant="outline"
              class="h-9 w-9 lg:hidden"
              @click="mobileNav = true"
              ><Icon name="heroicons:bars-2" class="h-4 w-4" />
            </UiButton>
            <NuxtLink to="/" class="text-lg font-bold">UI Thing</NuxtLink>
          </div>
          <nav
            class="hidden items-center space-x-6 text-sm font-medium lg:flex"
          >
            <NuxtLink
              :class="[
                $route.path.includes('/getting-started/')
                  ? '!text-primary'
                  : '',
              ]"
              to="/getting-started/introduction"
              class="text-foreground/60 transition-colors hover:text-foreground"
              >Documentation</NuxtLink
            >
            <NuxtLink
              :class="[
                $route.path.includes('/components/') ||
                $route.path.includes('/forms/')
                  ? '!text-primary'
                  : '',
              ]"
              to="/components/accordion"
              class="text-foreground/60 transition-colors hover:text-foreground"
              >Components</NuxtLink
            >
            <UiDropdownMenu>
              <UiDropdownMenuTrigger>
                <div
                  class="inline-flex items-center gap-1 text-foreground/60 transition-colors hover:text-foreground"
                >
                  <span>Examples</span>
                  <Icon name="heroicons:chevron-down" class="h-3 w-3" />
                </div>
              </UiDropdownMenuTrigger>
              <UiDropdownMenuContent
                class="min-w-[180px]"
                align="start"
                :side-offset="5"
              >
                <UiDropdownMenuItem as-child>
                  <NuxtLink
                    class="cursor-pointer hover:bg-muted"
                    to="/examples/cards"
                    >Cards</NuxtLink
                  >
                </UiDropdownMenuItem>
                <UiDropdownMenuItem as-child>
                  <NuxtLink
                    class="cursor-pointer hover:bg-muted"
                    to="/examples/dashboard"
                    >Dashboard</NuxtLink
                  >
                </UiDropdownMenuItem>
                <template v-for="l in externalProjects" :key="l.name">
                  <UiDropdownMenuItem as-child>
                    <NuxtLink
                      target="_blank"
                      external
                      class="cursor-pointer hover:bg-muted"
                      :href="l.link"
                      >{{ l.name }}</NuxtLink
                    >
                  </UiDropdownMenuItem>
                </template>
              </UiDropdownMenuContent>
            </UiDropdownMenu>
          </nav>
        </div>
        <!-- HEADER -->
        <div class="flex items-center">
          <UiButton
            size="sm"
            class="mr-2 hidden min-w-[300px] font-normal text-muted-foreground md:flex"
            variant="outline"
            @click="isOpen = true"
          >
            <Icon name="lucide:search" />
            Search...
            <UiKbd class="ml-auto">{{ metaSymbol }}+K</UiKbd>
          </UiButton>
          <UiButton
            size="icon"
            class="text-muted-foreground md:hidden"
            variant="ghost"
            @click="isOpen = true"
          >
            <Icon name="lucide:search" class="h-[18px] w-[18px]" />
          </UiButton>
          <UiButton
            to="https://github.com/BayBreezy/ui-thing"
            target="_blank"
            class="h-9 w-9"
            variant="ghost"
            size="icon"
            ><Icon name="radix-icons:github-logo" class="h-[18px] w-[18px]"
          /></UiButton>
          <CommandSearch v-model="isOpen" />
          <UiDropdownMenu>
            <UiDropdownMenuTrigger as-child>
              <UiButton class="h-9 w-9" variant="ghost" size="icon"
                ><Icon
                  :name="currentIcon || 'lucide:sun'"
                  class="h-[18px] w-[18px]"
              /></UiButton>
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent align="end" :side-offset="5">
              <UiDropdownMenuItem
                v-for="(m, i) in modes"
                :key="i"
                class="cursor-pointer"
                :icon="m.icon"
                :title="m.title"
                @click="setTheme(m.value)"
              />
            </UiDropdownMenuContent>
          </UiDropdownMenu>
        </div>
      </div>
      <MobileNav v-model="mobileNav" />
    </header>

    <!-- Main content -->
    <main
      class="container grid grid-cols-1 lg:grid-cols-[290px_minmax(0,1fr)] lg:gap-10"
    >
      <!-- Left sidebar with page links -->
      <div
        class="sticky top-14 z-20 hidden h-[calc(100dvh-57px)] border-r bg-card text-card-foreground lg:block"
      >
        <UiScrollArea class="h-[calc(100dvh-57px)] px-2 py-5">
          <DocsNavlink :links="navigation" />
        </UiScrollArea>
      </div>
      <!-- Page content -->
      <div class="xl:grid xl:grid-cols-[1fr,250px] xl:gap-5">
        <!-- Page content -->
        <div
          class="prose prose-lg mx-auto w-full min-w-0 max-w-none py-5 dark:prose-invert lg:prose-base prose-headings:scroll-mt-16 prose-headings:tracking-tight prose-h2:mt-6 prose-h2:border-b prose-h2:pb-3 first:prose-h2:mt-10 prose-a:decoration-primary prose-a:decoration-wavy prose-a:underline-offset-2 hover:prose-a:text-primary prose-pre:text-lg lg:prose-pre:text-base"
        >
          <DocsHeader />
          <slot />
          <DocsFooter />
        </div>
        <!-- Table of contents for current page -->
        <aside
          v-if="toc && toc.links.length && toc.links"
          class="sticky top-14 z-20 hidden h-[calc(100dvh-57px)] overflow-y-auto border-l bg-card text-card-foreground xl:block"
        >
          <div class="p-5">
            <p class="mb-5 text-sm font-semibold">Page contents</p>
            <DocsToclink
              :set-active="setActive"
              :active-id="activeId"
              :links="toc.links"
            />
          </div>
        </aside>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "black",
  auth: {
    unauthenticatedOnly: false,
  },
});
const isLogged = ref(true);

// import { useActiveScroll } from "vue-use-active-scroll";

// const { toc, navigation } = useContent();

// const targets = computed(() =>
//   toc.value.links.flatMap(({ id, children = [] }: any) => [
//     id,
//     ...children.map(({ id }: { id: string }) => id),
//   ])
// );

// const { activeId, setActive } = useActiveScroll(targets, {
//   replaceHash: true,
//   overlayHeight: 80,
// });
</script>
