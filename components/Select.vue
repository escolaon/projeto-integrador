<script setup lang="ts">
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

const props = defineProps<{
    sLabel: string | undefined,
    sId: string,
    sPlaceholder: string,
    sItens: { value: string; label: string }[]
}>()

</script>

<template>
    <Label v-if="sLabel" :for="sId">{{sLabel}}</Label>
    <Select>
        <SelectTrigger :id="sId">
            <SelectValue :placeholder="sPlaceholder" />
        </SelectTrigger>
        <SelectContent position="popper">
            <SelectItem v-for="item of sItens" :value="item.value">
                {{ item.label }}
            </SelectItem>
        </SelectContent>
    </Select>
</template>