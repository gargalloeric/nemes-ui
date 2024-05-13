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
                    <li>
                        <RouterLink to="/">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                            Inicio
                        </RouterLink>
                    </li>
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