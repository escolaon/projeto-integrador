<template>
    <div>
        <div class="mt-12 mb-6 border-b pb-5">
            <h3 class="text-4xl font-semibold">
                Minha Escola
            </h3>
            <p class="mt-3 text-muted-foreground">
                Description
            </p>
        </div>
        <div class="text-sm">
            Content
        </div>
    </div>
</template>

<script lang="ts" setup>
definePageMeta({ middleware: 'auth' })
</script>