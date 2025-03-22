<script setup>
import LoadingButton from '@/components/loadingButton.vue';
import Heading from '@/components/Heading.vue';
import { FloatLabel,InputText,Toast,Button } from 'primevue';
import { ref } from 'vue';
import { useToast } from 'primevue';
import axiosClient from '@/axios/axios';
import { useAdminStore } from '@/stores/admin';
import router from '@/router';

const toast = useToast()
const isSubmitting = ref(false)
const user = ref({
    'staffNo': null,
    'password': null,
})
const onSubmit = ()=>{
    if (Object.values(user.value).some(value => value === null || value === "")) {
        toast.add({severity:"error",summary:"FORM DATA",detail:"Please make sure all fields in the form are not empty",life:5000})
        return;
    }
    axiosClient.post('/login/admin',user.value)
    .then(res=>{
        sessionStorage.setItem('token',res.data.token)
        sessionStorage.setItem('admin',JSON.stringify(res.data.admin))
        useAdminStore().setAdmin(res.data.admin)
        router.push('/dashboard/admin')
    })
    .catch(err=>{
        console.log(err.status)
        if(err.status == 401){
            toast.add({severity:'error',summary:'Authentication error',detail:'Credetials provided dont match our records.',life:5000})
        }
        console.error(err)
    })
}
</script>
<template>
    <Toast></Toast>
    <heading heading="RITI ASSOCIATION OF UNEMPLOYED PROFESSIONALS" desc="A D M I N "></heading>

    <div class="w-1/4 mx-auto h-[50vh] flex items-center justify-center ">
        <form @submit.prevent="onSubmit" class="grid grid-cols-1 gap-y-10 mt-10">
            <FloatLabel variant="on" >
                <InputText id="staffNo" required  class="w-full" v-model="user.staffNo" type="text" />
                <label for="staffNo">Staff Number</label>
            </FloatLabel>
            <FloatLabel variant="on" >
                <InputText id="password" required  class="w-full" v-model="user.password" type="password" />
                <label for="password">Password</label>
            </FloatLabel>
            <div class="w-3/4 mx-auto">
                <Button v-if="!isSubmitting" severity="info" class="w-full" type="submit"> S U B M I T</Button>
                <Button  v-else severity="secondary" class="font-bold w-full"> <i class="pi pi-spin pi-spinner-dotted"></i> </Button>

            </div>
        </form>
    </div>
</template>