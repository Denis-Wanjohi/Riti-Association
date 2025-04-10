import { defineStore } from "pinia";

export const useUserStore = defineStore('user',{
    state:()=>({
        loggedIn : false
    }),
    actions:{
        setLoggedIn(value){
            this.loggedIn = value
        }
    }
})