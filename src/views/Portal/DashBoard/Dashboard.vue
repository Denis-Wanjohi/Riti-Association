<script setup>
import Heading from '@/components/Heading.vue';
import DashCard from '@/components/dash_card.vue';
import {Button} from 'primevue'
import { useApplicantStore } from '@/stores/applicant';
import { onMounted, ref } from 'vue';
import router from '@/router';
import axiosClient from '@/axios/axios';
const applicantStore = useApplicantStore()
const user_data = ref(null)
user_data.value = sessionStorage.getItem('applicant')
onMounted(()=>{
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
</script>
<template>
<div>
    <heading heading="Dashboard"></heading>
    {{ user_data.fullname }}
    <div v-if="user_data.step != 4"  class="flex justify-center items-center h-[70vh] ">
        <div class="w-1/4  mx-auto text-center">
            <p class="text-2xl font-bold my-10">WELCOME</p>
            <RouterLink to="/registration/personal-details">
                <Button severity="info"  class="font-bold text-3xl tect">Finish up your registration</Button>
            </RouterLink>
        </div>
    </div>
    <div v-else  class="grid grid-cols-2 gap-3 h-screen p-10 cinzel_dashboard_h3">
        <dash-card h4="YOUR INFORMATION">
           
            <div class="">
                <img src="/public/images/hero.png" class="w-[140px] mx-auto h-[140px] rounded-full  p-5" alt="">
                <div class="p-5 w-fit mx-auto">
                    <p> <span class="font-bold pr-3">Name:</span> Kim kimani</p>
                    <p> <span class="font-bold pr-3">Email:</span>imani@gmail.com</p>
                    <p> <span class="font-bold pr-3">Phone No.:</span>0778787878</p>
                    <p> <span class="font-bold pr-3">D.O.B:</span>20/08/2001</p>
                    <p> <span class="font-bold pr-3">Membership ID:</span>RAOUP/0000/25</p>
                </div>
            </div>
        </dash-card>
        <dash-card h4="PERSONAL DETAILS INFORMATION">
          
            <div class="">
                <div class="p-5 grid grid-cols-2 gap-4">
                    <p> <span class="font-bold pr-3">Nationality:</span> Kenyan</p>
                    <p> <span class="font-bold pr-3">Marital Status:</span>Single</p>
                    <p> <span class="font-bold pr-3">Dual Citizen:</span>Yes</p>
                    <p> <span class="font-bold pr-3">Interview Mode:</span>Remote</p>
                </div>
                <p class="text-center  cinzel_dashboard_h3 underline">Residential Address</p>
                <div class="p-5 grid grid-cols-2 gap-4">
                    <p> <span class="font-bold pr-3">County:</span> Meru</p>
                    <p> <span class="font-bold pr-3">Sub-county:</span>Imenti-North</p>
                    <p> <span class="font-bold pr-3">Consistency:</span>Municpality</p>
                    <p> <span class="font-bold pr-3">Ward:</span>Kaaga</p>
                </div>
                <p class="text-center cinzel_dashboard_h3 underline">Next of Kin</p>
                <div class="p-5 grid grid-cols-2 gap-4">
                    <p> <span class="font-bold pr-3">Name:</span> Jerry Tim</p>
                    <p> <span class="font-bold pr-3">Email:</span>tim@gmail.com</p>
                    <p> <span class="font-bold pr-3">Phone No.:</span>0778787878</p>
                    <p> <span class="font-bold pr-3">Relationship:</span>Brother</p>
                </div>
            </div>
        </dash-card>
        <dash-card h4="EDUCATION INFORMATION">
            <div class="">
                <p class="text-center cinzel_dashboard_h3 mt-5 underline">HIGHER EDUCATION</p>
                <div class="p-5 grid grid-cols-2 gap-4">
                    <p> <span class="font-bold pr-3">Highest level:</span> University</p>
                    <p> <span class="font-bold pr-3">University/Collage:</span>University of Nairobi</p>
                    <p> <span class="font-bold pr-3">Course:</span>Medial Sciences</p>
                    <p> <span class="font-bold pr-3">Grade:</span>First Class</p>
                    <p> <span class="font-bold pr-3">Graduation Year:</span>2020</p>
                </div>
                <p class="text-center cinzel_dashboard_h3 mt-5 underline">HIGH SCHOOL</p>
                <div class="p-5 grid grid-cols-2 gap-4">
                    <p> <span class="font-bold pr-3">Name:</span> Kabianga</p>
                    <p> <span class="font-bold pr-3">Year Completed:</span>2016</p>
                    <p> <span class="font-bold pr-3">Grade:</span>B+</p>
                </div>
            </div>
        </dash-card>
        <dash-card h4="WORK experience INFORMATION">
            <div class="">
                
                <p class="text-center my-5"> <span class="font-bold pr-3">Years of Experience:</span> 4 years</p>
                <p class="text-center cinzel_dashboard_h3 mt-5 underline">Institutions/Companies</p>
                <div class="p-5 grid grid-cols-2 gap-4">
                    <p> <span class="font-bold pr-3">Name:</span> Kinuthi and sons</p>
                    <p> <span class="font-bold pr-3">Job Title:</span>Secretary</p>
                    <p> <span class="font-bold pr-3">From:</span>09/08/23</p>
                    <p> <span class="font-bold pr-3">From:</span>09/08/24</p>
                    <p> <span class="font-bold pr-3">Name:</span> Aspire Eats</p>
                    <p> <span class="font-bold pr-3">Job Title:</span>Chef</p>
                    <p> <span class="font-bold pr-3">From:</span>09/08/24</p>
                    <p> <span class="font-bold pr-3">From:</span>09/08/25</p>
                </div>

                <p class="text-center cinzel_dashboard_h3 mt-5 underline">Referees</p>
                <div class="p-5 grid grid-cols-2 gap-4">
                    <p> <span class="font-bold pr-3">First Name:</span> Kinuthi </p>
                    <p> <span class="font-bold pr-3">Last Name:</span>Kimani</p>
                    <p> <span class="font-bold pr-3">Institution:</span>Kinuthia and sons</p>
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