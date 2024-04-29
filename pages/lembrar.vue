<script setup lang="ts">
import { ref } from "vue";

definePageMeta({
    layout: 'nonav'
});

const email = ref("");
const carregando = ref(false);

function onSubmit(event: Event) {
    event.preventDefault();

    if (email.value === "") {
        console.log("Email não pode ser vazio");
        return;
    } else {
        carregando.value = true;
        setTimeout(() => {
            carregando.value = false;
            navigateTo("/entrar");
        }, 500);
    }

}

</script>

<template>
    <div>
        <div class="flex h-dvh items-center justify-center">
            <UiCard
                class="relative m-4 grid min-h-[550px] w-full grid-cols-1 place-content-center rounded-lg border p-4 shadow-2xl sm:w-[508px]">
                <div
                    class="absolute inset-x-0 top-0 flex items-center justify-center rounded-t-lg bg-black p-1 shadow-lg">
                </div>

                <UiButton variant="ghost" class="absolute right-8 top-8 hover:bg-accent hover:text-accent-foreground"
                    @click="navigateTo('/entrar')">
                    Entrar
                </UiButton>

                <div class="flex items-center justify-center">
                    <Icon name="heroicons-solid:lock-closed" class="h-16 w-16 text-accent" />
                </div>

                <UiCardHeader class="flex flex-col space-y-4 text-center">
                    <UiCardTitle class="text-2xl">Ops! Esqueceu sua senha?</UiCardTitle>
                    <UiCardDescription>
                        <p>Entre com seu email e enviaremos um link para você redefinir sua senha.</p>
                    </UiCardDescription>
                </UiCardHeader>
                <UiCardContent>
                    <form @submit="onSubmit">
                        <div class="grid w-full items-center gap-4">
                            <div class="flex flex-col space-y-1.5">
                                <UiLabel class="sr-only" for="email"> Email </UiLabel>
                                <UiInput v-model="email" id="email" placeholder="name@example.com" type="email"
                                    auto-capitalize="none" auto-complete="email" auto-correct="off" class="h-12"
                                    :disabled="carregando" />
                            </div>

                            <UiButton type="submit" :disabled="carregando" class="h-12">
                                <Icon name="lucide:loader-2" color="white" v-if="carregando"
                                    class="mr-2 h-4 w-4 animate-spin" />
                                <p>Enviar</p>
                            </UiButton>
                        </div>
                    </form>
                </UiCardContent>
            </UiCard>
        </div>
    </div>
</template>
