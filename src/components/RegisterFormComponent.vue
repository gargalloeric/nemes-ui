<script setup lang="ts">
import { RegisterQuery } from '../models/RegisterQuery';

const emit = defineEmits(['form-query'])

let form: RegisterQuery = {
    username: '',
    email: '',
    phone: '',
    password: '',
    repassword: ''
}

function handleSubmit() {
    if (form.password != form.repassword)
        // TODO: Handle this case the right way.
        return
    emit('form-query', form)
}
</script>

<template>
    <form @submit.prevent="handleSubmit">
        <label class="input input-bordered flex items-center gap-2 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
            <input type="text" placeholder="Nombre de usuario" v-model.trim="form.username" class="grow" required />
        </label>

        <label class="input input-bordered flex items-center gap-2 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25" />
            </svg>
            <input type="email" placeholder="Correo electrónico" v-model.trim="form.email" class="grow" required />
        </label>

        <label class="input input-bordered flex items-center gap-2 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
            </svg>
            <input type="tel" placeholder="Teléfono" v-model="form.phone" class="grow" />
            <span class="badge badge-info">Opcional</span>
        </label>

        <label class="input input-bordered flex items-center gap-2 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
            <input type="password" placeholder="Contraseña" v-model.trim="form.password" class="grow" required />
        </label>

        <label class="input input-bordered flex items-center gap-2 mb-2">
            <input type="password" placeholder="Repite la contraseña" v-model.trim="form.repassword" class="grow"
                required />
        </label>

        <button class="btn btn-primary btn-block mt-5">Register</button>
    </form>
</template>