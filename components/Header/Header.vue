<template>



<UiNavbar sticky>
  <UiContainer class="flex h-14 items-center justify-between sticky">
    <HeaderLogo texto="Escola On" />
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




</template>
