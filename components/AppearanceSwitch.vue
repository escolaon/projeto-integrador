<template>
  <div class="h-9 w-9 flex items-center">
    <Icon v-if="$colorMode.value == 'dark' " :name="'lucide:moon'" class="h-5 w-5 "/>
    <Icon v-else :name="'lucide:sun'" class="h-5 w-5 "/>
  </div>
</template>