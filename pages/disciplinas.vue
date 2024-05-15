<template>
    <div>
        <div class="mt-6 mb-6">
            <h3 class="text-2xl font-semibold">
                Disciplinas
            </h3>
        </div>
        <UiTabs default-value="Todos">
            <UiTabsList :pill="false" class="relative grid grid-flow-col auto-cols-auto border-b justify-start">

                <UiTabsTrigger :pill="false" value="Todos">
                    Todos
                </UiTabsTrigger>

                <UiTabsIndicator />
            </UiTabsList>

            <TabDisciplinasTodos/>
        </UiTabs>
    </div>
</template>