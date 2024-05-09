<template>

    <UiAlertDialog v-model:open="model">
        <UiAlertDialogTrigger as-child>
            <UiButton variant="outline">Show Dialog</UiButton>
        </UiAlertDialogTrigger>
        <UiAlertDialogContent @escape-key-down="showMessage('Escape key pressed')">
            <UiAlertDialogHeader>
                <UiAlertDialogTitle>Are you absolutely sure?</UiAlertDialogTitle>
                <UiAlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account and remove your
                    data from our servers.
                </UiAlertDialogDescription>
            </UiAlertDialogHeader>
            <UiAlertDialogFooter>
                <UiAlertDialogCancel @click="showMessage('Action cancelled')" />
                <UiAlertDialogAction @click="showMessage('Action confirmed!')" />
            </UiAlertDialogFooter>
        </UiAlertDialogContent>
    </UiAlertDialog>

</template>

<script lang="ts" setup>
    definePageMeta({ middleware: 'auth' })


    const showMessage = (message: string) => {
        useSonner(message);
    };
    const model = ref(false);

</script>