import {createRouter, createWebHistory} from "vue-router";
import Home from "./views/Home.vue";
import RegisterView from './views/RegisterView.vue'
import LoginView from './views/LoginView.vue'

const  routes = [
    {
        path: "/",
        name: "Home",
        component: Home
        path: '/register',
        component: RegisterView
    },
    {
        path: '/login',
        component: LoginView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;