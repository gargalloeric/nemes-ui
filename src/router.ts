import { createRouter, createWebHistory } from 'vue-router'
import RegisterView from './views/RegisterView.vue'

const routes = [
    {
        path: '/register',
        component: RegisterView
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})