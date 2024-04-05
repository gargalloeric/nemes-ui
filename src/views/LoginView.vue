<script setup lang="ts">
import { Ref, ref } from 'vue';
import LoginFormComponent from '../components/LoginFormComponent.vue';
import { LoginQuery } from '../models/LoginQuery';
import { BASE_URL } from '../utils/Constants';

const showError: Ref<boolean> = ref(false)

async function handleFormQuery(form: LoginQuery) {
    // TODO: Set login URL
    const LOGIN_URL: string = `${BASE_URL}/nuser/login`
    const resp = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: form.email,
            password: form.password
        })
    })

    // TODO: Handle user logged and user not logged
    if (!resp.ok) {
        showError.value = true;
        console.log('User not logged')
    } else {
        console.log('User logged')
    }
}
</script>

<template>
    <div class="h-full flex flex-col align-center ">
        <div class="card w-2/4 items-center m-auto">
            <div class="card-body prose">
                <h2 class="card-title">Login!</h2>
                <LoginFormComponent
                :showError="showError"
                @form-query="handleFormQuery"/>
            </div>
        </div>
    </div>
</template>