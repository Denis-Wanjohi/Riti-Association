<script setup>
import { FloatLabel,InputText,Select,DatePicker,Button,Toast } from 'primevue';
import Heading from '@/components/Heading.vue';
// import InputFieldReg from '@/components/InputFieldReg.vue';
import { ref } from 'vue';
import {useToast} from 'primevue/usetoast'
import router from '@/router';
import axiosClient from '@/axios/axios';
import { scrollUp } from '@/utilities/util';
const isSubmitting = ref(false)
const toast = useToast()
const user = ref({
    fullname:null,
    email:null,
    phone:null,
    idNumber:null,
    gender:null,
    dob:null,
    interest:null,
})
const gender = [
    {label:"Male"},
    {label:"Female"},
]
const interest = [
    {label:'Direct Employment'},
    {label:'Side hustle'},
    {label:'Initiate Business Enterprise'},
    {label:'Training'},
    {label:'Attachment/Internship'},
    {label:'Business Venture for Sale'},
    {label:'Business Plan Financing'},
    {label:'Business  Loan'},
]
const register = ()=>{
    if(user.value.gender == null || user.value.interest == null || user.value.dob == null){
        isSubmitting.value = false;
        toast.add({severity:"warn",summary:"INPUTS ERROR",detail:"Please fill all inputs",life:'5000'})
        return;
    }
    isSubmitting.value = true
    let data = {
        fullname:user.value.fullname,
        email:user.value.email,
        phone:user.value.phone,
        idNumber:user.value.idNumber,
        gender:user.value.gender.label,
        dob:user.value.fullname,
        interest:user.value.interest.label,
    }
    axiosClient.post('/register',data)
    .then(res=>{
        isSubmitting.value = false
        console.log(res.data)
        user.value.fullname = null
        user.value.email = null
        user.value.dob = null
        user.value.phone = null
        user.value.gender = null
        user.value.idNumber = null
        user.value.interest = null
        scrollUp()
        router.push('/auth/verify?e='+res.data.email)
    })
    .catch(err=>{
        isSubmitting.value = false
        console.error(err)
    })
}
</script>
<template>
    <div class="h-screen">
        <Toast></Toast>
        <div class="w-3/4 mx-auto">
            <heading heading="RITI ASSOCIATION OF UNEMPLOYED PROFESSIONALS" desc="Registration form"></heading>
           <!-- {{ user.gender.label }} -->
             <!-- <Button @click="register">hello</Button> -->
            <form @submit.prevent="register" class=" mt-10">
                <!-- <input-field-reg for-value="fullnames" :model-value="user.fullname" label-value="Fullname" type-value="text"></input-field-reg> -->
                <!-- <input-field-reg for-value="email" :model-value="user.email" label-value="Email" type-value="email"></input-field-reg> -->
                <!-- <input-field-reg for-value="phone" :model-value="user.phone" label-value="Phone Number" type-value="tel"></input-field-reg> -->
                <!-- <input-field-reg for-value="idNo" :model-value="user.idNumber" label-value="Identification Number" type-value="password"></input-field-reg> -->
                
                <div class="grid grid-cols-2 gap-y-10">
                    <FloatLabel variant="on" >
                        <InputText id="fullNames" required class="w-3/4" v-model="user.fullname" type="text" />
                        <label for="fullNames">Full Names</label>
                    </FloatLabel>
                    <FloatLabel variant="on">
                        <InputText id="email" required class="w-3/4" v-model="user.email" type="email" />
                        <label for="email">Email</label>
                    </FloatLabel>
                    <FloatLabel variant="on">
                        <InputText id="phone"  required class="w-3/4" v-model="user.phone" />
                        <label for="phone">Phone Number</label>
                    </FloatLabel>
                    <FloatLabel variant="on">
                        <InputText id="idNo" required class="w-3/4" v-model="user.idNumber" />
                        <label for="idNo">Identification Number</label>
                    </FloatLabel>
                    <FloatLabel variant="on">
                        <Select :options="gender" required  v-model="user.gender" optionLabel="label" class="w-3/4" />
                        <label for="on_label">Gender</label>
                    </FloatLabel>
                    <FloatLabel variant="on">
                        <DatePicker class="w-3/4" required v-model="user.dob" />
                        <label for="on_label">Date of Birth</label>
                    </FloatLabel>
                    <FloatLabel variant="on">
                        <Select :options="interest" required v-model="user.interest" optionLabel="label" class="w-3/4" />
                        <label for="on_label">Area of Interest</label>
                    </FloatLabel>
                </div>
                <div class="w-3/4 mx-auto mt-10 mb-5 flex justify-center">
                    <Button v-if="!isSubmitting" severity="info" class="font-bold w-3/4" type="submit"> S U B M I T</Button>
                    <Button  v-else severity="secondary" class="font-bold w-3/4"> <i class="pi pi-spin pi-spinner-dotted"></i> </Button>
                </div>
                <!-- <p class="font-thin text-center">Already have an account? <span class="font-bold text-blue-500 cursor-pointer hover:underline" @click="router.push('/auth/login')">Login</span></p> -->
            </form>
        </div>
    </div>
</template>