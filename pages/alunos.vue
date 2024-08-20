<!-- file: ~/pages/alunos.ts -->
<template>
    <div>
        <div class="mt-6 mb-6">
            <h3 class="text-2xl font-semibold">Alunos</h3>
        </div>

        <UiDatatable @ready="initializeTable" :options="options" :columns="columns" :data="data">
            <template #actions="{ cellData }" class="flex items-center m-0 p-0">
                <UiButton variant="outline" @click="edit(cellData, $event)" class="px-2 m-0 mr-2 h-8">
                    Editar
                </UiButton>
                <UiButton variant="destructive" @click="remove(cellData, $event)" class="px-2 m-0 ml-2 h-8">
                    Deletar
                </UiButton>
            </template>
        </UiDatatable>

        <AlertDialogRoot v-model:open="modalState">
            <AlertDialogPortal>
                <AlertDialogOverlay
                    class="bg-background/80 backdrop-blur-sm data-[state=open]:animate-overlayShow fixed inset-0 z-30">
                    <div
                        class="absolute h-full w-full dark:bg-[radial-gradient(theme(colors.border)_1px,transparent_1px)] bg-[radial-gradient(theme(colors.border)_1px,transparent_1px)] [background-size:15px_15px] [mask-image:radial-gradient(ellipse_600px_600px_at_50%_50%,#000_10%,transparent_100%)]">
                    </div>
                </AlertDialogOverlay>
                <AlertDialogContent
                    class="z-[100] text-[15px] data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[700px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-primary-foreground dark:bg-black p-[25px] shadow-[0_0px_50px_-30px_rgba(0,0,0,0.5)] dark:shadow-[0_0px_80px_-50px_rgba(0,0,0,0.5)] dark:shadow-gray-500 sm:w-[700px] focus:outline-none border border-input">
                    <AlertDialogTitle class="text-xl font-semibold mb-4">
                        {{ isEditing ? 'Editar Aluno' : 'Adicionar Novo Aluno' }}</AlertDialogTitle>
                    <AlertDialogDescription class="text-mauve11 mt-4 mb-5 text-[15px] leading-normal">
                        <form @submit.prevent="handleSave">
                            <div class="grid w-full items-center gap-4">

                                <div class="flex flex-col space-y-1.5">
                                    <UiLabel for="nome">Nome</UiLabel>
                                    <input id="nome" v-model="newAluno.nome" autocomplete="off" class="alert-input" />

                                    <UiLabel for="email">Email</UiLabel>
                                    <input id="email" v-model="newAluno.email" autocomplete="off" class="alert-input" />

                                    <UiLabel for="endereco">Endereço</UiLabel>
                                    <input id="endereco" v-model="newAluno.endereco" autocomplete="off"
                                        class="alert-input" />

                                    <UiLabel for="nomeResponsavel">Nome Responsável</UiLabel>
                                    <input id="nomeResponsavel" v-model="newAluno.nomeResponsavel" autocomplete="off"
                                        class="alert-input" />

                                    <UiLabel for="celularResponsavel">Celular Responsável</UiLabel>
                                    <input id="celularResponsavel" v-model="newAluno.celularResponsavel"
                                        autocomplete="off" class="alert-input" />

                                    <UiLabel for="turma">Turma</UiLabel>
                                    <select id="turma" v-model="selectedTurmaId" @change="updateSelectedTurmaName"
                                        class="alert-input">
                                        <option v-for="turma in turmas" :key="turma.id" :value="turma.id">{{
                                            turma.nome }}</option>
                                    </select>
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
    </div>
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
    } from 'radix-vue';

    const selectedRows = ref(0);
    const isEditing = ref(false);
    const modalState = ref(false);
    const editingRowIndex = ref<number | null>(null);
    const selectedTurmaId = ref('');

    const newAluno = reactive({
        id: null,
        nome: '',
        email: '',
        endereco: '',
        nomeResponsavel: '',
        celularResponsavel: '',
        turmaId: '',
    });

    const data = await $fetch<any>('http://localhost:3000/api/aluno');

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
            style: 'multi',
        },
        buttons: [
            {
                text: () => (selectedRows.value > 0 ? 'Desselecionar' : 'Selecionar Todos'),
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
                text: 'Novo',
                action: function (e, dt, node, config) {
                    isEditing.value = false;
                    Object.assign(newAluno, {
                        id: null,
                        nome: '',
                        email: '',
                        endereco: '',
                        nomeResponsavel: '',
                        celularResponsavel: '',
                        turmaId: '',
                    });
                    modalState.value = true;
                },
            },
        ],
    };

    const columns: ConfigColumns[] = [
        { data: 'id', title: 'Id' },
        { data: 'turmaId', title: 'Turma' },
        { data: 'nome', title: 'Nome' },
        { data: 'email', title: 'Email' },
        { data: 'nomeResponsavel', title: 'Nome Responsável' },
        { data: 'celularResponsavel', title: 'Celular Responsável' },
        {
            data: null,
            title: '',
            className: 'no-export',
            searchable: false,
            orderable: false,
            name: 'actions',
            render: '#actions',
            responsivePriority: 3,
        },
    ];

    async function remove(user: any, event: Event) {
        event.stopPropagation();
        await $fetch('http://localhost:3000/api/aluno', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
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
        Object.assign(newAluno, user);
        editingRowIndex.value = data.findIndex((item: any) => item.id === user.id);
        modalState.value = true;
    }

    async function handleSave() {
        if (isEditing.value) {
            const response = await $fetch(`http://localhost:3000/api/aluno`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newAluno),
            });
            const row = tableRef.value?.row(editingRowIndex.value);
            if (row) {
                row.data(response).draw(false);
                Object.assign(data[editingRowIndex.value], response);
            }
        } else {
            const response = await $fetch('http://localhost:3000/api/aluno', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...newAluno, turmaId: selectedTurmaId.value }),
            });
            tableRef.value?.row.add(response).draw();
            data.push(response);
        }

        modalState.value = false;
        Object.assign(newAluno, {
            id: null,
            nome: '',
            email: '',
            endereco: '',
            nomeResponsavel: '',
            celularResponsavel: '',
            turmaId: '',
        });
    }

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

    function bindActionButtons() {
        document.querySelectorAll('.edit-btn').forEach((button) => {
            button.addEventListener('click', () => {
                const row = tableRef.value?.row(button).data();
                edit(row);
            });
        });

        document.querySelectorAll('.remove-btn').forEach((button) => {
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

    const turmas = ref([]);

    onMounted(async () => {
        const response = await fetch('http://localhost:3000/api/turmas');
        const data = await response.json();
        turmas.value = data;
        console.log(data);
    });
</script>

<style scoped>
    .alert-input {
        @apply h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-[16px] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground file:hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm;
    }
</style>
