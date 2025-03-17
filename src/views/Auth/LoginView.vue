<script setup>
import { FloatLabel,InputText,Button } from 'primevue';
import Heading from '@/components/Heading.vue';
import { onMounted, ref } from 'vue';
import router from '@/router';
import { useRoute } from 'vue-router';
import axiosClient from '@/axios/axios';
import { useApplicantStore } from '@/stores/applicant';
import { scrollUp } from '@/utilities/util';
const isSubmitting = ref(false)
const verifiedEmail = ref(false)
const unverifiedEmail = ref(false)
const credentialsError = ref(null)
const applicantStore = useApplicantStore()
const route = useRoute()
const step = ref(0);
const user = ref({
    email:null,
    membershipID:null,
    password:null,
})
const onSubmit = ()=>{
    isSubmitting.value = true
    if(step.value == 0){
        let data = {
            email:user.value.email,
            step:step.value,
        }
        console.log(data)
        axiosClient.post('/login',data)
        .then(res=>{
            if(res.data.exists == true){
                step.value = 1
                verifiedEmail.value = true
                isSubmitting.value = false
            }else{
                step.value = 0
                unverifiedEmail.value = true
                isSubmitting.value = false
                setTimeout(()=>{
                    unverifiedEmail.value = false
                },5000)
            }
            // step.value = 1
        })
        .catch(err=>{
            console.error(err)
        })
    }else if(step.value == 1){
        let data = {
            membershipID:user.value.membershipID,
            password:user.value.password,
            step:step.value,
        }
        axiosClient.post('/login',data)
        .then(res=>{
            console.log(res)
            if(res.data.message == 'unautheticated'){
                credentialsError.value = true
                isSubmitting.value = false
                user.value.password = null
                setTimeout(()=>{
                    credentialsError.value = false
                },7000)
                return;
            }
            applicantStore.setUser(res.data.user)
            sessionStorage.setItem('applicant',JSON.stringify(res.data.user))
            sessionStorage.setItem('token',res.data.token)
            scrollUp()
            if(res.data.user.step == 0){
                router.push('/auth/change-password')
            }else{
              router.push('/portal/dashboard')  
            }
            
        })
        .catch(err=>{
            credentialsError.value = true
            isSubmitting.value = false
            user.value.password = null
            setTimeout(()=>{
                credentialsError.value = false
            },7000)
            console.error(err)
        })
    }
}
onMounted(()=>{
    if(route.query.e != null){
        user.value.email = route.query.e
        // console.log(user.value)
        onSubmit()
    }
   
})

</script>
<template>
    <div class="h-screen">
        <div class="w-3/4 mx-auto">
            <heading heading="RITI ASSOCIATION OF UNEMPLOYED PROFESSIONALS" desc="L O G  I N"></heading>
            <form @submit.prevent="onSubmit" class="grid grid-cols-1 gap-y-5 w-5/12 mx-auto mt-10" >
                <!-- <input-field-reg for-value="fullnames" :model-value="user.fullname" label-value="Fullname" type-value="text"></input-field-reg> -->
                <!-- <input-field-reg for-value="email" :model-value="user.email" label-value="Email" type-value="email"></input-field-reg> -->
                <!-- <input-field-reg for-value="phone" :model-value="user.phone" label-value="Phone Number" type-value="tel"></input-field-reg> -->
                <!-- <input-field-reg for-value="idNo" :model-value="user.idNumber" label-value="Identification Number" type-value="password"></input-field-reg> -->
                
                <div v-if="verifiedEmail == false">
                    <FloatLabel variant="on" >
                        <InputText id="fullNames"  class="w-full" v-model="user.email" type="email" />
                        <label for="fullNames">Email</label>
                    </FloatLabel>
                    <p class="text-center text-sm text-red-500" v-if="unverifiedEmail">Email is not in our records.</p>
                </div>
                <div v-else class="grid grid-cols-1 gap-y-10">
                    <FloatLabel variant="on">
                        <InputText id="membershipID" class="w-full" v-model="user.membershipID" type="text" />
                        <label for="membershipID">Membership ID</label>
                    </FloatLabel>
                    <FloatLabel variant="on">
                        <InputText id="password" class=" w-full mx-auto" type="password" v-model="user.password" />
                        <label for="password">Password</label>
                    </FloatLabel>
                    <p v-if="credentialsError" class="text-center text-sm text-red-500">Credentials don't match our records.</p>
                </div>
                <div class="w-3/4 mx-auto">
                    <Button v-if="!isSubmitting" severity="info" class="w-full" type="submit"> S U B M I T</Button>
                    <Button  v-else severity="secondary" class="font-bold w-full"> <i class="pi pi-spin pi-spinner-dotted"></i> </Button>

                </div>
                <p class="text-center font-thin">Don't have an account? <span class="font-bold text-blue-500 hover:underline cursor-pointer" 
                    >
                    <RouterLink to='/auth/register'>Register</RouterLink>    
                </span> </p>
            </form>
        </div>
    </div>
</template>