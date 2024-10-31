<template>
  <div>
    <div class="mt-6 mb-6">
      <h3 class="text-2xl font-semibold">Informações de Alunos</h3>
    </div>

    <UiDatatable @ready="initializeTable" :options="options" :columns="columns" :data="data">
      <template #actions="{ cellData }" class="flex items-center m-0 p-0"></template>
    </UiDatatable>

    <div class="chart-container mt-6">
      <canvas id="comparacaoChart" ref="comparacaoChart"></canvas>
    </div>

    <AlertDialogRoot v-model:open="modalState">
      <AlertDialogPortal>
        <AlertDialogOverlay class="bg-background/80 backdrop-blur-sm data-[state=open]:animate-overlayShow fixed inset-0 z-30">
          <div class="absolute h-full w-full dark:bg-[radial-gradient(theme(colors.border)_1px,transparent_1px)] bg-[radial-gradient(theme(colors.border)_1px,transparent_1px)] [background-size:15px_15px] [mask-image:radial-gradient(ellipse_600px_600px_at_50%_50%,#000_10%,transparent_100%)]" />
        </AlertDialogOverlay>
        <AlertDialogContent class="z-[100] text-[15px] data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[700px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-primary-foreground dark:bg-black p-[25px] shadow-[0_0px_50px_-30px_rgba(0,0,0,0.5)] dark:shadow-[0_0px_80px_-50px_rgba(0,0,0,0.5)] dark:shadow-gray-500 sm:w-[700px] focus:outline-none border border-input">
          <div class="flex justify-end gap-[25px]">
            <AlertDialogCancel class="text-mauve11 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-semibold leading-none outline-none focus:shadow-[0_0_0_2px]">Voltar</AlertDialogCancel>
          </div>
        </AlertDialogContent>
      </AlertDialogPortal>
    </AlertDialogRoot>
  </div>
</template>

<script lang="ts" setup>
import { ref, shallowRef, onMounted, nextTick } from 'vue';
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
import { Chart, registerables } from 'chart.js';

const config = useRuntimeConfig()

Chart.register(...registerables);

const modalState = ref(false);
const data = ref<any[]>([]);
const todosAlunos = ref<any[]>([]);
const atividades = ref<any[]>([]);
const tableRef = shallowRef<InstanceType<typeof DataTableRef<any[]>> | null>(null);
const comparacaoChart = ref<HTMLCanvasElement | null>(null);

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
      extend: 'pdfHtml5',
      text: 'Exportar PDF',
      title: 'Relatório de Notas e Médias dos Alunos',
      exportOptions: {
        columns: ':visible',
        format: {
          body: function (data, row, column, node) {
            let text = node.innerText || node.textContent;
            text = text.replace(/[▼]/g, '').trim(); 
            return text;
          }
        }
      }
    },
  ],
  columnDefs: [
    {
      targets: [1, 2],
      visible: true,
    },
    {
      targets: [0],
      visible: false,
    },
  ]
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

      return `
        <span style="cursor: pointer;" class="media-wrapper">
          ${media.toFixed(1)}
          <span class="arrow">▼</span>
        </span>
        <div class="atividades-list" style="display: none;">
          ${alunoAtividades.map(atividade => `<small>${atividade.nome}: ${atividade.nota.toFixed(1)}</small>`).join('<br/>')}
        </div>
      `;
    }
  },
];

const tableContainer = ref<HTMLElement | null>(null);

function initializeTable(instance: any) {
  tableRef.value = instance;
  tableContainer.value = instance.table().node();
}

const { data: sessionData } = await useFetch('/api/session');
const userType = sessionData.value?.tipo;
const userEmail = sessionData.value?.email;

onMounted(async () => {
  const responseAtividades = await fetch(`${config.public.url}/api/atividade`);
  const atividadesData = await responseAtividades.json();
  atividades.value = atividadesData; 
  const alunos = (await fetch(`${config.public.url}/api/aluno`));
  const response = await fetch(`${config.public.url}/api/aluno?type=${encodeURIComponent(userType)}&email=${encodeURIComponent(userEmail)}`);
  if (!response.ok) {
      console.error('Erro ao buscar os alunos:', response.statusText);
      return;
  }

  todosAlunos.value = await alunos.json();
  const alunoData = await response.json();
  data.value = alunoData;

  tableContainer.value?.addEventListener('click', function(e) {
    const target = e.target as HTMLElement;

    if (target.classList.contains('arrow')) {
      const atividadesList = target.closest('.media-wrapper')?.nextElementSibling as HTMLElement;

      if (atividadesList) {
        atividadesList.style.display = (atividadesList.style.display === 'none' || atividadesList.style.display === '') ? 'block' : 'none';
      } else {
        console.error("Lista de atividades não encontrada");
      }
    }
  });

  await nextTick();
  createComparacaoChart();
});

function createComparacaoChart() {
  const ctx = comparacaoChart.value?.getContext('2d');

  const alunosDaTurma = todosAlunos.value.filter(aluno => {
    return aluno.turmaId === data.value[0].turmaId;
  });

  const alunoMedias = data.value.map(aluno => {
    const alunoAtividades = atividades.value.filter(atividade => atividade.alunoId === aluno.id);
    return alunoAtividades.length > 0 
      ? alunoAtividades.reduce((acc, cur) => acc + cur.nota, 0) / alunoAtividades.length 
      : null; 
  });

  const turmaMedias = alunosDaTurma.map(aluno => {
    const alunoAtividades = atividades.value.filter(atividade => atividade.alunoId === aluno.id);
    return alunoAtividades.length > 0 
        ? alunoAtividades.reduce((acc, cur) => acc + cur.nota, 0) / alunoAtividades.length 
        : null; 
  });

  const validMedias = turmaMedias.filter(media => (media === null ? 0 : media)) as number[];
  const somaMediasValidas = validMedias.reduce((acc, cur) => acc + cur, 0);
  const turmaMedia = somaMediasValidas / alunosDaTurma.length;

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.value.map(aluno => aluno.nome),
      datasets: [
        {
          label: 'Média do Aluno',
          data: alunoMedias.map(media => media !== null ? media : 0),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
        {
          label: 'Média da Turma',
          data: Array(data.value.length).fill(turmaMedia), 
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Média',
          },
        },
        x: {
          title: {
            display: true,
            text: 'Alunos',
          },
        },
      },
    },
  });
}
</script>

<style scoped>
.media-wrapper {
  position: relative;
}

.atividades-list {
  display: none;
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  padding: 10px;
  z-index: 1000;
}
</style>
