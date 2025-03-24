<script setup>
import axiosClient from '@/axios/axios';
import Heading from '@/components/Heading.vue';
import { onMounted, ref } from 'vue';
import { Toast,FloatLabel,InputText,Button } from 'primevue';
import { useToast } from 'primevue';
import router from '@/router';
import { useRoute } from 'vue-router';

const  route = useRoute()
const toast = useToast()
const isSubmiting = ref(false)
const user = ref({
    password:null,
    confirmPassword:null,
    token:null
})
onMounted(()=>{
    user.value.token = route.query.id
})
const onSubmit = ()=>{
    if(user.value.password == null || user.value.confirmPassword == null){
        return;
    }
    if(user.value.password !== user.value.confirmPassword){
        toast.add({severity:'error',summary:'PASSWORDS DONT MATCH',detail:'make sure the password matches',life:6000})
        user.value.confirmPassword = null
        return;
    }
    isSubmiting.value = true
    axiosClient.post('/employer/change-password',user.value)
    .then(res=>{
        // router.push('/portal/applicants')
        isSubmiting.value = false

        
        if(res.data.token){
            sessionStorage.setItem('token',res.data.token)
            let user = {
                'name' : res.data.name,
                'email' : res.data.email,
                'employerID' : res.data.employerID,
                'position' : res.data.position,
                'company' : res.data.company,
            }
            sessionStorage.setItem('employer',JSON.stringify(user))
            router.push('/dashboard/employer')
            
        }else if(res.data.message == 'not updated'){
            toast.add({severity:'error',summary:'PASSWORD ERROR',detail:'Error in updating the password'})
        }
    })
    .catch(err=>{
        isSubmiting.value = false
        user.value.password = null
        user.value.confirmPassword = null
    })
}
</script>
<template>
    <Toast></Toast>
    <div class="h-screen">
        <div class="w-3/4 mx-auto">
            <heading heading="RITI ASSOCIATION OF UNEMPLOYED PROFESSIONALS" desc="CREATE PASSWORD"></heading>
            <form @submit.prevent="onSubmit" class="grid grid-cols-1 gap-y-5 w-5/12 mx-auto mt-10" >
               
                <div  class="grid grid-cols-1 gap-y-10">
                    <FloatLabel variant="on">
                        <InputText id="password" required class="w-full" v-model="user.password" type="password" />
                        <label for="password">New Password</label>
                    </FloatLabel>
                    <FloatLabel variant="on">
                        <InputText id="confirmPassword" required class=" w-full mx-auto" type="password" v-model="user.confirmPassword" />
                        <label for="confirmPassword">Confirm Password</label>
                    </FloatLabel>
                </div>
                <div class="w-3/4 mx-auto">
                    <Button v-if="!isSubmiting" severity="info" class="w-full" type="submit"> S U B M I T</Button>
                    <Button  v-else severity="primary" class="font-bold w-full"> <i class="pi pi-spin pi-spinner-dotted"></i> </Button>

                </div>
            </form>
        </div>
    </div>
</template>