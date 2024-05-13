<template>

  <div v-for="(item, index) in items" :key="index">
    <UiLabel for="nome"> Nome </UiLabel>
    <input id="nome" v-model="nome" class="input" :value=cellData?.nome />
  </div>

</template>

<script lang="ts" setup>
  const props = defineProps < {
    id: string;

  };
</script>

<style scoped>
  .input {
    @apply h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-[16px] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground file:hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm;
  }
</style>