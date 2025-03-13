<script setup>
import { FloatLabel,InputText,Button } from 'primevue';
import Heading from '@/components/Heading.vue';
import { ref } from 'vue';
import router from '@/router';
const verifiedEmail = ref('ss')
const unverifiedEmail = ref(null)
const credentialsError = ref(null)
const user = ref({
    email:null,
    membershipID:null,
    password:null,
})
const onSubmit = ()=>{

}

</script>
<template>
    <div class="h-screen">
        <div class="w-3/4 mx-auto">
            <heading heading="RITI ASSOCIATION OF UNEMPLOYED PROFESSIONALS" desc="L O G  I N"></heading>
            <form @submit="onSubmit" class="grid grid-cols-1 gap-y-5 w-5/12 mx-auto mt-10" >
                <!-- <input-field-reg for-value="fullnames" :model-value="user.fullname" label-value="Fullname" type-value="text"></input-field-reg> -->
                <!-- <input-field-reg for-value="email" :model-value="user.email" label-value="Email" type-value="email"></input-field-reg> -->
                <!-- <input-field-reg for-value="phone" :model-value="user.phone" label-value="Phone Number" type-value="tel"></input-field-reg> -->
                <!-- <input-field-reg for-value="idNo" :model-value="user.idNumber" label-value="Identification Number" type-value="password"></input-field-reg> -->
                
                <div v-if="verifiedEmail == null">
                    <FloatLabel variant="on" >
                        <InputText id="fullNames"  class="w-full" v-model="user.email" type="text" />
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
                    <Button severity="info" class="w-full"> S U B M I T</Button>
                </div>
                <p class="text-center font-thin">Don't have an account? <span class="font-bold text-blue-500 hover:underline cursor-pointer" @click="router.push('/auth/register')">Register here</span> </p>
            </form>
        </div>
    </div>
</template>