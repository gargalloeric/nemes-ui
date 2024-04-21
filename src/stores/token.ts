import { defineStore } from "pinia";

export const useTokenStore = defineStore('token', {
    state: () => {
        const token = localStorage.getItem('token')
        return {
            token: token as string | null
        }
    },

    actions: {
        setToken(token: string): void {
            this.token = token;
            localStorage.setItem('token', token)
        },
        hasToken(): boolean {
            return this.token != null;
        }
    }
})