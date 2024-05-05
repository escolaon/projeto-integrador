<template>
  <UiNavbar sticky>
    <UiContainer class="flex h-14 items-center justify-between sticky">
      <HeaderLogo texto="Escola On" />
      <div class="flex items-center gap-2">
        <UiButton @click="$colorMode.preference = $colorMode.value == 'dark' ? 'light' : 'dark'" variant="ghost"
          size="icon-sm">
          <Icon name="lucide:sun-medium" class="h-4 w-4" />
        </UiButton>
        <UiAvatar v-if="isLogged" @click="signOut()" class="select-none hover:border-2 border-primary hover:opacity-75"
          size="sm" :alt="data.nome" :fallback="obterIniciais(data.nome)" :delay-ms="100" />
        <UiButton v-else variant="outline" size="sm">
          Sign in
        </UiButton>
      </div>
    </UiContainer>
  </UiNavbar>
</template>

<script setup lang="ts">
const userName = ref("")
const { status, signOut } = useAuth()
const isLogged = computed(() => status.value === 'authenticated')
const headers = useRequestHeaders(['cookie']) as HeadersInit
const { data } = await useFetch('/api/session', { headers })

function obterIniciais(nome) {
  let partes = nome.split(' ').filter(parte => parte.trim() !== '');
  let primeiraInicial = partes[0].charAt(0).toUpperCase();
  let ultimaInicial = partes[partes.length - 1].charAt(0).toUpperCase();
  return primeiraInicial + ultimaInicial;
}

</script>
