<script setup>
import { FloatLabel,InputText,Select,DatePicker,Button,Toast,InputMask } from 'primevue';
import Heading from '@/components/Heading.vue';
import { ref, watch } from 'vue';
import {useToast} from 'primevue/usetoast'
import router from '@/router';
import axiosClient from '@/axios/axios';
import { scrollUp } from '@/utilities/util';
const isSubmitting = ref(false)
const ageInvalid = ref(false)
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
    const emptyFields = Object.keys(user.value).filter(key => !user.value[key]);
    if (emptyFields.length > 0) {
        isSubmitting.value = false;
        toast.add({severity: "warn", summary: "INPUTS ERROR", detail: "Please fill all inputs", life: '5000'});
        return;
    }
 
    if((new Date().getFullYear() - new Date(user.value.dob).getFullYear()) < 18 ){
        ageInvalid.value = true
        toast.add({severity:'error',summary:'AGE LIMIT',detail:'Please you must be of older than 18 years old to continue!!',life:8000})
        return;
    }
    if(user.value.idNumber && user.value.idNumber.toString().length > 8  && user.value.idNumber.toString().length < 5){
        toast.add({severity:'warn',summary:'INAVALID ID NUMBER',detail:'Please use a valid identification number'})
        return
    }
    isSubmitting.value = true
    let data = {
        fullname:user.value.fullname,
        email:user.value.email,
        phone:user.value.phone,
        idNumber:user.value.idNumber,
        gender:user.value.gender.label,
        dob:user.value.dob,
        interest:user.value.interest.label,
    }
    axiosClient.post('/register',data)
    .then(res=>{
        isSubmitting.value = false
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
        if(err.response.data.message == 'The email has already been taken.'){
            toast.add({severity:'error',summary:'EMAIL ERROR',detail:'The email has already been taken!!',life:8000})
        }else{
            toast.add({severity:'warn',summary:'FORM ERROR',detail:'Please re-submit the form.Thank you',life:8000})
        }
    })
}
watch(()=>user.value.dob,()=>{
    if((new Date().getFullYear() - new Date(user.value.dob).getFullYear()) < 18 ){
        ageInvalid.value = true
        toast.add({severity:'warn',summary:'AGE LIMIT',detail:'must be of 18+ years old',life:8000})
    }else{
        ageInvalid.value = false
    }
    
},)
</script>
<template>
    <div class="min:h-screen">
        <Toast></Toast>
      
        <div class="sm:w-3/4 mx-auto">
            <heading class="px-5" heading="RITI ASSOCIATION OF UNEMPLOYED PROFESSIONALS" desc="Registration form"></heading>
            <form @submit.prevent="register" class=" mt-10">
              
                <div class="grid sm:grid-cols-2 gap-y-10  sm:p-0 px-4">
                    <FloatLabel variant="on" >
                        <InputText id="fullNames" required class="sm:w-3/4 w-full" v-model="user.fullname" type="text" />
                        <label for="fullNames">Full Names</label>
                    </FloatLabel>
                    <FloatLabel variant="on">
                        <InputText id="email" required class="sm:w-3/4 w-full"  v-model="user.email" type="email" />
                        <label for="email">Email</label>
                    </FloatLabel>
                    <FloatLabel variant="on">
                        <InputMask id="ssn" v-model="user.phone" mask="+2549-9999-9999" required class="sm:w-3/4 w-full"  />
                        <!-- <InputText id="phone"    v-model="user.phone" /> -->
                        <label for="phone">Phone Number</label>
                    </FloatLabel>
                    <FloatLabel variant="on">
                        <InputText id="idNo" required class="sm:w-3/4 w-full" :invalid="user.idNumber && (user.idNumber.toString().length > 8 || user.idNumber.toString().length < 5)"  v-model="user.idNumber"/>
                        <label for="idNo">Identification Number</label>
                        <p  v-if="user.idNumber && (user.idNumber.toString().length > 8 || user.idNumber.toString().length < 5)" class="text-sm text-red-500">should be a valid id number</p>
                    </FloatLabel>
                    <FloatLabel variant="on">
                        <Select :options="gender" required  v-model="user.gender" optionLabel="label" class="sm:w-3/4 w-full"  />
                        <label for="on_label">Gender</label>
                    </FloatLabel>
                    <FloatLabel variant="on">
                        <DatePicker class="sm:w-3/4 w-full"  required v-model="user.dob" :invalid="ageInvalid" />
                        <label for="on_label">Date of Birth</label>
                    </FloatLabel>
                    <FloatLabel variant="on">
                        <Select :options="interest" required v-model="user.interest" optionLabel="label" class="sm:w-3/4 w-full"  />
                        <label for="on_label">Area of Interest</label>
                    </FloatLabel>
                </div>
                <div class="w-3/4 mx-auto mt-10 mb-5 flex justify-center">
                    <Button v-if="!isSubmitting" severity="info" class="font-bold w-3/4" type="submit"> S U B M I T</Button>
                    <Button  v-else severity="secondary" class="font-bold w-3/4"> <i class="pi pi-spin pi-spinner-dotted"></i> </Button>
                </div>
            </form>
        </div>
    </div>
</template>