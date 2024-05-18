<template>
    <div>
        <div class="mt-6 mb-6">
            <h3 class="text-2xl font-semibold">
                Notificações
            </h3>
        </div>
        <UiTabs default-value="Pendentes">
            <UiTabsList :pill="false" class="relative grid grid-flow-col auto-cols-auto border-b justify-start">

                <UiTabsTrigger :pill="false" value="Pendentes">
                    Pendentes
                </UiTabsTrigger>
                <UiTabsTrigger :pill="false" value="Enviadas">
                    Enviadas
                </UiTabsTrigger>

                <UiTabsIndicator />
            </UiTabsList>

            <TabNotificacoesPendentes />
            <TabNotificacoesEnviadas />
        </UiTabs>
    </div>
</template>