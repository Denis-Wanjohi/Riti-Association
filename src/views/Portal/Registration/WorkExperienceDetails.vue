<script setup>
import Heading from '@/components/Heading.vue';
import { FloatLabel,InputText,Button,DatePicker,Toast } from 'primevue';
import { useToast } from 'primevue';
import LoadingButton from '@/components/loadingButton.vue';
import { ref,onMounted } from 'vue';
import axiosClient from '@/axios/axios';
import router from '@/router';
import { scrollUp } from '@/utilities/util';

const toast = useToast()
const isSubmiting = ref(false)
const user = ref({
    yearsOfExperience:null,
    company:null,
    jobTitle:null,
    start:null,
    end:null,
    company2:null,
    jobTitle2:null,
    start2:null,
    end2:null,
    fname:null,
    lname:null,
    institution:null,
    refereeContact:null
    
})

onMounted(()=>{
    scrollUp()
})
const onSubmit = ()=>{
    if (Object.values(user.value).some(value => !value)) {
        toast.add({severity:'error',summary:'FORM ERRORS',detail:'Please make sure you fill the whole form ',life:5000})
        return;
    }
    
    if(
        new Date(user.value.start).getTime()  > new Date().getTime()||
        new Date(user.value.end).getTime()  > new Date().getTime()||
        new Date(user.value.start2).getTime()  > new Date().getTime()||
        new Date(user.value.end2).getTime()  > new Date().getTime()
     ){
        toast.add({severity:'warn',summary:'Dates Error',detail:'Dates used cannot be past today',life:5000})
        return;
    }
    if(user.value.start  > user.value.end || user.value.start2 > user.value.end2){
        toast.add({severity:'warn',summary:'Dates mismatch',detail:'End date cannot be before start date',life:5000})
        return;
    }
    isSubmiting.value = true
    axiosClient.post('/work-expereince-details',user.value)
    .then(res=>{
        isSubmiting.value = false
        if(res.data.message){
            toast.add({severity:'success',summary:'REGISTRATION COMPLETE',detail:"Congratulations you are now a fully registered member!",life:8000})
            router.push('/portal/dashboard')
        }
    })
    .catch(err=>{
        toast.add({severity:'error',summary:'SUBMITTING ERROR',detail:"Please re-submit the form",life:5000})
        isSubmiting.value = false
    })
}
</script>
<template>
    
    <div>
        <Toast></Toast>
        <heading heading="WORK EXPERIENCE "></heading>
        <form class="sm:w-3/4 sm:p-0 px-5 mx-auto mb-[150px]" @submit.prevent="onSubmit">
            <!-- <h1 class="text-2xl font-bold font-serif mt-10 mb-5">Higher Education</h1> -->
            <div class="grid sm:grid-cols-2 gap-y-10 my-10">
                <FloatLabel variant="on" >
                    <InputText id="yearsOfExperience" required  class="sm:w-3/4 w-full" v-model="user.yearsOfExperience" type="number" />
                    <label for="yearsOfExperience">Years of Experience</label>
                   
                </FloatLabel>
            </div>
            <div class="grid sm:grid-cols-2 gap-y-10 my-10">
                <FloatLabel variant="on" >
                    <InputText id="company" required class="sm:w-3/4 w-full" v-model="user.company" type="text" />
                    <label for="company">First Company/Institution</label>
                </FloatLabel>
                <FloatLabel variant="on" >
                    <InputText id="jobTitle" required class="sm:w-3/4 w-full" v-model="user.jobTitle" type="text" />
                    <label for="jobTitle">Job Title</label>
                </FloatLabel>
                <FloatLabel variant="on" >
                    <DatePicker class="sm:w-3/4 w-full" v-model="user.start" :invalid="(new Date().getTime() - new Date(user.start).getTime()) < 0"></DatePicker>
                    <label for="from">From</label>
                    <p class="text-sm text-red-600">{{ (new Date().getTime() - new Date(user.start).getTime()) < 0 ? 'date cannot be past today' :''  }}</p>
                </FloatLabel>
                <FloatLabel variant="on" >
                    <DatePicker class="sm:w-3/4 w-full" v-model="user.end" :invalid="(new Date().getTime() - new Date(user.end).getTime()) < 0"></DatePicker>
                    <label for="to">To</label>
                    <p class="text-sm text-red-600">{{ (new Date().getTime() - new Date(user.end).getTime()) < 0 ? 'date cannot be past today' :''  }}</p>
                </FloatLabel>
                <FloatLabel variant="on" >
                    <InputText id="company2" required  class="sm:w-3/4 w-full" v-model="user.company2" type="text" />
                    <label for="company2">Second Company/Institution</label>
                </FloatLabel>
                <FloatLabel variant="on" >
                    <InputText id="jobTitle2" required class="sm:w-3/4 w-full" v-model="user.jobTitle2" type="text" />
                    <label for="jobTitle2">Job Title</label>
                </FloatLabel>
                <FloatLabel variant="on" >
                    <DatePicker class="sm:w-3/4 w-full" v-model="user.start2" :invalid="(new Date().getTime() - new Date(user.start2).getTime()) < 0"></DatePicker>
                    <label for="from">Started</label>
                    <p class="text-sm text-red-600">{{ (new Date().getTime() - new Date(user.start2).getTime()) < 0 ? 'date cannot be past today' :''  }}</p>
                </FloatLabel>
                <FloatLabel variant="on" >
                    <DatePicker class="sm:w-3/4 w-full" v-model="user.end2" :invalid="(new Date().getTime() - new Date(user.end2).getTime()) < 0"></DatePicker>
                    <label for="to">Ended</label>
                    <p class="text-sm text-red-600">{{ (new Date().getTime() - new Date(user.end2).getTime()) < 0 ? 'date cannot be past today' :''  }}</p>
                </FloatLabel>
            </div>

            <h1 class="text-2xl font-bold font-serif mt-10 mb-5">Referees</h1>
            <div class="grid sm:grid-cols-2 gap-y-10 mb-10">
                <FloatLabel variant="on" >
                    <InputText id="fname" required  class="sm:w-3/4 w-full" v-model="user.fname" type="text" />
                    <label for="fname">First Name</label>
                </FloatLabel>
                <FloatLabel variant="on" >
                    <InputText id="lname"  required class="sm:w-3/4 w-full" v-model="user.lname" type="text" />
                    <label for="lname">Last Name</label>
                </FloatLabel>
                <FloatLabel variant="on" >
                    <InputText id="institution"  required class="sm:w-3/4 w-full" v-model="user.institution" type="text" />
                    <label for="institution">Institution</label>
                </FloatLabel>
                <FloatLabel variant="on" >
                    <InputText id="contact"  required class="sm:w-3/4 w-full" v-model="user.refereeContact" type="text" />
                    <label for="contact">Contact(email/phone number)</label>
                </FloatLabel>
            </div>

            <div class="flex w-full">
                <Button  v-if="!isSubmiting" class="mx-auto w-1/2 font-bold" type="submit" severity="info" >S U B M I T</Button>
                <loading-button v-else></loading-button>
            </div>
        </form>
    </div>
</template>