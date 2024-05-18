<template>
  <div>
    <div class="absolute
                h-full
                w-full
                dark:bg-[radial-gradient(theme(colors.border)_1px,transparent_1px)]
                bg-[radial-gradient(theme(colors.border)_1px,transparent_2px)]
                [background-size:15px_15px]
                [mask-image:radial-gradient(ellipse_600px_600px_at_50%_50%,#000_50%,transparent_100%)]" />
    <div class="flex h-dvh items-center justify-center">
      <UiCard
        class="relative m-4 grid min-h-[550px] w-full grid-cols-1 place-content-center rounded-lg border p-4 shadow-[0_0px_80px_-30px_rgba(0,0,0,0.3)] dark:shadow-[0_0px_80px_-80px_rgba(0,0,0,0.3)] dark:shadow-white sm:w-[508px]">
        <div class="absolute inset-x-0 top-0 flex items-center justify-center rounded-t-lg bg-[#09090b] p-1 shadow-xl">
        </div>
        <UiButton @click="$colorMode.preference = $colorMode.value == 'dark' ? 'light' : 'dark'" variant="ghost"
          size="icon-sm" class="absolute left-8 top-8 hover:bg-accent hover:text-accent-foreground">
          <Icon name="lucide:sun-medium" class="h-4 w-4" />
        </UiButton>
        <slot />
      </UiCard>
    </div>
  </div>
</template>