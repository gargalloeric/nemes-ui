<script setup lang="ts">
import { LoginQuery } from '../models/LoginQuery';

const props = defineProps<{
    showError: boolean
}>();

const emit = defineEmits(['form-query'])

let form: LoginQuery = {
    email: '',
    password: ''
}
let errorMessage: string = 'Usuario o contraseña incorrectos';

function handleSubmit() {
    emit('form-query', form)
}
</script>

<template>
    <label>
        <form @submit.prevent="handleSubmit">
            <label class="input input-bordered flex items-center gap-2 mb-2" :class="{'input-error': props.showError}">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
                <input type="text" placeholder="Email" v-model.trim="form.email" class="grow" required />
            </label>
    
            <label class="input input-bordered flex items-center gap-2 mb-2" :class="{'input-error': props.showError}">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
                <input type="password" placeholder="Contraseña" v-model.trim="form.password" class="grow" required />
            </label>
            <p v-if="props.showError" class="text-red-500">{{ errorMessage }}</p>
    
            <button class="btn btn-primary btn-block mt-5">Iniciar Sesión</button>
        </form>
        <span class="label-text-alt">¿No tienes cuenta? <RouterLink to="/register">Registrate</RouterLink></span>
    </label>
</template>