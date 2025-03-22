import { defineStore } from "pinia";

export const useAdminStore = defineStore('adminStore',{
    state:()=>({
        admin : null
    }),
    actions:{
        setAdmin(value){
            this.admin = value
        }
    }
})