<template>
  <div>
    <div class="mt-6 mb-6">
      <h3 class="text-2xl font-semibold">
        Escola
      </h3>
    </div>
    <UiTabs default-value="todas">
      <UiTabsList :pill="false" class="relative grid grid-flow-col auto-cols-auto border-b justify-start">

        <UiTabsTrigger :pill="false" value="todas">
          Todas
        </UiTabsTrigger>

        <UiTabsTrigger :pill="false" value="configuracoes">
          Configurações
        </UiTabsTrigger>

        <UiTabsIndicator />
      </UiTabsList>


      <UiTabsContent value="todas">
        <UiCard title="Todas" class="border-none shadow-none"
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


      <UiTabsContent value="configuracoes">
        <UiCard title="Configurações" class="border-none shadow-none"
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



    </UiTabs>
  </div>
</template>