<script setup>
import axiosClient from '@/axios/axios';
import Heading from '@/components/Heading.vue';
import { ref } from 'vue';
import { Toast,FloatLabel,InputText,Button } from 'primevue';
import { useToast } from 'primevue';
import router from '@/router';

const toast = useToast()
const isSubmiting = ref(false)
const user = ref({
    password:null,
    confirmPassword:null,
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
    axiosClient.post('/change-password',user.value)
    .then(res=>{
        if(res.data.message == 'updated'){
            router.push('/portal/dashboard')
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
        <div class="sm:w-3/4 mx-auto">
            <heading class="px-5" heading="RITI ASSOCIATION OF UNEMPLOYED PROFESSIONALS" desc="CHANGE PASSWORD"></heading>
            <form @submit.prevent="onSubmit" class="grid grid-cols-1 gap-y-5 sm:w-5/12 sm:p-0 px-5 mx-auto mt-10" >
               
                <div  class="grid grid-cols-1 gap-y-10">
                    <FloatLabel variant="on">
                        <InputText id="password" required class="w-full" v-model="user.password" type="password" />
                        <label for="password">New Password</label>
                    </FloatLabel>
                    <FloatLabel variant="on">
                        <InputText id="confirmPassword" required class=" w-full mx-auto" type="password" v-model="user.confirmPassword" />
                        <label for="confirmPassword">Confirm Password</label>
                    </FloatLabel>
                    <!-- <p v-if="credentialsError" class="text-center text-sm text-red-500">Credentials don't match our records.</p> -->
                </div>
                <div class="w-3/4 mx-auto">
                    <Button v-if="!isSubmiting" severity="info" class="w-full" type="submit"> S U B M I T</Button>
                    <Button  v-else severity="primary" class="font-bold w-full"> <i class="pi pi-spin pi-spinner-dotted"></i> </Button>

                </div>
            </form>
        </div>
    </div>
</template>