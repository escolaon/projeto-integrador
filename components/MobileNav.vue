<template>
  <UiSheet v-model:open="localModel">
    <UiSheetContent class="p-1">
      <template #content>
        <UiSheetTitle title="Mobile menu" class="sr-only" />
        <UiSheetDescription description="A list of navigation items for mobile" class="sr-only" />
        <UiScrollArea class="h-[calc(100dvh-20px)] w-full p-5">
          <div class="sticky top-0 mb-3 w-full bg-background">
            <div class="flex items-center gap-3.5">
              <p class="text-xl font-bold">Menu</p>
              <UiSheetClose class="ml-auto">
                <Icon name="lucide:x" />
              </UiSheetClose>
            </div>
            <UiSeparator class="mt-4" />
          </div>
          <SideNav :links="links" />
        </UiScrollArea>
      </template>
    </UiSheetContent>
  </UiSheet>
</template>

<script lang="ts" setup>

  type Link = {
    _path: string;
    title: string;
    icon?: string;
    children?: Link[];
    label?: string;
  };

  const props = defineProps<{
    links: Link[];
    modelValue?: boolean;
  }>();

  const emits = defineEmits<{
    "update:modelValue": [value: boolean];
  }>();

  const localModel = useVModel(props, "modelValue", emits, { passive: true });
</script>
