<script setup>
import LoadingButton from '@/components/loadingButton.vue';
import Heading from '@/components/Heading.vue';
import { Button,Dialog,FloatLabel,InputText,Tag,Toast } from 'primevue';
import { ref } from 'vue';
import { useToast } from 'primevue';
import axiosClient from '@/axios/axios';
import { useEmployerStore } from '@/stores/employer';
import { formLink } from '@/utilities/util';
import router from '@/router';
const toast = useToast()
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
const destination = ref(null)
const user = ref({
    'employerID' : null,
    'password' : null,
})
function seeMore(title){
    isSeeMore.value = true
    destination.value  = formLink(title)
}
function onLogin(){
    if (Object.values(user.value).some(value => !value)) {
        toast.add({severity:'error',summary:'FORM ERRORS',detail:'Please make sure you fill the whole form ',life:5000})
        return;
    }
    isSubmiting.value = true
    axiosClient.post('/login/employer',user.value)
    .then(res=>{
        isSeeMore.value = false
        isSubmiting.value = false
        sessionStorage.setItem('token',res.data.token)
        sessionStorage.setItem('employer',JSON.stringify(res.data.user))
        useEmployerStore().setEmployer(res.data.user)
        router.push('/dashboard/category/'+destination.value)
        destination.value = null
    })
    .catch(err=>{
        isSubmiting.value = false
        console.error(err)
    })
}
</script>
<template>
    <Toast>ep</Toast>
    <heading heading="PROFESSIONS" class="my-10" desc="Applicants are categorized according to different professions.">
    </heading>
    <main class="grid grid-cols-3 gap-5  w-4/5 mx-auto  mb-10 pb-10">
        <div v-for="{title,desc,link} in professionalCategories" class="border bg-slate-100 hover:bg-slate-200 shadow-sm p-3 rounded-md text-center">
            <div class="flex justify-center items-center">
                <p class="cinzel_dashboard ">{{title}}</p>
                <Tag class="mx-2 text-xs">10</Tag>
            </div>
            <p class="py-5">{{desc}}</p>
            <Button @click="seeMore(title)"  severity="info" class="h-fit">  See more <i class="pi pi-arrow-up-right"></i></Button>
        </div>
    </main>
    <Dialog :visible="isSeeMore" header=" " class="w-1/3" modal :closable="false">
        <template  #header>
            <div class="flex justify-end mr-5 w-full">
                <i class="pi pi-times bg-slate-200 p-1 rounded-full" size="large" @click="isSeeMore = false"></i>
            </div>
        </template>
        <div>
            <p class="text-center cinzel_dashboard mb-3">L O G I N</p>
            <p class="text-center text-sm text-gray-400">Must be an employer</p>
            <form @submit.prevent="onLogin" class="mt-3 grid grid-cols-1 gap-y-5">
                <FloatLabel variant="on" class="mx-auto  ">
                    <InputText id="logID" class="mx-auto" v-model="user.employerID" required></InputText>
                    <label for="logID">Log Id</label>
                </FloatLabel>
                <FloatLabel variant="on" class="mx-auto ">
                    <InputText id="password" class="mx-auto" v-model="user.password" type="password" required></InputText>
                    <label for="password">Password</label>
                </FloatLabel>
                <p class="text-sm text-center">Are you an employer? <router-link class="text-blue-500 hover:font-bold" to="/register/employer">Get access</router-link></p>
                <div class="w-full flex justify-center">
                  <Button v-if="!isSubmiting" type="submit" class="w-1/2 mx-auto">Login</Button>  
                  <loading-button v-else></loading-button>
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