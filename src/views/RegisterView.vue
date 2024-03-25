<script setup lang="ts">
import RegisterFormComponent from '../components/RegisterFormComponent.vue'
import { RegisterQuery } from '../models/RegisterQuery';
import { BASE_URL } from '../utils/Constants';

async function handleFormQuery(form: RegisterQuery) {
    const REGISTER_URL: string = `${BASE_URL}/nuser/create`
    const resp = await fetch(REGISTER_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: form.username,
            email: form.email,
            phone: form.phone,
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
                <h2 class="card-title">Register!</h2>
                <RegisterFormComponent @form-query="handleFormQuery" />
            </div>
        </div>
    </div>
</template>