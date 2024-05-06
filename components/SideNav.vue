<template>
    <nav :class="styles({ class: props.class })">
        <template v-for="(l, i) in links" :key="i">
            <NuxtLink
                class="h-10 rounded-md ps-3 flex items-center line-clamp-1 shrink-0 text-ellipsis text-base text-muted-foreground  hover:font-bold sm:text-sm"
                exact-active-class="text-primary font-bold bg-muted" :to="l._path" :title="l.title">
                <Icon v-if="l.icon" :name="l.icon" class="h-6 w-6" /> {{ l.title }}
            </NuxtLink>
            <UiBadge v-if="l.label" class="px-2 py-0 text-[10px] dark:bg-lime-500">
                {{ l.label }}
            </UiBadge>
        </template>
    </nav>
</template>

<script setup lang="ts">
    import {
        tv
    } from "tailwind-variants";

    type Link = {
        _path: string;
        title: string;
        icon?: string;
        children?: Link[];
        label?: string;
    };

    const props = defineProps<{
        links: Link[];
        class?: any;
    }>();

    const styles = tv({
        base: "flex flex-col sm:text-sm",
    });

</script>