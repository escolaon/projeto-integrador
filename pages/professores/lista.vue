<template>
<div>
    <div class="mt-6 mb-6">
        <h3 class="text-2xl font-semibold">
            Professores
        </h3>
    </div>
    <UiTabs class="" default-value="account">
        <UiTabsList :pill="true" class="relative grid w-full grid-cols-2">
            <UiTabsTrigger :pill="true" value="account" >Novo</UiTabsTrigger>
            <UiTabsTrigger :pill="true" value="password">Todos</UiTabsTrigger>
            <!-- <UiTabsIndicator /> -->
        </UiTabsList>
        <UiTabsContent value="account">
            <UiCard title="Account" class="border-none shadow-none" description="Make changes to your account here. Click save when you're done.">
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
        <UiTabsContent value="password">
            <UiCard title="Password" class="border-none shadow-none" description="Change your password here. After saving, you'll be logged out.">
                <template #content>
                    <UiCardContent class="space-y-2">
                        <div class="space-y-1">
                            <UiLabel htmlFor="current">Current password</UiLabel>
                            <UiInput id="current" type="password" />
                        </div>
                        <div class="space-y-1">
                            <UiLabel htmlFor="new">New password</UiLabel>
                            <UiInput id="new" type="password" />
                        </div>
                    </UiCardContent>
                </template>
                <template #footer>
                    <UiCardFooter>
                        <UiButton>Save password</UiButton>
                    </UiCardFooter>
                </template>
            </UiCard>
        </UiTabsContent>
    </UiTabs>
</div>
</template>
