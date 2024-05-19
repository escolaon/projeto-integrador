<template>
  <UiTabsContent value="Enviadas" class="mt-4">
    <UiDatatable :options="options" :columns="columns" :data="data">
    </UiDatatable>
  </UiTabsContent>
</template>

<script lang="ts" setup>
  import type { Config, ConfigColumns } from 'datatables.net';
  import languageBR from 'datatables.net-plugins/i18n/pt-BR.mjs';


  const options: Config = {

    dom: "<'flex flex-col lg:flex-row w-full lg:items-start lg:justify-between gap-5 mb-5 lg:pr-1'<>f><'border rounded-lg't><'flex flex-col lg:flex-row gap-5 items-center lg:justify-between w-full pt-3 p-5 m-auto'lp>",
    searching: true,
    language: languageBR,
    paging: true,
    ordering: true,
    responsive: true,
    autoWidth: true,
    select: {
      style: "multi",
    }
  };

  const dataFetched = await $fetch<any>("http://localhost:3000/api/notificacao/enviadas");
  const data = dataFetched.map((item: any) => {
    return {
      id: item.id,
      createdAt: new Date(item.createdAt).toLocaleDateString("pt-BR"),
      turmaNome: item.turmaNome,
      alunoNome: item.alunoNome,
      celular: item.celular,
      mensagem: item.mensagem,
    };
  });

  const columns: ConfigColumns[] = [
    { data: "id", title: "Id" },
    { data: "createdAt", title: "Data" },
    { data: "turmaNome", title: "Turma" },
    { data: "alunoNome", title: "Aluno" },
    { data: "celular", title: "Celular" },
    { data: "mensagem", title: "Mensagem" },
  ];


</script>

<style scoped>
  .alert-input {
    @apply h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-[16px] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground file:hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm;
  }
</style>