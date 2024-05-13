<script setup lang="ts">
import { useUserStore } from '../stores/user';

const userStore = useUserStore()
</script>

<template>
    <nav>
        <div class="navbar bg-base-100">
            <div class="navbar-start">
                <RouterLink to="/">
                    <span class="btn btn-ghost text-xl">NEMES</span>
                </RouterLink>
            </div>
            <div class="navbar-center">
                <ul class="menu menu-horizontal px-1">
                    <li><RouterLink to="/">Home</RouterLink></li>
                    <li><a>About</a></li>
                </ul>
            </div>
            <div class="navbar-end">
                <RouterLink v-if="!userStore.isLoggedIn()" to="/login">
                    <a class="btn">
                        Inicia sesión
                    </a>
                </RouterLink>

                <div v-else class="dropdown">
                    <div tabindex="0" role="button" class="btn m-1">{{ userStore.user?.email }}</div>
                    <ul tabindex="0" class="dropdown-content z-[2] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>Suscripciones</a></li>
                        <li><a class="text-red-600">Cerrar Sesión</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>