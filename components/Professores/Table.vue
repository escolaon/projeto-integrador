<template>
  <div>
    <UiDatatable @ready="initializeTable" :options="options" :columns="columns" :data="data">
      <template #actions="{ cellData }">
        <UiButton variant="outline" @click="edit(cellData)" class="px-2 m-0 mr-2 h-8">
          Editar
        </UiButton>
        <UiButton variant="destructive" @click="remove(cellData)" class="px-2 m-0 ml-2 h-8">
          Deletar
        </UiButton>
      </template>
    </UiDatatable>
  </div>
</template>

<script lang="ts" setup>
  import { ref, shallowRef, watch } from 'vue';

  const { data, options, columns, tableRef, selectedRows, initializeTable, edit, remove } = useProfessores();

  watch(selectedRows, (newValue) => {
    const selectButton = tableRef.value?.button(0);
    if (selectButton) {
      selectButton.text(newValue > 0 ? 'Selecionar Nenhum' : 'Selecionar Todos');
    }
  });
</script>
