import { defineStore } from "pinia";

export const useTokenStore = defineStore('token', {
    state: () => {
        const token = localStorage.getItem('token')
        return {
            token: token as string | null
        }
    },

    actions: {
        setToken(token: string) {
            this.token = token;
            localStorage.setItem('token', token)
        }
    }
})