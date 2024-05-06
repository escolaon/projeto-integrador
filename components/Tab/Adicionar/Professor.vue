<template>
  <UiTabsContent value="Adicionar">
    <UiCard title="Adicionar" class="border-none shadow-none"
      description="Make changes to your account here. Click save when you're done.">
      <template #content>
        <UiCardContent class="space-y-2">
          <div class="space-y-1">
            <UiLabel for="name">Name</UiLabel>
            <UiInput id="name" modelValue="Pedro Duarte" />
          </div>
          <div class="space-y-1">
            <UiLabel htmlFor="username">Username</UiLabel>
            <UiInput id="username" modelValue="@peduarte" />
          </div>
        </UiCardContent>
      </template>
      <template #footer>
        <UiCardFooter>
          <UiButton>Save changes</UiButton>
        </UiCardFooter>
      </template>
    </UiCard>
  </UiTabsContent>
</template>

<script lang="ts" setup>

</script>

<style scoped></style>