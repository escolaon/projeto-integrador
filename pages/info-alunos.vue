<template>
    <div>
      <div class="mt-6 mb-6">
        <h3 class="text-2xl font-semibold">
          Informações de Alunos
        </h3>
      </div>
  
      <UiDatatable @ready="initializeTable" :options="options" :columns="columns" :data="data">
        <template #actions="{ cellData }" class="flex items-center m-0 p-0">
        </template>
      </UiDatatable>
  
      <AlertDialogRoot v-model:open="modalState">
        <AlertDialogPortal>
          <AlertDialogOverlay class="bg-background/80 backdrop-blur-sm data-[state=open]:animate-overlayShow fixed inset-0 z-30">
            <div class="absolute h-full w-full dark:bg-[radial-gradient(theme(colors.border)_1px,transparent_1px)] bg-[radial-gradient(theme(colors.border)_1px,transparent_1px)] [background-size:15px_15px] [mask-image:radial-gradient(ellipse_600px_600px_at_50%_50%,#000_10%,transparent_100%)]" />
          </AlertDialogOverlay>
          <AlertDialogContent class="z-[100] text-[15px] data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[700px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-primary-foreground dark:bg-black p-[25px] shadow-[0_0px_50px_-30px_rgba(0,0,0,0.5)] dark:shadow-[0_0px_80px_-50px_rgba(0,0,0,0.5)] dark:shadow-gray-500 sm:w-[700px] focus:outline-none border border-input">
            <div class="flex justify-end gap-[25px]">
              <AlertDialogCancel class="text-mauve11 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-semibold leading-none outline-none focus:shadow-[0_0_0_2px]">
                Voltar
              </AlertDialogCancel>
            </div>
          </AlertDialogContent>
        </AlertDialogPortal>
      </AlertDialogRoot>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, shallowRef, onMounted } from 'vue';
  import type DataTableRef from 'datatables.net';
  import type { Config, ConfigColumns } from 'datatables.net';
  import languageBR from 'datatables.net-plugins/i18n/pt-BR.mjs';
  import {
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogPortal,
    AlertDialogRoot,
  } from 'radix-vue';
  
  const modalState = ref(false);
  const data = ref<any[]>([]);
  const atividades = ref<any[]>([]);
  const tableRef = shallowRef<InstanceType<typeof DataTableRef<any[]>> | null>(null);
  
  const options: Config = {
    dom: "<'flex flex-col lg:flex-row w-full lg:items-start lg:justify-between gap-5 mb-5 lg:pr-1'Bf><'border rounded-lg't><'flex flex-col lg:flex-row gap-5 items-center lg:justify-between w-full pt-3 p-5 m-auto'lp>",
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
  
  const columns: ConfigColumns[] = [
    { data: "id", title: "Id" },
    { data: "nome", title: "Nome" },
    { 
      data: null, 
      title: "Média das Atividades", 
      render: (row) => {
        const alunoAtividades = atividades.value.filter(atividade => atividade.alunoId === row.id);
        const media = alunoAtividades.length > 0 
          ? alunoAtividades.reduce((acc, cur) => acc + cur.nota, 0) / alunoAtividades.length 
          : 0;
        return media.toFixed(2); 
      }
    },
    {
      data: null,
      title: "",
      className: "no-export",
      searchable: false,
      orderable: false,
      name: "actions",
      render: "#actions",
      responsivePriority: 3,
    }
  ];
  
  const { data: sessionData } = await useFetch('/api/session');
  const userType = sessionData.value?.tipo;
  const userEmail = sessionData.value?.email;
  
  function initializeTable(instance: any) {
    tableRef.value = instance;
  }
  
  onMounted(async () => {
    const responseAtividades = await fetch('http://localhost:3000/api/atividade');
    const atividadesData = await responseAtividades.json();
    atividades.value = atividadesData; 
  });
  
  onMounted(async () => {  
    const response = await fetch(`http://localhost:3000/api/aluno?type=${encodeURIComponent(userType)}&email=${encodeURIComponent(userEmail)}`);
    if (!response.ok) {
        console.error('Erro ao buscar os alunos:', response.statusText);
        return;
    }
    const alunoData = await response.json();
    data.value = alunoData;
  });
  </script>
  
  <style scoped>
  .alert-input {
    @apply h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-[16px] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground file:hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm;
  }
  </style>
  