<template>
  <UiTabsContent value="Todos" class="mt-4">
    <UiDatatable @ready="tableRef = $event" :options="options" :columns="columns" :data="data">

      <template #actions="{ cellData }">
        <button @click="edit(cellData)">Editar</button> |
        <button @click="remove(cellData)">Excluir</button>
      </template>

    </UiDatatable>
  </UiTabsContent>



  <AlertDialogRoot v-model:open="modalState">
    <AlertDialogPortal>
      <AlertDialogOverlay
        class="bg-background/80 backdrop-blur-sm data-[state=open]:animate-overlayShow fixed inset-0 z-30" />
      <AlertDialogContent
        class="z-[100] text-[15px] data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-secondary p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px, _hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none shadow-xl">
        <AlertDialogTitle class="text-xl font-semibold mb-4">
          {{ isEditing ? 'Editar Usuário' : 'Adicionar Novo Usuário' }}
        </AlertDialogTitle>
        <AlertDialogDescription class="text-mauve11 mt-4 mb-5 text-[15px] leading-normal">
          <form @submit.prevent="handleSave">
            <div class="grid w-full items-center gap-4">
              <div class="flex flex-col space-y-1.5">

                <UiLabel for="nome" class=""> Nome </UiLabel>
                <input id="nome" v-model="newUser.nome" autocomplete="off" class="alert-input" />

                <UiLabel for="email"> Email </UiLabel>
                <input id="email" v-model="newUser.email" autocomplete="off" class="alert-input" />

                <UiLabel for="celular"> Celular </UiLabel>
                <input id="celular" v-model="newUser.celular" autocomplete="off" class="alert-input" />

              </div>
            </div>
          </form>
        </AlertDialogDescription>
        <div class="flex justify-end gap-[25px]">
          <AlertDialogCancel
            class="text-mauve11 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-semibold leading-none outline-none focus:shadow-[0_0_0_2px]">
            Voltar
          </AlertDialogCancel>
          <AlertDialogAction
            class="text-red11 bg-red4 hover:bg-red5 focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-semibold leading-none outline-none focus:shadow-[0_0_0_2px]"
            @click="handleSave()">
            {{ isEditing ? 'Atualizar' : 'Salvar' }}
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialogPortal>
  </AlertDialogRoot>
  <!-- Edit Button -->




</template>
<script lang="ts" setup>
  import { ref, shallowRef } from 'vue';
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

  const modalState = ref(false);
  const isEditing = ref(false);
  const editingRowIndex = ref<number | null>(null);

  const newUser = ref({
    id: null,
    nome: '',
    email: '',
    celular: '',
  });

  const options: Config = {
    dom: "<'flex flex-col lg:flex-row w-full lg:items-start lg:justify-between gap-5 mb-5 lg:pr-1'Bf><'border rounded-lg't><'flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between pt-3 p-5'li><'w-fit m-auto'p>",
    searching: true,
    language: languageBR,
    paging: true,
    ordering: true,
    responsive: true,
    autoWidth: true,
    select: {
      style: "multi",
      blurable: false,
    },
    buttons: [
      {
        text: "Selecionar Todos",
        action: function (e, dt, node, config) {
          dt.rows().select();
        },
      },
      {
        text: "Desselecionar",
        action: function (e, dt, node, config) {
          dt.rows().deselect();
        },
      },
      {
        text: "Novo",
        action: function (e, dt, node, config) {
          isEditing.value = false;
          newUser.value = { id: null, nome: '', email: '', celular: '' }; // Reset newUser object
          modalState.value = true;
        },
      }
    ],
  };
  const columns: ConfigColumns[] = [
    { data: "id", title: "Id" },
    { data: "nome", title: "Nome" },
    { data: "email", title: "Email" },
    { data: "celular", title: "Celular" },
    {
      data: null,
      title: "",
      className: "no-export",
      searchable: false,
      orderable: false,
      name: "actions",
      render: "#actions",
      responsivePriority: 1
    }
  ];

  const data = await $fetch<any>("http://localhost:3000/api/professor");

  const tableRef = shallowRef<InstanceType<typeof DataTableRef<any[]>> | null>(null);


  function remove(user: any) {

    $fetch("http://localhost:3000/api/professor", {
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

  function edit(user: any) {
    console.log(user);
    isEditing.value = true;
    newUser.value = { ...user };
    editingRowIndex.value = data.findIndex((item: any) => item.id === user.id);
    modalState.value = true;
  }


  async function handleSave() {
    if (isEditing.value) {
      // Editando um usuário existente
      const response = await $fetch(`http://localhost:3000/api/professor`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser.value),
      });

      // Atualize a linha específica na tabela
      const row = tableRef.value?.row(editingRowIndex.value);
      if (row) {
        row.data(response).draw(false);
      }
    } else {
      // Adicionando um novo usuário
      const response = await $fetch("http://localhost:3000/api/professor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser.value),
      });
      console.log(response);

      tableRef.value?.row.add(response).draw();
    }

    modalState.value = false;
    newUser.value = { id: null, nome: '', email: '', celular: '' }; // Reset newUser object
  }
</script>


<style scoped>
  .alert-input {
    @apply h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-[16px] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground file:hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm;
  }
</style>