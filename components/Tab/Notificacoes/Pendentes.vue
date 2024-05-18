<template>
  <UiTabsContent value="Pendentes" class="mt-4">
    <UiDatatable :options="options" :columns="columns" :data="data">
    </UiDatatable>
  </UiTabsContent>
</template>

<script lang="ts" setup>
  import { ref, shallowRef, watch, reactive, onMounted } from 'vue';
  import type DataTableRef from 'datatables.net';
  import type { Config, ConfigColumns } from 'datatables.net';
  import languageBR from 'datatables.net-plugins/i18n/pt-BR.mjs';


  const selectedRows = ref(0);
  const isEditing = ref(false);
  const modalState = ref(false);
  const editingRowIndex = ref<number | null>(null);

  const newTurma = reactive({
    id: null,
    nome: '',
  });

  const data = await $fetch<any>("http://localhost:3000/api/turmas");

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
    },
    buttons: [
      {
        text: "Enviar",
        action: function (e, dt, node, config) {
          isEditing.value = false;
          Object.assign(newTurma, { id: null, nome: '' });
          modalState.value = true;
        },
      }
    ],
  };
  const columns: ConfigColumns[] = [
    { data: "id", title: "Id" },
    { data: "nome", title: "Nome" }
  ];


  async function handleSave() {
    if (isEditing.value) {
      const response = await $fetch(`http://localhost:3000/api/turmas`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTurma),
      });

      const row = tableRef.value?.row(editingRowIndex.value);
      if (row) {
        row.data(response).draw(false);
        Object.assign(data[editingRowIndex.value], response);
      }
    } else {
      const response = await $fetch("http://localhost:3000/api/turmas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome: newTurma.nome }),
      });

      tableRef.value?.row.add(response).draw();
      data.push(response);
    }

    modalState.value = false;
    Object.assign(newTurma, { id: null, nome: '' });
  }

  const turmas = ref([]);

  onMounted(async () => {
    const response = await fetch('http://localhost:3000/api/turmas');
    const data = await response.json();
    turmas.value = data;
  });
</script>


<style scoped>
  .alert-input {
    @apply h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-[16px] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground file:hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm;
  }
</style>