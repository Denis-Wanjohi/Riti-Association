<script setup>
import { FloatLabel,InputText,Select,DatePicker } from 'primevue';
import Heading from '@/components/Heading.vue';
// import InputFieldReg from '@/components/InputFieldReg.vue';
import { ref } from 'vue';
const user = ref({
    fullname:null,
    email:null,
    phone:null,
    idNumber:null,
    gender:null,
    dob:null,
    intrest:null,
})
const gender = [
    {label:"Male"},
    {label:"Female"},
]
const intrest = [
    {label:'Direct Employment'},
    {label:'Side hustle'},
    {label:'Initiate Business Enterprise'},
    {label:'Training'},
    {label:'Attachment/Internship'},
    {label:'Business Venture for Sale'},
    {label:'Business Plan Financing'},
    {label:'Business  Loan'},
]
</script>
<template>
    <div class="h-screen">
        <div class="w-3/4 mx-auto">
            <heading heading="RITI ASSOCIATION OF UNEMPLOYED PROFESSIONALS" desc="Registration form"></heading>
            <form @submit="register" class="grid grid-cols-2 gap-y-10">
                <!-- <input-field-reg for-value="fullnames" :model-value="user.fullname" label-value="Fullname" type-value="text"></input-field-reg> -->
                <!-- <input-field-reg for-value="email" :model-value="user.email" label-value="Email" type-value="email"></input-field-reg> -->
                <!-- <input-field-reg for-value="phone" :model-value="user.phone" label-value="Phone Number" type-value="tel"></input-field-reg> -->
                <!-- <input-field-reg for-value="idNo" :model-value="user.idNumber" label-value="Identification Number" type-value="password"></input-field-reg> -->
                
                <FloatLabel variant="on" >
                    <InputText id="fullNames"  class="w-3/4" v-model="user.fullname" type="text" />
                    <label for="fullNames">Full Names</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <InputText id="email" class="w-3/4" v-model="user.email" type="email" />
                    <label for="email">Email</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <InputText id="phone" class="w-3/4" v-model="user.phone" />
                    <label for="phone">Phone Number</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <InputText id="idNo" class="w-3/4" v-model="user.idNumber" />
                    <label for="idNo">Identification Number</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <Select :options="gender"  v-model="user.gender" optionLabel="label" class="w-3/4" />
                    <label for="on_label">Gender</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <DatePicker class="w-3/4" v-model="user.dob" />
                    <label for="on_label">Date of Birth</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <Select :options="intrest" v-model="user.intrest" optionLabel="label" class="w-3/4" />
                    <label for="on_label">Area of Interest</label>
                </FloatLabel>
            </form>
        </div>
    </div>
</template>