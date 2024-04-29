<script setup lang="ts">

definePageMeta({
    layout: 'nonav'
});


import { ref } from "vue";
const email = ref("");
const senha = ref("");
const verEmail = ref(true);
const verSenha = ref(false);
const carregando = ref(false);

function onSubmit(event: Event) {
    event.preventDefault();

    if (verEmail.value) {
        if (email.value === "") {
            console.log("Email não pode ser vazio");
            return;
        } else {
            carregando.value = true;
            setTimeout(() => {
                verEmail.value = false;
                verSenha.value = true;
                carregando.value = false;
            }, 500);
        }
    }
    if (verSenha.value) {
        if (senha.value === "") {
            console.log("Senha não pode ser vazia");
            return;
        } else {
            carregando.value = true;
            setTimeout(() => {
                carregando.value = false;
                navigateTo("/app");
            }, 500);
        }
    }
}

</script>

<template>
    <div>
        <div class="flex h-dvh items-center justify-center">
            <UiCard
                class="relative m-4 grid min-h-[550px] w-full grid-cols-1 place-content-center rounded-lg border p-4 shadow-xl sm:w-[508px]">


                <div
                    class="absolute inset-x-0 top-0 flex items-center justify-center rounded-t-lg bg-[#09090b] p-1 shadow-xl">
                </div>

                <UiButton variant="ghost" class="absolute right-8 top-8 hover:bg-accent hover:text-accent-foreground"
                    @click="navigateTo('/cadastrar')">
                    Cadastrar
                </UiButton>

                <UiButton @click="$colorMode.preference = $colorMode.value == 'dark' ? 'light' : 'dark'" variant="ghost"
                    size="icon-sm" class="absolute left-8 top-8 hover:bg-accent hover:text-accent-foreground">
                    <Icon name="lucide:sun-medium" class="h-4 w-4" />
                </UiButton>

                <div class="flex items-center justify-center">
                    <Icon name="heroicons-solid:lock-closed" class="h-16 w-16 text-accent" />
                </div>

                <UiCardHeader class="flex flex-col space-y-4 text-center">
                    <UiCardTitle class="text-2xl">Faça seu Login</UiCardTitle>
                    <UiCardDescription>
                        <p v-if="verEmail">Digite seu email para continuar.</p>
                        <p v-if="verSenha">Digite sua senha para Entrar.</p>
                    </UiCardDescription>
                </UiCardHeader>
                <UiCardContent>
                    <form @submit="onSubmit">
                        <div class="grid w-full items-center gap-4">
                            <div v-if="verEmail" class="flex flex-col space-y-1.5">
                                <UiLabel class="sr-only" for="email"> Email </UiLabel>
                                <UiInput v-model="email" id="email" placeholder="name@example.com" type="email"
                                    auto-capitalize="none" auto-complete="email" auto-correct="off" class="h-12"
                                    :disabled="carregando" />
                            </div>
                            <div v-if="verSenha" class="flex flex-col space-y-1.5">
                                <UiLabel class="sr-only" for="email"> Senha </UiLabel>
                                <UiInput v-model="senha" id="senha" placeholder="********" type="password"
                                    auto-capitalize="none" auto-complete="password" auto-correct="off" class="h-12"
                                    :disabled="carregando" />
                            </div>
                            <UiButton type="submit" :disabled="carregando" class="h-12">
                                <Icon name="lucide:loader-2" color="white" v-if="carregando"
                                    class="mr-2 h-4 w-4 animate-spin" />
                                <p v-if="verEmail">Continuar</p>
                                <p v-if="verSenha">Entrar</p>
                            </UiButton>
                        </div>
                    </form>
                </UiCardContent>
                <UiCardFooter class="text-center text-sm text-muted-foreground">
                    <p class="w-full">
                        Esqueceu sua senha?
                        <NuxtLink to="/lembrar" class="underline underline-offset-4 hover:text-primary">
                            Clique aqui
                        </NuxtLink>
                        .
                    </p>
                </UiCardFooter>

                <!-- <div class="absolute
                h-full
                w-full
                bg-[radial-gradient(theme(colors.border)_1px,transparent_2px)]
                [background-size:20px_20px]
                [mask-image:radial-gradient(ellipse_600px_600px_at_50%_50%,#000_50%,transparent_100%)]
                md:[mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_50%,transparent_100%)]" /> -->
            </UiCard>
        </div>
    </div>
</template>
