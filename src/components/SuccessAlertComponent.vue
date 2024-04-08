<script setup lang="ts">
const props = defineProps<{ msg: string }>();
const emit = defineEmits(['close'])

function emitClose() {
    emit('close')
}
</script>

<template>
    <div role="alert" class="alert alert-success w-2/4 mx-auto my-5">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{{ props.msg }}</span>
        <div>
            <button class="btn btn-sm" @click="emitClose">Cerrar</button>
        </div>
    </div>
</template>