<script setup lang="ts">
import { ref, onMounted } from "vue";

const nome = ref("");
const email = ref("");
const endereco = ref("");
const nomeResponsavel = ref("");
const celular = ref("");
const celularResponsavel = ref("");
const carregando = ref(false);
const selectedTurma = ref<number | null>(null);
const turmas = ref<any[]>([]);
const erro = ref<string>("");
const success = ref<string>("");

async function onSubmit(event: Event) {
  event.preventDefault();

  if (!nome.value || !email.value || !endereco.value || !nomeResponsavel.value || !celular.value ||
    !celularResponsavel.value || !selectedTurma.value) {
    erro.value = "Todos os campos são obrigatórios";
    setTimeout(() => {
      erro.value = "";
    }, 5000);
    return;
  }

  carregando.value = true;

  try {

    await $fetch('/api/salva/aluno', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        nome: nome.value,
        email: email.value,
        endereco: endereco.value,
        nomeResponsavel: nomeResponsavel.value,
        celular: celular.value,
        celularResponsavel: celularResponsavel.value,
        idTurma: selectedTurma.value
      },
    });
    carregando.value = false;
    success.value = "Aluno cadastrado com sucesso!";
    setTimeout(() => {
      success.value = "";
    }, 5000);
  } catch (error) {
    carregando.value = false;
    erro.value = "Erro ao salvar aluno no banco de dados";
    setTimeout(() => {
      erro.value = "";
    }, 5000);
  }
}

onMounted(async () => {
  try {
    carregando.value = true;
    const response = await fetch('/api/busca/turmas');
    turmas.value = await response.json();
    carregando.value = false;
  } catch (error) {
    console.error("Erro ao carregar as turmas:", error);
    carregando.value = false;
    erro.value = "Erro ao carregar as turmas";
    setTimeout(() => {
      erro.value = "";
    }, 5000);
  }
});
</script>

<template>
  <div>
    <div class="flex items-center justify-center">
      <Icon name="solar:map-point-school-broken" class="h-16 w-16 text-green-600" />
    </div>
    <UiCardHeader class="flex flex-col space-y-4 text-center">
      <UiCardTitle class="text-2xl">Cadastro de Aluno</UiCardTitle>
    </UiCardHeader>
    <UiCardContent>
      <form @submit="onSubmit">
        <div class="grid w-full items-center gap-4">
          <div class="flex flex-col space-y-1.5">
            <UiLabel class="sr-only" for="nome"> Nome </UiLabel>
            <UiInput v-model="nome" id="nome" placeholder="Nome do Aluno" type="text" auto-capitalize="none"
              auto-complete="name" auto-correct="off" class="h-12" :disabled="carregando" />
          </div>
          <div class="flex flex-col space-y-1.5">
            <UiLabel class="sr-only" for="email"> Email </UiLabel>
            <UiInput v-model="email" id="email" placeholder="E-mail" type="email" auto-capitalize="none"
              auto-complete="email" auto-correct="off" class="h-12" :disabled="carregando" />
          </div>
          <div class="flex flex-col space-y-1.5">
            <UiLabel class="sr-only" for="endereco"> Celular </UiLabel>
            <UiInput v-model="endereco" id="endereco" placeholder="Endereço" type="tel" auto-capitalize="none"
              auto-complete="endereco" auto-correct="off" class="h-12" :disabled="carregando" />
          </div>
          <div class="flex flex-col space-y-1.5">
            <UiLabel class="sr-only" for="nomeResponsavel"> Nome Responsável </UiLabel>
            <UiInput v-model="nomeResponsavel" id="nomeResponsavel" placeholder="Nome Responsável" type="text"
              auto-capitalize="none" auto-complete="nomeResponsavel" auto-correct="off" class="h-12"
              :disabled="carregando" />
          </div>
          <div class="flex gap-4">
            <div class="flex flex-col flex-grow space-y-1.5">
              <UiLabel class="sr-only" for="celular"> Celular </UiLabel>
              <UiInput v-model="celular" id="celular" placeholder="Celular: xxxxxxxxxxx" type="tel" auto-capitalize="none"
                auto-complete="celular" auto-correct="off" class="h-12" :disabled="carregando" />
            </div>
            <div class="flex flex-col flex-grow space-y-1.5">
              <UiLabel class="sr-only" for="celularResponsavel"> Celular Responsável</UiLabel>
              <UiInput v-model="celularResponsavel" id="celularResponsavel" placeholder="Celular: xxxxxxxxxxx" type="tel"
                auto-capitalize="none" auto-complete="celularResponsavel" auto-correct="off" class="h-12"
                :disabled="carregando" />
            </div>
          </div>
          <div class="flex flex-col space-y-1.5">
            <UiLabel for="turma">Selecione a Turma</UiLabel>
            <select v-model="selectedTurma" id="turma" class="h-12" :disabled="carregando">
              <option disabled value="">Selecione</option>
              <option v-for="turma in turmas" :key="turma.id" :value="turma.id">{{ turma.nome }}</option>
            </select>
          </div>
          <UiButton type="submit" :disabled="carregando" class="h-12">
            <Icon name="lucide:loader-2" color="white" v-if="carregando" class="mr-2 h-4 w-4 animate-spin" />
            <p>Cadastrar</p>
          </UiButton>
          <p v-if="erro" class="text-red-500 text-center">{{ erro }}</p>
          <p v-if="success" class="text-green-500 text-center">{{ success }}</p>
        </div>
      </form>
    </UiCardContent>
  </div>
</template>