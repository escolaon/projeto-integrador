  <script setup lang="ts">
  import { ref } from "vue";
  import { fetchTurmas } from "../server/turmas";
  
  const nome = ref("");
  const email = ref("");
  const endereco = ref("");
  const nomeResponsavel = ref("");
  const telefone = ref("");
  const telefoneResponsavel = ref("");
  const celular = ref("");
  const carregando = ref(false);
  const selectedTurma = ref<number | null>(null);
  const turmas = ref<any[]>([]);
  
  async function onSubmit(event: Event) {
    event.preventDefault();
  
    if (!nome.value || !email.value || !celular.value || !endereco.value || !nomeResponsavel.value || !telefone.value ||
      !telefoneResponsavel.value || !selectedTurma.value) {
      console.log("Todos os campos são obrigatórios");
      return;
    }
  
    carregando.value = true;
  
    try {
      carregando.value = false;
      console.log("Aluno cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar aluno no banco de dados:", error);
      carregando.value = false;
    }
  }
  
  import { onMounted } from "vue";
  onMounted(async () => {
    try {
      carregando.value = true;
      turmas.value = await fetchTurmas();
      carregando.value = false;
    } catch (error) {
      console.error("Erro ao carregar as turmas:", error);
      carregando.value = false;
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
              <UiInput v-model="email" id="email" placeholder="name@example.com" type="email" auto-capitalize="none"
                auto-complete="email" auto-correct="off" class="h-12" :disabled="carregando" />
            </div>
            <div class="flex flex-col space-y-1.5">
              <UiLabel class="sr-only" for="endereco"> Celular </UiLabel>
              <UiInput v-model="celular" id="endereco" placeholder="Rua A" type="tel" auto-capitalize="none"
                auto-complete="endereco" auto-correct="off" class="h-12" :disabled="carregando" />
            </div>
            <div class="flex flex-col space-y-1.5">
              <UiLabel class="sr-only" for="nomeResponsavel"> Nome Responsável </UiLabel>
              <UiInput v-model="nomeResponsavel" id="nomeResponsavel" placeholder="Nome Responsável" type="text" auto-capitalize="none"
                auto-complete="nomeResponsavel" auto-correct="off" class="h-12" :disabled="carregando" />
            </div>
            <div class="flex gap-4">
              <div class="flex flex-col flex-grow space-y-1.5">
                <UiLabel class="sr-only" for="telefone"> Telefone </UiLabel>
                <UiInput v-model="telefone" id="telefone" placeholder="Telefone: (xx)-xxxxx-xxxx" type="tel" auto-capitalize="none"
                  auto-complete="telefone" auto-correct="off" class="h-12" :disabled="carregando" />
              </div>
              <div class="flex flex-col flex-grow space-y-0.5">
                <UiLabel class="sr-only" for="telefoneResponsavel"> Telefone Responsável</UiLabel>
                <UiInput v-model="telefoneResponsavel" id="telefoneResponsavel" placeholder="Telefone Responsável: (xx)-xxxxx-xxxx" type="tel" auto-capitalize="none"
                  auto-complete="telefoneResponsavel" auto-correct="off" class="h-12" :disabled="carregando" />
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
          </div>
        </form>
      </UiCardContent>
    </div>
  </template>