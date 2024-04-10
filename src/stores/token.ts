import { defineStore } from "pinia";

export const useTokenStore = defineStore('token', {
    state: () => {
        return {
            token: null as string | null
        }
    }
})