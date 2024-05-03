<script setup lang="ts">
import { ref } from "vue";

const { signIn } = useAuth()
const email = ref("");
const senha = ref("");
const verEmail = ref(true);
const verSenha = ref(false);
const carregando = ref(false);

definePageMeta({
    layout: "nonav",
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: '/',
    },
})

const onSubmit = async (event) => {
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
            signIn('credentials', { email: email.value, senha: senha.value })
            carregando.value = false;
        }
    }
}
</script>
<template>
    <div>
        <div class="flex items-center justify-center">
            <Icon name="solar:map-point-school-broken" class="h-16 w-16 text-green-600" />
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
            <p class="flex justify-between w-full">
                <NuxtLink to="/cadastrar" class="underline underline-offset-4 hover:text-primary">
                    Cadastre-se
                </NuxtLink>
            </p>
        </UiCardFooter>
    </div>
</template>
