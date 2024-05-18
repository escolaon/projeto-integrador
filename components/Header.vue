<template>
  <header class="sticky top-0 z-30 border-b bg-background/50 backdrop-blur">
    <div class="container flex h-14 items-center justify-between">
      <div class="flex items-center gap-10">
        <div class="flex items-center ml-5 gap-5">
          <UiButton size="icon-sm" variant="outline" class="h-9 w-9 lg:hidden" @click="mobileNav = true">
            <Icon name="heroicons:bars-2" class="h-4 w-4" />
          </UiButton>
          <NuxtLink to="/" class="text-lg font-bold">
            <Icon name="solar:map-point-school-broken" class="h-8 w-8 text-green-600" />
            EscolaON
          </NuxtLink>
        </div>
      </div>
      <div class="flex items-center">
        <AppearanceSwitch @click="$colorMode.preference = $colorMode.value == 'dark' ? 'light' : 'dark'" />
        <UiDropdownMenu>
          <UiDropdownMenuTrigger as-child>
            <UiButton id="dropdown-button" class="h-10 w-10 rounded-full" variant="ghost" size="icon">
              <Icon name="fluent:person-12-regular" class="h-5 w-5 " />
            </UiButton>
          </UiDropdownMenuTrigger>
          <UiDropdownMenuContent align="end" :side-offset="5">
            <UiDropdownMenuItem v-for="(m, i) in profileMenu" :key="i" class="cursor-pointer" :icon="m.icon"
              :title="m.title" @click="profileGoto(m.value)" />
          </UiDropdownMenuContent>
        </UiDropdownMenu>
      </div>
    </div>
    <MobileNav v-model="mobileNav" :pages="pages" />
  </header>
</template>

<script lang="ts" setup>

  const modes = [
    { icon: "lucide:sun", title: "Light", value: "light" },
    { icon: "lucide:moon", title: "Dark", value: "dark" },
    { icon: "lucide:laptop", title: "System", value: "system" },
  ];

  const profileMenu = [
    { icon: "fluent:person-12-regular", title: "Perfil", value: "perfil" },
    { icon: "fluent:sign-out-20-regular", title: "Sair", value: "sair" },
  ];

  const props = defineProps<{
    pages: Page[];
  }>();

  type Page = {
    _path: string;
    title: string;
    icon?: string;
    label?: string;
  };

  const profileGoto = (val: string) => {
    if (val === "sair") {
      useAuth().signOut();
    } else {
      navigateTo("/" + val);
    }
  };

  const mobileNav = ref(false);

  const colorMode = useColorMode();
  const setTheme = (val: string) => {
    colorMode.preference = val;
  };

  const currentIcon = computed(() => {
    return modes.find((m) => m.value === colorMode?.preference)?.icon;
  });

</script>
