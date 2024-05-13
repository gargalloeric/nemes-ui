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
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-home" width="28"
                                height="28" viewBox="0 0 24 24" stroke-width="1" stroke="#2c3e50" fill="none"
                                stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                                <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                                <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
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