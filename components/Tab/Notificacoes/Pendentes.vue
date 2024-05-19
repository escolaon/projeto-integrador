<template>
  <UiTabsContent value="Pendentes" class="mt-4">
    <UiDatatable @ready="initializeTable" :options="options" :columns="columns" :data="data">
    </UiDatatable>
  </UiTabsContent>
</template>

<script lang="ts" setup>
  import { shallowRef, watch } from 'vue';
  import type DataTableRef from 'datatables.net';
  import type { Config, ConfigColumns } from 'datatables.net';
  import languageBR from 'datatables.net-plugins/i18n/pt-BR.mjs';

  const tableRef = shallowRef<InstanceType<typeof DataTableRef<any[]>> | null>(null);
  const selectedRows = ref(0);

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
    },
    buttons: [
      {
        text: (selectedRows.value > 0 ? "Desselecionar" : "Selecionar Todos"),
        action: function (e, dt, node, config) {
          if (selectedRows.value > 0) {
            dt.rows().deselect();
            selectedRows.value = 0;
          } else {
            dt.rows().select();
            selectedRows.value = dt.rows({ selected: true }).count();
          }
        },
      },
      {
        text: "Enviar",
        action: async function (e, dt, node, config) {
          const selectedRows = dt.rows({ selected: true }).data();
          if (selectedRows.length > 0) {
            const rows = selectedRows.map((item: any) => item.id);
            for (let i = 0; i < rows.length; i++) {
              const id = rows[i];
              await $fetch(`http://localhost:3000/api/notificacao`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
              });
            }
          }
          dt.rows({ selected: true }).remove().draw(false);
        },
      }
    ],
  };

  const dataFetched = await $fetch<any>("http://localhost:3000/api/notificacao/pendente");
  let data: any[] = [];
  if (dataFetched) {
    data = dataFetched.map((item: any) => {
      return {
        id: item.id,
        createdAt: new Date(item.createdAt).toLocaleDateString("pt-BR"),
        turmaNome: item.turmaNome,
        alunoNome: item.alunoNome,
        celular: item.celular,
        mensagem: item.mensagem,
      };
    });
  }
  const columns: ConfigColumns[] = [
    { data: "id", title: "Id" },
    { data: "createdAt", title: "Data" },
    { data: "turmaNome", title: "Turma" },
    { data: "alunoNome", title: "Aluno" },
    { data: "celular", title: "Celular" },
    { data: "mensagem", title: "Mensagem" },
  ];


  // --Change state of Select Button  ---------------------------

  watch(selectedRows, (newValue) => {
    const selectButton = tableRef.value?.button(0);
    if (selectButton) {
      selectButton.text(newValue > 0 ? 'Selecionar Nenhum' : 'Selecionar Todos');
    }
  });

  function initializeTable(instance: any) {
    tableRef.value = instance;
    tableRef.value?.on('select.dt deselect.dt', updateSelectedRowsCount);
  }


  function updateSelectedRowsCount() {
    selectedRows.value = tableRef.value?.rows({ selected: true }).count() || 0;
  }
  // ------------------------------------------------------------



</script>

<style scoped>
  .alert-input {
    @apply h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-[16px] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground file:hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm;
  }
</style>