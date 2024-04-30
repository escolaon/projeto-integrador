<template>
  <div>
    <UiNavbar sticky>
      <UiContainer class="flex h-14 items-center justify-between sticky">
        <NuxtLink to="/">
          <p class="text-lg text-zinc-700 font-light">
            Escola
            <Icon name="solar:map-point-school-broken" class="h-12 w-12 text-green-600" />
            Ligada
          </p>
        </NuxtLink>
        <div class="flex items-center gap-2">
          <UiButton @click="$colorMode.preference = $colorMode.value == 'dark' ? 'light' : 'dark'" variant="ghost"
            size="icon-sm">
            <Icon name="lucide:sun-medium" class="h-4 w-4" />
          </UiButton>
          <UiButton variant="outline" size="sm">
            Sign in
          </UiButton>
          <UiButton @click="navigateTo('/entrar')" variant="outline" size="sm">
            Logout
          </UiButton>
        </div>
      </UiContainer>
    </UiNavbar>
    <UiContainer class="h-[calc(100dvh-57px)] ">
      <slot />
    </UiContainer>
  </div>
</template>