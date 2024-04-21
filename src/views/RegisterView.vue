<script setup lang="ts">
import { Ref, ref } from 'vue';
import RegisterFormComponent from '../components/RegisterFormComponent.vue'
import SuccessAlertComponent from '../components/SuccessAlertComponent.vue'
import ErrorAlertComponent from '../components/ErrorAlertComponent.vue'
import { RegisterQuery } from '../queries/RegisterQuery';
import { BASE_URL } from '../utils/Constants';

const showAlertSuccess: Ref<boolean> = ref(false);
const showAlertError: Ref<boolean> = ref(false);
const usrOrEmailError: Ref<boolean> = ref(false)
let errorMsg: string = '';

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

    // TODO: Improve handling of user created and user not created.
    if (resp.ok) {
        showAlertSuccess.value = true;
    } else {
        errorMsg = "El usuario o correo electrónico ya están en uso."
        usrOrEmailError.value = true;
        handleShowError(errorMsg);
    }
}

function handleClose() {
    showAlertSuccess.value = false;
    showAlertError.value = false;
}

function handleShowError(msg: string) {
    errorMsg = msg;
    showAlertError.value = true;
}
</script>

<template>
    <SuccessAlertComponent v-if="showAlertSuccess" 
    msg="Te has registrado satisfactoriamente. Ya puedes iniciar sesión."
    @close="handleClose"/>
    <ErrorAlertComponent v-if="showAlertError"
    :msg="errorMsg"
    @close="handleClose"/>
    <div class="h-full flex flex-col align-center ">
        <div class="card w-2/4 items-center m-auto">
            <div class="card-body prose">
                <h2 class="card-title">Registro de usuario</h2>
                <RegisterFormComponent
                :usr-or-email-error="usrOrEmailError"
                @form-query="handleFormQuery" 
                @show-error="handleShowError"/>
            </div>
        </div>
    </div>
</template>../queries/RegisterQuery