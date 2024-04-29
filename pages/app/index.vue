<template>

  <div>
    <UiContainer as="section" class=" py-5">
      <div class="flex items-center justify-between gap-5">
        <div>
          <h1 class="text-2xl font-semibold">Users</h1>
          <p class="mt-1 text-muted-foreground">Manage users here</p>
        </div>
        <UiButton @click="" size="sm">Load users</UiButton>
      </div>
      <UiDivider class="my-10" />
      <div class="flex flex-col items-center gap-5">
        <Icon size="28" class="text-muted-foreground" name="lucide:users" />
        <p>No users loaded</p>
      </div>
    </UiContainer>
  </div>

</template>