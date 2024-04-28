<script setup lang="ts">
import { ref } from "vue";

definePageMeta({
    layout: 'no-nav'
});

const isLoading = ref(false);
const isPasswordVisible = ref(false);
const isLoggedIn = ref(false);

async function onSubmit(event: Event) {
    await event.preventDefault();
    if (isPasswordVisible.value) {
        isLoading.value = true;
        await setTimeout(() => {
            navigateTo("/app");
        }, 500);
    } else {
        isLoading.value = true;
        await setTimeout(() => {
            isPasswordVisible.value = true;
            document.getElementById("password")?.focus();
            isLoading.value = false;
        }, 500);
        isLoggedIn.value = true;
    }
}

const sItens = ref([
    { value: "nuxt", label: "Nuxt.js" },
    { value: "next", label: "Next.js" },
    { value: "sveltekit", label: "SvelteKit" },
    { value: "astro", label: "Astro" },
]);
</script>

<template>
    <div>
        <div class="absolute
      h-full
      w-full
      bg-[radial-gradient(theme(colors.border)_1px,transparent_2px)]
      [background-size:20px_20px]
      [mask-image:radial-gradient(ellipse_600px_600px_at_50%_50%,#000_50%,transparent_100%)]
      md:[mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_50%,transparent_100%)]" />
        <div class="flex h-dvh items-center justify-center">
            <UiCard
                class="relative m-4 grid h-[550px] w-full grid-cols-1 place-content-center rounded-lg border p-4 shadow-2xl sm:w-[508px]">
                <div
                    class="absolute inset-x-0 top-0 flex items-center justify-center rounded-t-lg bg-black p-1 shadow-lg">
                </div>

                <UiButton variant="ghost" class="absolute right-8 top-8 hover:bg-accent hover:text-accent-foreground"
                    @click="navigateTo('/cadastrar')">
                    Cadastrar
                </UiButton>

                <div class="flex items-center justify-center">
                    <Icon name="heroicons-solid:lock-closed" class="h-16 w-16 text-accent" />
                </div>

                <UiCardHeader class="flex flex-col space-y-4 text-center">
                    <UiCardTitle class="text-2xl">Faça seu Login</UiCardTitle>
                    <UiCardDescription>
                        <p v-if="!isPasswordVisible">Digite seu email para continuar.</p>
                        <p v-else>Digite sua senha para entrar.</p>
                    </UiCardDescription>
                </UiCardHeader>
                <UiCardContent>
                    <form @submit="onSubmit">
                        <div class="grid w-full items-center gap-4">
                            <div v-if="!isPasswordVisible" class="flex flex-col space-y-1.5">
                                <UiLabel class="sr-only" for="email"> Email </UiLabel>
                                <UiInput id="email" placeholder="name@example.com" type="email" auto-capitalize="none"
                                    auto-complete="email" auto-correct="off" class="h-12" />
                            </div>
                            <div v-if="isPasswordVisible" class="flex flex-col space-y-1.5">
                                <UiLabel v-if="isPasswordVisible" class="sr-only" for="email"> Senha </UiLabel>
                                <UiInput v-if="isPasswordVisible" id="senha" placeholder="********" type="password"
                                    auto-capitalize="none" auto-complete="password" auto-correct="off"
                                    :disabled="isLoading" class="h-12" />
                            </div>
                            <UiButton type="submit" :disabled="isLoading" class="h-12">
                                <Icon name="lucide:loader-2" color="white" v-if="isLoading"
                                    class="mr-2 h-4 w-4 animate-spin" />
                                <p v-if="!isLoading && !isPasswordVisible">Continuar</p>
                                <p v-if="!isLoading && isPasswordVisible">Entrar</p>
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
            </UiCard>
        </div>
    </div>
</template>
