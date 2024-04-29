<template>
  <div class="bg-primary px-5 py-4 rounded-2xl text-slate-100 h-full w-full flex flex-col">
    <div class="flex mt-3 justify-between items-center">
      <!-- Logo -->
      <div class="flex items-center gap-2">
        <PlaceholderIcon class="stroke-white stroke-2 w-6 h-6" />
        <h1 class="font-medium">Untitled UI</h1>
      </div>
      <!-- Close arrow -->
      <button @click="$emit('closeModal')">
        <ArrowLeft class="stroke-white stroke-2 w-3 h-3" />
      </button>
    </div>

    <!-- Search input -->
    <div class="mt-6 flex items-center bg-primary-light rounded-md text-sm py-2.5 px-2 gap-x-3">
      <SearchIcon class="stroke-white stroke-2 w-4 h-4" />
      <input placeholder="Search" type="search" class="grow bg-transparent outline-none placeholder:text-slate-300" />
    </div>

    <!-- Nav menu -->
    <nav class="mt-7 space-y-2 grow w-full overflow-y-auto">
      <template v-for="(n, i) in nav" :key="`navItem-${i}`">
        <HeadlessDisclosure as="div">
          <HeadlessDisclosureButton
            class="outline-none focus:bg-primary-light w-full flex items-center px-3 py-2.5 text-slate-200 rounded-md text-sm gap-x-3 hover:bg-primary-light lg:ui-open:bg-primary-light">
            <component :is="n.icon" class="stroke-slate-300 stroke-2 w-5 h-5" />
            <span>{{ n.title }}</span>
            <span v-if="n.items && n.items.length" class="ml-auto">
              <ChevronDown class="stroke-white stroke-2 w-3 h-3 ui-open:rotate-180 transition-all duration-300" />
            </span>
          </HeadlessDisclosureButton>

          <HeadlessDisclosurePanel class="flex flex-col px-3 text-sm origin-top py-1" v-if="n.items && n.items.length">
            <template v-for="(child, k) in n.items" :key="`child-${i}-${k}`">
              <NuxtLink
                class="outline-none focus:bg-primary-light group px-3 pl-8 py-2.5 rounded-md hover:bg-primary-light w-full flex items-center gap-x-5"
                to="#">
                <span
                  class="w-2 h-2 rounded-full bg-white scale-0 group-hover:scale-100 transition duration-300"></span>
                <span>
                  {{ child.title }}
                </span>
              </NuxtLink>
            </template>
          </HeadlessDisclosurePanel>
        </HeadlessDisclosure>
      </template>
    </nav>
    <!-- Bottom section -->
    <div>
      <!-- Bttom nav -->
      <nav class="space-y-1">
        <NuxtLink to="#"
          class="outline-none focus:bg-primary-light flex items-center px-3 py-2.5 text-slate-200 rounded-md text-sm gap-x-3 hover:bg-primary-light">
          <Chat class="stroke-slate-300 stroke-2 w-5 h-5" />
          <span>Support</span>
        </NuxtLink>
        <NuxtLink to="#"
          class="outline-none focus:bg-primary-light flex items-center px-3 py-2.5 text-slate-200 rounded-md text-sm gap-x-3 hover:bg-primary-light">
          <Setting class="stroke-slate-300 stroke-2 w-5 h-5" />
          <span>Setting</span>
        </NuxtLink>
      </nav>

      <!-- Profile metadata -->
      <div class="mt-5 flex items-center px-4 py-3 rounded-xl bg-primary-light">
        <img src="https://randomuser.me/api/portraits/med/women/75.jpg" alt="Logged in user"
          class="w-11 h-11 rounded-full object-cover" />
        <div class="ml-3">
          <h3 class="text-sm">Frankie Sullivan</h3>
          <p class="text-xs">@frankie</p>
        </div>
        <span class="ml-auto">
          <ChevronVertical class="stroke-2 stroke-white w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
// icons
import PlaceholderIcon from "@/assets/icons/placeholder.svg";
import ArrowLeft from "@/assets/icons/arrow-left.svg";
import SearchIcon from "@/assets/icons/search.svg";
import HomeIcon from "@/assets/icons/home.svg";
import DashboardIcon from "@/assets/icons/dashboard.svg";
import ChevronDown from "@/assets/icons/chevron-down.svg";
import ChevronVertical from "@/assets/icons/chevron-vertical.svg";
import Folder from "@/assets/icons/folder.svg";
import Check from "@/assets/icons/check.svg";
import PieChart from "@/assets/icons/pie-chart.svg";
import Chat from "@/assets/icons/chat.svg";
import Setting from "@/assets/icons/setting.svg";

//nav items
const nav = [
  { title: "Home", icon: HomeIcon, items: [] },
  {
    title: "Dashboard",
    icon: DashboardIcon,
    items: [
      { title: "Overview" },
      { title: "Reporting" },
      { title: "Sources" },
      { title: "User Dashboard" },
    ],
  },
  {
    title: "Projects",
    icon: Folder,
    items: [
      { title: "Real Estate" },
      { title: "Car Dealership" },
      { title: "Track & Field" },
      { title: "Loan Manager" },
      { title: "eCommerce" },
    ],
  },
  {
    title: "Taks",
    icon: Check,
    items: [
      { title: "Meet w/ Dave" },
      { title: "Prepare Conf Speech" },
      { title: "Interview Designer" },
      { title: "Ask for permission" },
    ],
  },
  {
    title: "Reporting",
    icon: PieChart,
    items: [{ title: "SWOT Analysis" }, { title: "Traffic Report" }],
  },
];
</script>
