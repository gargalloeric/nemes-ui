import { NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw,createRouter, createWebHistory} from "vue-router";
import Home from "./views/Home.vue";
import RegisterView from './views/RegisterView.vue'
import LoginView from './views/LoginView.vue'
import { useTokenStore } from './stores/token'
import ProtectedView from './views/ProtectedView.vue';
import RegisterZoneOfInterest from "./views/RegisterZoneOfInterest.vue";

function checkIfLoggedIn(_to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) {
    const tokenStore = useTokenStore();

    if (tokenStore.hasToken()) {
        next();
    } else {
        next({name:'login'})
    }
}

const  routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterView
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView
    },
    {
        path: '/protected',
        name: 'protected',
        beforeEnter: [checkIfLoggedIn],
        component: ProtectedView
    },
    {
        path: '/registerZoneOfInterest',
        name: 'registerZoneOfInterest',
        beforeEnter: [checkIfLoggedIn],
        component: RegisterZoneOfInterest
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;