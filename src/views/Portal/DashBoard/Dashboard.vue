<script setup>
import Heading from '@/components/Heading.vue';
import DashCard from '@/components/dash_card.vue';
import {Button} from 'primevue'
import { useApplicantStore } from '@/stores/applicant';
import { onMounted, ref } from 'vue';
import router from '@/router';
import axiosClient from '@/axios/axios';
import { dmy, scrollUp } from '@/utilities/util';
import LoadingButton from '@/components/loadingButton.vue'

const applicantStore = useApplicantStore()
const user_data = ref(null)
//user_data.value = JSON.parse(sessionStorage.getItem('applicant'))
onMounted(()=>{
    scrollUp()
    if(sessionStorage.getItem('applicant').step != 4){
        setTimeout(()=>{
            // router.push('/registration/personal-details')
        },5000) 
    } 
    getUser()
})
function getUser(){
    axiosClient.get('/user')
    .then(res=>{
        sessionStorage.setItem('applicant',JSON.stringify(res.data.user))
        user_data.value = res.data.user
    })
}
function registrationPage(){
    if(user_data.value.step == 0){
        router.push('/registration/personal-details')
    }else if(user_data.value.step == 1){
        router.push('/registration/education-details')
    }else if(user_data.value.step == 2){
        router.push('/registration/work-experience-details')
    }
}
</script>
<template>
<div>
    <!-- {{ user_data }} -->
    <heading heading="Dashboard"></heading>
    <div v-if="user_data == null">
        <loading-button/>
    </div>
    <div v-if="  user_data && user_data.step != 4"  class="flex justify-center items-center h-[70vh] ">
        <div class="sm:w-1/4  mx-auto text-center">
            <p class="text-2xl font-bold my-10">WELCOME</p>
            <RouterLink :to=" user_data.step == 1 ? '/registration/personal-details' : user_data.step == 2 ?'/registration/education-details': user_data.step == 3 ? '/registration/work-experience-details':'/' ">
                <Button  severity="info"  class="font-bold text-3xl">Finish up your registration</Button>
            </RouterLink>
        </div>
    </div>
    
    <div v-if="user_data && user_data.step == 4"  class="grid sm:grid-cols-2 gap-3 sm:h-[150vh] sm:p-10 p-2 cinzel_dashboard_h3">
        <dash-card h4="YOUR INFORMATION">
           
            <div class="">
                <img :src="user_data.personal_details.image" class="w-[140px] mx-auto h-[140px] rounded-full  p-5" alt="">
                <div class="p-5 w-fit mx-auto">
                    <p> <span class="font-bold pr-3">Name:</span> {{ user_data.fullname }}</p>
                    <p> <span class="font-bold pr-3">Email:</span>{{ user_data.email }}</p>
                    <p> <span class="font-bold pr-3">Phone No.:</span>{{ user_data.phone }}</p>
                    <p> <span class="font-bold pr-3">D.O.B:</span>{{ dmy(user_data.dob) }}</p>
                    <p> <span class="font-bold pr-3">Membership ID:</span>{{ user_data.membershipID }}</p>
                </div>
            </div>
        </dash-card>
        <dash-card h4="PERSONAL DETAILS INFORMATION">
          
            <div class="">
                <div class="p-5 grid sm:grid-cols-2 gap-4">
                    <p> <span class="font-bold pr-3">Nationality:</span> {{ user_data.personal_details.nationality }}</p>
                    <p> <span class="font-bold pr-3">Marital Status:</span>{{ user_data.personal_details.status }}</p>
                    <p> <span class="font-bold pr-3">Dual Citizen:</span>{{ user_data.personal_details.citizen }}</p>
                    <p> <span class="font-bold pr-3">Interview Mode:</span>{{ user_data.personal_details.interview }}</p>
                </div>
                <p class="text-center  cinzel_dashboard_h3 underline">Residential Address</p>
                <div class="p-5 grid sm:grid-cols-2 gap-4">
                    <p> <span class="font-bold pr-3">County:</span> {{ user_data.personal_details.county }}</p>
                    <p> <span class="font-bold pr-3">Sub-county:</span>{{ user_data.personal_details.subCounty }}</p>
                    <p> <span class="font-bold pr-3">Consistency:</span>{{ user_data.personal_details.constituency }}</p>
                    <p> <span class="font-bold pr-3">Ward:</span>{{ user_data.personal_details.ward }}</p>
                </div>
                <p class="text-center cinzel_dashboard_h3 underline">Next of Kin</p>
                <div class="p-5 grid sm:grid-cols-2 gap-4">
                    <p> <span class="font-bold pr-3">Name:</span> {{ user_data.personal_details.kinName }}</p>
                    <p> <span class="font-bold pr-3">Email:</span>{{ user_data.personal_details.kinEmail }}</p>
                    <p> <span class="font-bold pr-3">Phone No.:</span>{{ user_data.personal_details.kinPhone }}</p>
                    <p> <span class="font-bold pr-3">Relationship:</span>{{ user_data.personal_details.kinRelationship }}</p>
                </div>
            </div>
        </dash-card>
        <dash-card h4="EDUCATION INFORMATION">
            <div class="">
                <p class="text-center cinzel_dashboard_h3 mt-5 underline">HIGHER EDUCATION</p>
                <div class="p-5 grid sm:grid-cols-2 gap-4">
                    <p> <span class="font-bold pr-3">Highest level:</span> {{ user_data.education_details.highestLevel }}</p>
                    <p> <span class="font-bold pr-3">University/Collage:</span>{{ user_data.education_details.collage }}</p>
                    <p> <span class="font-bold pr-3">Course:</span>{{ user_data.education_details.course }}</p>
                    <p> <span class="font-bold pr-3">Grade:</span>{{ user_data.education_details.grade }}</p>
                    <p> <span class="font-bold pr-3">Graduation Year:</span>{{ user_data.education_details.year }}</p>
                </div>
                <p class="text-center cinzel_dashboard_h3 mt-5 underline">HIGH SCHOOL</p>
                <div class="p-5 grid sm:grid-cols-2 gap-4">
                    <p> <span class="font-bold pr-3">Name:</span> {{ user_data.education_details.highSchool }}</p>
                    <p> <span class="font-bold pr-3">Year Completed:</span>{{ user_data.education_details.highYear }}</p>
                    <p> <span class="font-bold pr-3">Grade:</span>{{ user_data.education_details.highGrade }}</p>
                </div>
            </div>
        </dash-card>
        <dash-card h4="WORK EXPERIENCE INFORMATION">
            <div class="">
                
                <p class="text-center my-5"> <span class="font-bold pr-3">Years of Experience:</span> {{ user_data.work_details.yearsOfExperience }} years</p>
                <p class="text-center cinzel_dashboard_h3 mt-5 underline">Institutions/Companies</p>
                <div class="p-5 grid sm:grid-cols-2 gap-4">
                    <p> <span class="font-bold pr-3">Name:</span> {{ user_data.work_details.company }}</p>
                    <p> <span class="font-bold pr-3">Job Title:</span>{{ user_data.work_details.jobTitle }}</p>
                    <p> <span class="font-bold pr-3">From:</span>{{ dmy(user_data.work_details.start) }}</p>
                    <p> <span class="font-bold pr-3">From:</span>{{ dmy(user_data.work_details.end) }}</p>
                    <p> <span class="font-bold pr-3">Name:</span> {{ user_data.work_details.company2 }}</p>
                    <p> <span class="font-bold pr-3">Job Title:</span>{{ user_data.work_details.jobTitle2 }}</p>
                    <p> <span class="font-bold pr-3">From:</span>{{ dmy(user_data.work_details.start2) }}</p>
                    <p> <span class="font-bold pr-3">From:</span>{{ dmy(user_data.work_details.end2 )}}</p>
                </div>

                <p class="text-center cinzel_dashboard_h3 mt-5 underline">Referees</p>
                <div class="p-5 grid sm:grid-cols-2 gap-4">
                    <p> <span class="font-bold pr-3">First Name:</span> {{ user_data.work_details.fname }} </p>
                    <p> <span class="font-bold pr-3">Last Name:</span>{{ user_data.work_details.lname }}</p>
                    <p> <span class="font-bold pr-3">Institution:</span>{{ user_data.work_details.institution }}</p>
                    <p> <span class="font-bold pr-3">Contact:</span>{{ user_data.work_details.refereeContact }}</p>
                </div>
            </div>
        </dash-card>
        
    </div>
</div>
</template>

<style>
.cinzel_dashboard {
  font-family: "Cinzel", serif;
  font-optical-sizing: auto;
  font-weight: 600;
  font-style: normal;
}
.cinzel_dashboard_h3 {
  font-family: "Cinzel", serif;
  font-optical-sizing: auto;
  font-weight: 600;
  font-style: normal;
  font-size: medium;
}

</style>