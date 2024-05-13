import { defineStore } from "pinia";
import { User } from "../model/User";
import { useTokenStore } from "./token";
import { BASE_URL } from "../utils/Constants";

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            user: null as User | null
        }
    },
    actions: {
        async loadUser() {
            const tokenStore = useTokenStore()
            if (!tokenStore.hasToken()) return;

            const resp = await fetch(`${BASE_URL}/nuser/me`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenStore.token}`
                }
            })

            const { username, email } = await resp.json()

            this.user = {
                username: username,
                email: email
            }
        },
        isLoggedIn(): boolean {
            return this.user != null;
        }
    }
})