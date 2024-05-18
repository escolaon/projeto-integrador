<template>
  <UiTabsContent value="Enviadas" class="mt-4">
    <UiDatatable @ready="initializeTable" :options="options" :columns="columns" :data="data">

    </UiDatatable>
  </UiTabsContent>
</template>

<script lang="ts" setup>
  import { ref, shallowRef, watch, reactive, onMounted } from 'vue';
  import type DataTableRef from 'datatables.net';
  import type { Config, ConfigColumns } from 'datatables.net';
  import languageBR from 'datatables.net-plugins/i18n/pt-BR.mjs';
  import {
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogOverlay,
    AlertDialogPortal,
    AlertDialogRoot,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from 'radix-vue';

  const selectedRows = ref(0);
  const isEditing = ref(false);
  const modalState = ref(false);
  const editingRowIndex = ref<number | null>(null);
  const selectedTurmaId = ref('');

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
        text: "Novo",
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



  // ------------------------------------------------------------

  watch(selectedRows, (newValue) => {
    const selectButton = tableRef.value?.button(0);
    if (selectButton) {
      selectButton.text(newValue > 0 ? 'Selecionar Nenhum' : 'Selecionar Todos');
    }
  });

  function initializeTable(instance: any) {
    tableRef.value = instance;
    tableRef.value?.on('select.dt deselect.dt', updateSelectedRowsCount);
    bindActionButtons();
  }


  function updateSelectedRowsCount() {
    selectedRows.value = tableRef.value?.rows({ selected: true }).count() || 0;
  }

  function bindActionButtons() {
    document.querySelectorAll('.edit-btn').forEach(button => {
      button.addEventListener('click', () => {
        const row = tableRef.value?.row(button).data();
        edit(row);
      });
    });

    document.querySelectorAll('.remove-btn').forEach(button => {
      button.addEventListener('click', () => {
        const row = tableRef.value?.row(button).data();
        remove(row);
      });
    });
  }

  watchEffect(() => {
    if (tableRef.value) {
      bindActionButtons();
    }
  });

  // ------------------------------------------------------------




  async function remove(user: any, event: Event) {
    event.stopPropagation();

    $fetch("http://localhost:3000/api/turmas", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: { user },
    }).then(() => {

      const row = tableRef.value?.row((idx, data) => data.id === user.id);
      if (row) {
        row.remove().draw(false);
      }
    });
  }


  function edit(user: any, event: Event) {
    event.stopPropagation();
    isEditing.value = true;
    Object.assign(newTurma, user);
    editingRowIndex.value = data.findIndex((item: any) => item.id === user.id);
    modalState.value = true;
  }


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