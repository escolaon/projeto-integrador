<template>
  <UiTabsContent value="Todos">
    <UiCard title="Todos" class="border-none shadow-none"
      description="Selecione os alunos que deseja enviar a notificação">

      <template #content>
        <UiCardContent class="space-y-2">


          <UiDatatable :options="options" :columns="columns" :data="users">

            <!-- Edit Button -->
            <template #actions="{ cellData }: { cellData: Staff }">
              <UiButton class="h-7 text-xs" size="sm" @click.stop="
                useSonner('Editing...', {
                  description: `You are editing the user ${cellData?.name}.`,
                })">
                Edit
              </UiButton>
            </template>
            <!-- Edit Button -->

          </UiDatatable>


        </UiCardContent>
      </template>
    </UiCard>
  </UiTabsContent>
</template>


<script lang="ts" setup>
  import { fakerPT_BR as faker } from "@faker-js/faker";
  import type { DataTablesNamedSlotProps } from "~/components/Ui/Datatable.client.vue";
  import type { Config, ConfigColumns } from "datatables.net";

  interface Staff {
    name: string;
    position: string;
    office: string;
    age: number;
    start_date: string;
    salary: string;
  }

  const { data: users } = await useAsyncData<Staff[]>(
    "fakerUsers",
    () => {
      return new Promise((resolve) => {
        // create 1000 fake users
        const users = Array.from({ length: 8 }, () => {
          return {
            name: faker.person.fullName(),
            position: faker.person.jobTitle(),
            office: faker.location.city(),
            age: faker.number.int(80),
            start_date: useDateFormat(faker.date.past().toISOString(), "MMMM DD, YYYY").value,
            salary: faker.finance.amount({ symbol: "R$" }),
          };
        });
        resolve(users);
      });
    },
    { default: () => [] }
  );

  const columns: ConfigColumns[] = [
    { data: "name", title: "Name" },
    { data: "position", title: "Position" },
    { data: "office", title: "Office" },
    { data: "age", title: "Age" },
    { data: "start_date", title: "Start date" },
    { data: "salary", title: "Salary" },
    {
      data: null,
      title: "",
      className: "no-export",
      searchable: false,
      orderable: false,
      name: "actions",
      render: "#actions",
      responsivePriority: 1,
    },
  ];

  const options: Config = {
    buttons: [
      {
        extend: "colvis",
        text: "Columns",
        columns: ":not(.no-export)",
      },
      "selectAll",
      "selectNone",
      "copy",
      "excel",
      "pdf"
    ],
    dom: "Q<'flex flex-col lg:flex-row w-full lg:items-start lg:justify-between gap-5 mb-5'Bf><'border rounded-lg't><'flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between pt-3 p-5'li><''p>",
    responsive: true,
    autoWidth: true,
    select: {
      style: "multi",
      blurable: false,
    }
  };
</script>
