<script setup lang="ts">
import { ref, onMounted } from "vue";

const carregando = ref(false);
const selectedTurma = ref<number | null>(null);
const selectedDisciplina = ref<number | null>(null); 
const selectedProfessor = ref<number | null>(null); 
const turmas = ref<any[]>([]);
const disciplinas = ref<any[]>([]); 
const professores = ref<any[]>([]); 
const alunos = ref<any[]>([]);
const alunosSelecionados = ref<number[]>([]);
const erro = ref<string>("");
const success = ref<string>("");

async function onSubmit(event: Event) {
  try {
    event.preventDefault();
    
    if (!selectedTurma.value || !selectedDisciplina.value || !selectedProfessor.value || alunosSelecionados.value.length === 0) {
      throw new Error('Selecione uma turma, uma disciplina, um professor e pelo menos um aluno.');
    }
    
    carregando.value = true;

    for (const alunoId of alunosSelecionados.value) {
      const requestBody = {
        idTurma: selectedTurma.value,
        idAluno: alunoId,
        idProfessor: selectedProfessor.value,
        idDisciplina: selectedDisciplina.value 
      };

      await $fetch('/api/salva/ocorrencia', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });
    }

    carregando.value = false;
    success.value = "Ocorrências registradas com sucesso!";
    setTimeout(() => {
      success.value = "";
    }, 5000);
  } catch (error) {
    carregando.value = false;
    erro.value = "Erro ao salvar ocorrências no banco de dados";
    setTimeout(() => {
      erro.value = "";
    }, 5000);
  }
}

async function fetchAlunos() {
  if (!selectedTurma.value) return;
  carregando.value = true;
  try {
    const response = await fetch(`/api/busca/alunos?turmaId=${selectedTurma.value}`, {
      method: 'GET',
    });
    alunos.value = await response.json();
  } catch (error) {
    console.error("Erro ao carregar os alunos:", error);
    erro.value = "Erro ao carregar os alunos";
  } finally {
    carregando.value = false;
  }
}

async function fetchDisciplinas() {
  carregando.value = true;
  try {
    const response = await fetch('/api/busca/disciplinas');
    disciplinas.value = await response.json(); 
  } catch (error) {
    console.error("Erro ao carregar as disciplinas:", error);
    erro.value = "Erro ao carregar as disciplinas";
  } finally {
    carregando.value = false;
  }
}

async function fetchProfessores() {
  carregando.value = true;
  try {
    const response = await fetch('/api/busca/professores');
    professores.value = await response.json(); 
  } catch (error) {
    console.error("Erro ao carregar os professores:", error);
    erro.value = "Erro ao carregar os professores";
  } finally {
    carregando.value = false;
  }
}

onMounted(async () => {
  try {
    const response = await fetch('/api/busca/turmas');
    turmas.value = await response.json();
  } catch (error) {
    console.error("Erro ao carregar as turmas:", error);
    erro.value = "Erro ao carregar as turmas";
  }
});

onMounted(fetchDisciplinas);
onMounted(fetchProfessores);
</script>

<template>
  <div>
    <div class="flex items-center justify-center">
      <Icon name="solar:map-point-school-broken" class="h-16 w-16 text-green-600" />
    </div>
    <UiCardHeader class="flex flex-col space-y-4 text-center">
      <UiCardTitle class="text-2xl">Cadastro de Ocorrência</UiCardTitle>
    </UiCardHeader>
    <UiCardContent>
      <form @submit="onSubmit">
        <div class="grid w-full items-center gap-4">
          <div class="flex flex-col space-y-1.5">
            <UiLabel for="turma">Selecione a Turma</UiLabel>
            <select v-model="selectedTurma" id="turma" class="h-12" :disabled="carregando" @change="fetchAlunos">
              <option disabled value="">Selecione</option>
              <option v-for="turma in turmas" :key="turma.id" :value="turma.id">{{ turma.nome }}</option>
            </select>
          </div>
          <div class="flex flex-col space-y-1.5">
            <UiLabel for="disciplina">Selecione a Disciplina</UiLabel> 
            <select v-model="selectedDisciplina" id="disciplina" class="h-12" :disabled="carregando">
              <option disabled value="">Selecione</option>
              <option v-for="disciplina in disciplinas" :key="disciplina.id" :value="disciplina.id">{{ disciplina.nome }}</option>
            </select>
          </div>
          <div class="flex flex-col space-y-1.5">
            <UiLabel for="professor">Selecione o Professor</UiLabel> 
            <select v-model="selectedProfessor" id="professor" class="h-12" :disabled="carregando">
              <option disabled value="">Selecione</option>
              <option v-for="professor in professores" :key="professor.id" :value="professor.id">{{ professor.nome }}</option>
            </select>
          </div>
          <div v-if="alunos.length">
            <p>Alunos da turma selecionada:</p>
            <div v-for="aluno in alunos" :key="aluno.id" class="flex items-center space-x-2">
              <input type="checkbox" :id="`aluno-${aluno.id}`" v-model="alunosSelecionados" :value="aluno.id">
              <label :for="`aluno-${aluno.id}`">{{ aluno.nome }}</label>
            </div>
          </div>
          <UiButton type="submit" :disabled="carregando" class="h-12">
            <Icon name="lucide:loader-2" color="white" v-if="carregando" class="mr-2 h-4 w-4 animate-spin" />
            <p>Salvar</p>
          </UiButton>
          <p v-if="erro" class="text-red-500 text-center">{{ erro }}</p>
          <p v-if="success" class="text-green-500 text-center">{{ success }}</p>
        </div>
      </form>
    </UiCardContent>
  </div>
</template>
