<template>
    <AlertDialogRoot v-model:open="modalState">
        <AlertDialogPortal>
            <AlertDialogOverlay class="bg-background/80 backdrop-blur-sm fixed inset-0 z-30">
                <div
                    class="absolute h-full w-full bg-[radial-gradient(theme(colors.border)_1px,transparent_1px)] [background-size:15px_15px] [mask-image:radial-gradient(ellipse_600px_600px_at_50%_50%,#000_10%,transparent_100%)]" />
            </AlertDialogOverlay>
            <AlertDialogContent
                class="z-[100] text-[15px] fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[700px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-primary-foreground p-[25px] shadow-[0_0px_50px_-30px_rgba(0,0,0,0.5)] focus:outline-none border border-input">
                <AlertDialogTitle class="text-xl font-semibold mb-4">
                    {{ isEditing ? 'Editar Professor' : 'Adicionar Novo Professor' }}
                </AlertDialogTitle>
                <AlertDialogDescription class="mt-4 mb-5 text-[15px] leading-normal">
                    <form @submit.prevent="handleSave">
                        <div class="grid w-full items-center gap-4">
                            <div class="flex flex-col space-y-1.5">
                                <UiLabel for="nome"> Nome </UiLabel>
                                <input id="nome" v-model="newUser.nome" autocomplete="off" class="alert-input" />
                                <UiLabel for="email"> Email </UiLabel>
                                <input id="email" v-model="newUser.email" autocomplete="off" class="alert-input" />
                                <UiLabel for="celular"> Celular </UiLabel>
                                <input id="celular" v-model="newUser.celular" autocomplete="off" class="alert-input" />
                            </div>
                        </div>
                    </form>
                </AlertDialogDescription>
                <div class="flex justify-end gap-[25px]">
                    <AlertDialogCancel
                        class="text-mauve11 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-semibold leading-none outline-none focus:shadow-[0_0_0_2px]">
                        Voltar
                    </AlertDialogCancel>
                    <AlertDialogAction
                        class="text-red11 bg-red4 hover:bg-red5 focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-semibold leading-none outline-none focus:shadow-[0_0_0_2px]"
                        @click="handleSave()">
                        {{ isEditing ? 'Atualizar' : 'Salvar' }}
                    </AlertDialogAction>
                </div>
            </AlertDialogContent>
        </AlertDialogPortal>
    </AlertDialogRoot>
</template>

<script lang="ts" setup>
    import { ref, reactive } from 'vue';

    const { isEditing, modalState, newUser, handleSave } = useProfessores();
</script>

<style scoped>
    .alert-input {
        @apply h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-[16px] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground file:hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm;
    }
</style>
