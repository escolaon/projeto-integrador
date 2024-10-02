<template>
  <div>
    <div class="mt-6 mb-6">
      <h3 class="text-2xl font-semibold">Perfil</h3>
    </div>
    <form @submit.prevent="onSubmit">
      <div class="grid w-full items-center gap-4">
        <div class="flex flex-col space-y-1.5">

          <UiLabel for="email">Email</UiLabel>
          <UiInput v-model="email" id="email" type="email" auto-capitalize="none" auto-complete="email"
            auto-correct="off" class="h-12" disabled />

          <UiLabel for="nome">Nome</UiLabel>
          <UiInput v-model="nome" id="nome" type="text" auto-capitalize="none" auto-complete="name" auto-correct="off"
            class="h-12" />

          <UiLabel for="celular">Celular</UiLabel>
          <UiInput v-model="celular" id="celular" type="tel" auto-capitalize="none" auto-complete="tel"
            auto-correct="off" class="h-12" />

          <UiLabel for="senha">Senha</UiLabel>
          <UiInput v-model="senha" id="senha" type="password" auto-capitalize="none" auto-complete="current-password"
            auto-correct="off" class="h-12" placeholder="********" />
        </div>
        <UiButton type="submit" class="h-12">
          <p>Salvar</p>
        </UiButton>
      </div>
    </form>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';

  const data = await $fetch('/api/session');

  const nome = ref('');
  const email = ref('');
  const celular = ref('');
  const senha = ref('');

  onMounted(() => {
    nome.value = data.nome;
    email.value = data.email;
    celular.value = data.celular;
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    const response = await $fetch('/api/perfil', {
      method: 'PUT',
      body: JSON.stringify({
        id: data.id,
        email: email.value,
        nome: nome.value,
        celular: celular.value,
        senha: senha.value,
      }),
    });
    if (response.statusCode === 200) {
      alert('Perfil atualizado com sucesso!');
    } else {
      alert('Erro ao atualizar perfil!');
    }
  };
</script>
