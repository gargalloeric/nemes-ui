<script setup lang="ts">
import { Ref, ref } from 'vue';
import LoginFormComponent from '../components/LoginFormComponent.vue';
import { LoginQuery } from '../queries/LoginQuery';
import { BASE_URL } from '../utils/Constants';
import { useTokenStore } from '../stores/token';
import { useUserStore } from "../stores/user";
import router from '../router';

const showError: Ref<boolean> = ref(false)
const tokenStore = useTokenStore()
const userStore = useUserStore()

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
    } else {
        showError.value = false;
        const token = await resp.text()
        tokenStore.setToken(token)
        userStore.loadUser()
        router.push({path: '/'})
    }
}
</script>

<template>
    <div class="h-full flex flex-col align-center ">
        <div class="card w-2/4 items-center m-auto">
            <div class="card-body prose">
                <h2 class="card-title">Inicio de Sesión</h2>
                <LoginFormComponent
                :showError="showError"
                @form-query="handleFormQuery"/>
            </div>
        </div>
    </div>
</template>