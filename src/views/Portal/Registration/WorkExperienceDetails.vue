<script setup>
import Heading from '@/components/Heading.vue';
import { FloatLabel,InputText,Button,DatePicker } from 'primevue';
import { ref } from 'vue';
const user = ref({
    yearsOfExperience:null,
    company:null,
    jobTitle:null,
    company2:null,
    jobTitle2:null,
    fname:null,
    lname:null,
    institution:null,
    
})
</script>
<template>
    <div>
        <heading heading="WORK EXPERIENCE "></heading>
        <form class="w-3/4 mx-auto mb-[150px]">
            <!-- <h1 class="text-2xl font-bold font-serif mt-10 mb-5">Higher Education</h1> -->
            <div class="grid grid-cols-2 gap-y-10 my-10">
                <FloatLabel variant="on" >
                    <InputText id="yearsOfExperience"  class="w-3/4" v-model="user.yearsOfExperience" type="number" />
                    <label for="yearsOfExperience">Years of Experience</label>
                </FloatLabel>
            </div>
            <div class="grid grid-cols-2 gap-y-10 my-10">
                <FloatLabel variant="on" >
                    <InputText id="company"  class="w-3/4" v-model="user.company" type="text" />
                    <label for="company">First Company/Institution</label>
                </FloatLabel>
                <FloatLabel variant="on" >
                    <InputText id="jobTitle"  class="w-3/4" v-model="user.jobTitle" type="text" />
                    <label for="jobTitle">Job Title</label>
                </FloatLabel>
                <FloatLabel variant="on" >
                    <DatePicker class="w-3/4"></DatePicker>
                    <label for="from">From</label>
                </FloatLabel>
                <FloatLabel variant="on" >
                    <DatePicker class="w-3/4"></DatePicker>
                    <label for="to">To</label>
                </FloatLabel>
                <FloatLabel variant="on" >
                    <InputText id="company2"  class="w-3/4" v-model="user.company2" type="text" />
                    <label for="company2">Second Company/Institution</label>
                </FloatLabel>
                <FloatLabel variant="on" >
                    <InputText id="jobTitle2"  class="w-3/4" v-model="user.jobTitle2" type="text" />
                    <label for="jobTitle2">Job Title</label>
                </FloatLabel>
                <FloatLabel variant="on" >
                    <DatePicker class="w-3/4"></DatePicker>
                    <label for="from">Started</label>
                </FloatLabel>
                <FloatLabel variant="on" >
                    <DatePicker class="w-3/4"></DatePicker>
                    <label for="to">Ended</label>
                </FloatLabel>
            </div>

            <h1 class="text-2xl font-bold font-serif mt-10 mb-5">Referees</h1>
            <div class="grid grid-cols-2 gap-y-10 mb-10">
                <FloatLabel variant="on" >
                    <InputText id="fname"  class="w-3/4" v-model="user.fname" type="text" />
                    <label for="fname">First Name</label>
                </FloatLabel>
                <FloatLabel variant="on" >
                    <InputText id="lname"  class="w-3/4" v-model="user.lname" type="text" />
                    <label for="lname">Last Name</label>
                </FloatLabel>
                <FloatLabel variant="on" >
                    <InputText id="institution"  class="w-3/4" v-model="user.institution" type="text" />
                    <label for="institution">Institution</label>
                </FloatLabel>
            </div>

            <div class="flex w-full">
                <Button class="mx-auto w-1/2 font-bold" severity="info" >S U B M I T</Button>
            </div>
        </form>
    </div>
</template>