import { ref, shallowRef, reactive, watchEffect } from 'vue';
import type DataTableRef from 'datatables.net';
import type { Config, ConfigColumns } from 'datatables.net';
import languageBR from 'datatables.net-plugins/i18n/pt-BR.mjs';

export function useProfessores() {
  const selectedRows = ref(0);
  const isEditing = ref(false);
  const modalState = ref(false);
  const editingRowIndex = ref<number>(-1);

  const newUser = reactive({
    id: null,
    nome: '',
    email: '',
    celular: '',
  });

  const data = ref<any[]>([]);
  
  async function fetchData() {
    data.value = await $fetch<any>("http://localhost:3000/api/professor");
  }

  fetchData();

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
        text: () => (selectedRows.value > 0 ? "Desselecionar" : "Selecionar Todos"),
        action: function (e, dt) {
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
        action: function () {
          isEditing.value = false;
          Object.assign(newUser, { id: null, nome: '', email: '', celular: '' });
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
      responsivePriority: 3,
    }
  ];

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

  async function remove(user: any) {
    await $fetch("http://localhost:3000/api/professor", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: { user },
    });
    const row = tableRef.value?.row((idx, data) => data.id === user.id);
    if (row) {
      row.remove().draw(false);
    }
  }

  function edit(user: any) {
    isEditing.value = true;
    Object.assign(newUser, user);
    editingRowIndex.value = data.value.findIndex((item: any) => item.id === user.id);
    modalState.value = true;
  }

  async function handleSave() {
    if (isEditing.value) {
      const response = await $fetch<any>(`http://localhost:3000/api/professor`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      const row = tableRef.value?.row(editingRowIndex.value);
      if (row) {
        row.data(response).draw(false);
        Object.assign(data.value[editingRowIndex.value], response);
      }
    } else {
      const response = await $fetch<any>("http://localhost:3000/api/professor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      tableRef.value?.row.add(response).draw();
      data.value.push(response);
    }
    modalState.value = false;
    Object.assign(newUser, { id: null, nome: '', email: '', celular: '' });
  }

  return { data, options, columns, tableRef, selectedRows, isEditing, modalState, newUser, initializeTable, edit, remove, handleSave };
}
