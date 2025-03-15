import {defineStore} from 'pinia'

export const useApplicantStore = defineStore('applicant',{
    state:()=>({
        user:null
    }),
    actions:{
        setUser(value){
            this.user = value
        }
    }
})