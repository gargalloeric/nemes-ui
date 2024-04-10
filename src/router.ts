import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import RegisterView from './views/RegisterView.vue'
import LoginView from './views/LoginView.vue'

const routes: RouteRecordRaw[] = [
    {
        path: '/register',
        component: RegisterView
    },
    {
        path: '/login',
        component: LoginView
        }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})