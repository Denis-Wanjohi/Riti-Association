<script setup>
import LoadingButton from '@/components/loadingButton.vue';
import Heading from '@/components/Heading.vue';
import { Button,Dialog,FloatLabel,InputText } from 'primevue';
import { ref } from 'vue';
import axiosClient from '@/axios/axios';
const professionalCategories = [
    {
        title: "Media & Advertising",
        desc: "Media, Advertising and Communications Professionals.",
        link: "/media-advertising"
    },
    {
        title: "Healthcare",
        desc: "Healthcare and Medical Professionals.",
        link: "/healthcare"
    },
    {
        title: "IT",
        desc: "Professionals in ICT and Telecommunications.",
        link: "/it"
    },
    {
        title: "Sales & Marketing",
        desc: "Sales and marketing professionals.",
        link: "/sales-marketing"
    },
    {
        title: "Hospitality & Tourism",
        desc: "Trained professionals in Hospitality.",
        link: "/hospitality-tourism"
    },
    {
        title: "Transport & Logistics",
        desc: "Professionals in Logistics the industry.",
        link: "/transport-logistics"
    },
    {
        title: "Accounting & Auditing",
        desc: "Professionals in Accounting.",
        link: "/accounting-auditing"
    },
    {
        title: "Human Resources",
        desc: "Professionals in Human resources.",
        link: "/human-resources"
    },
    {
        title: "Legal Services",
        desc: "Professionals in the Legal industry.",
        link: "/legal-services"
    },
    {
        title: "Manufacturing & Production",
        desc: "Professionals in Manufacturing.",
        link: "/manufacturing-production"
    },
    {
        title: "Engineering & Construction",
        desc: "Professionals in Engineering.",
        link: "/engineering-construction"
    },
    {
        title: "Agriculture and Agribusiness",
        desc: "Professionals in Agriculture.",
        link: "/agriculture"
    },
    {
        title: "Banking & Finance",
        desc: "Professionals in banking and Finance.",
        link: "/banking-finance"
    },
    {
        title: "Education & Training",
        desc: "Professionals in the Education sector.",
        link: "/education-training"
    },
    {
        title: "Energy & Utilities",
        desc: "Professionals in the Energy industry.",
        link: "/energy-utilities"
    }
];
const isSubmiting = ref(false)
const isSeeMore = ref(false)
const user = ref({
    'logID' : null,
    'password' : null,
})
function seeMore(){
    isSeeMore.value = true
}
function onLogin(){
    isSubmiting.value = true
    axiosClient.post('/login/employer',UserActivation.value)
    .then(res=>{
        isSeeMore.value = false
        isSubmiting.value = false
    })
    .catch(err=>{
        isSubmiting.value = false
        console.error(err)
    })
}
</script>
<template>
    <heading heading="PROFESSIONS" class="my-10" desc="Applicants are categorized according to different professions.">
    </heading>
    <main class="grid grid-cols-3 gap-5  w-4/5 mx-auto">
        <div v-for="x in 20" class="border p-3 rounded-md text-center">
            <p class="cinzel_dashboard ">Education</p>
            <p class="py-5">Lorem ipsum dolor sit amet.</p>
            <Button @click="seeMore" class="h-fit">  See more <i class="pi pi-arrow-up-right"></i></Button>
        </div>
    </main>
    <Dialog :visible="isSeeMore" header=" " class="w-1/3" modal="true">
        <div>
            <p class="text-center cinzel_dashboard mb-3">L O G I N</p>
            <p class="text-center text-sm text-gray-400">Must be an employer</p>
            <form @submit.prevent="onLogin" class="mt-3 grid grid-cols-1 gap-y-5">
                <FloatLabel variant="on" class="mx-auto  ">
                    <InputText id="logID" class="mx-auto" required></InputText>
                    <label for="logID">Log Id</label>
                </FloatLabel>
                <FloatLabel variant="on" class="mx-auto ">
                    <InputText id="password" class="mx-auto" type="password" required></InputText>
                    <label for="password">Password</label>
                </FloatLabel>
                <div class="w-full flex justify-center">
                  <Button v-if="!isSubmiting" type="submit" class="w-1/2 mx-auto">Login</Button>  
                  <loadingButton v-else></loadingButton>
                </div>
                
            </form>
        </div>
    </Dialog>
</template>

<style>
.cinzel_dashboard {
  font-family: "Cinzel", serif;
  font-optical-sizing: auto;
  font-weight: 600;
  font-style: normal;
}
</style>