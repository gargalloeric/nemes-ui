<script setup lang="ts">
import RegisterFormComponent from '../components/RegisterFormComponent.vue'
</script>

<template>
    <div class="h-full flex flex-col align-center ">
        <div class="card w-2/4 items-center m-auto">
            <div class="card-body prose">
                <h2 class="card-title">Register!</h2>
                <RegisterFormComponent />
            </div>
        </div>
    </div>
</template>