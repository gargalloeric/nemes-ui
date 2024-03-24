<script setup lang="ts">
import LoginFormComponent from '../components/LoginFormComponent.vue';
import { LoginQuery } from '../models/LoginQuery';

async function handleFormQuery(form: LoginQuery) {
    const BASE_URL: string = import.meta.env.VITE_BASE_URL
    // TODO: Set login URL
    const LOGIN_URL: string = `${BASE_URL}/nuser/login`
    const resp = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            identifier: form.identifier,
            password: form.password
        })
    })

    // TODO: Handle user created and user not created
    if (!resp.ok) {
        console.log('User not created')
    } else {
        console.log('User created')
    }
}
</script>

<template>
    <div class="h-full flex flex-col align-center ">
        <div class="card w-2/4 items-center m-auto">
            <div class="card-body prose">
                <h2 class="card-title">Login!</h2>
                <LoginFormComponent @form-query="handleFormQuery" />
            </div>
        </div>
    </div>
</template>