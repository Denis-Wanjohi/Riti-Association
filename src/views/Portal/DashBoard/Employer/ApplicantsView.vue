<script setup>
import LoadingButton from '@/components/loadingButton.vue';
import Heading from '@/components/Heading.vue';
import { Button, Dialog, FloatLabel, InputText, Tag } from 'primevue';
import { onMounted, ref } from 'vue';
import axiosClient from '@/axios/axios';
import router from '@/router';
import { formLink } from '@/utilities/util';
const professionalCategories = ref([
    {
        title: "Media & Advertising",
        desc: "Media, Advertising and Communications Professionals.",
        link: "/media-advertising",
        count: 0
    },
    {
        title: "Healthcare",
        desc: "Healthcare and Medical Professionals.",
        link: "/healthcare",
        count: 0
    },
    {
        title: "IT",
        desc: "Professionals in ICT and Telecommunications.",
        link: "/it",
        count: 0
    },
    {
        title: "Sales & Marketing",
        desc: "Sales and marketing professionals.",
        link: "/sales-marketing",
        count: 0
    },
    {
        title: "Hospitality & Tourism",
        desc: "Trained professionals in Hospitality.",
        link: "/hospitality-tourism",
        count: 0
    },
    {
        title: "Transport & Logistics",
        desc: "Professionals in Logistics the industry.",
        link: "/transport-logistics",
        count: 0
    },
    {
        title: "Accounting & Auditing",
        desc: "Professionals in Accounting.",
        link: "/accounting-auditing",
        count: 0
    },
    {
        title: "Human Resources",
        desc: "Professionals in Human resources.",
        link: "/human-resources",
        count: 0
    },
    {
        title: "Legal Services",
        desc: "Professionals in the Legal industry.",
        link: "/legal-services",
        count: 0
    },
    {
        title: "Manufacturing & Production",
        desc: "Professionals in Manufacturing.",
        link: "/manufacturing-production",
        count: 0
    },
    {
        title: "Engineering & Construction",
        desc: "Professionals in Engineering.",
        link: "/engineering-construction",
        count: 0
    },
    {
        title: "Agriculture and Agribusiness",
        desc: "Professionals in Agriculture.",
        link: "/agriculture",
        count: 0
    },
    {
        title: "Banking & Finance",
        desc: "Professionals in banking and Finance.",
        link: "/banking-finance",
        count: 0
    },
    {
        title: "Education & Training",
        desc: "Professionals in the Education sector.",
        link: "/education-training",
        count: 0
    },
    {
        title: "Energy & Utilities",
        desc: "Professionals in the Energy industry.",
        link: "/energy-utilities",
        count: 0
    }
]);
// const isSubmiting = ref(false)
const isSeeMore = ref(false)
const user = ref({
    'logID': null,
    'password': null,
})
function seeMore() {
    isSeeMore.value = true
}
onMounted(() => {
    axiosClient.get('/category/stat')
        .then(res => {
            const countsArray = Object.entries(res.data.count).map(([key, value]) => ({ title: key, count: value }));
            professionalCategories.value.forEach(element => {
                countsArray.forEach(el => {
                    if (el.title.match(element.title)) {
                        element.count = el.count

                    }
                })
            })

        })
        .catch(err => {
            console.error(err)
        })
})

</script>
<template>
    <heading heading="PROFESSIONS" class="my-10" desc="Applicants are categorized according to different professions.">
    </heading>
    <main class="grid grid-cols-3 gap-5  w-4/5 mx-auto  mb-10 pb-10">
        <div v-for="{ title, desc, link, count } in professionalCategories"
            class="border bg-slate-100 hover:bg-slate-200 shadow-sm p-3 rounded-md text-center">
            <div class="flex justify-center items-center">
                <p class="cinzel_dashboard ">{{ title }}</p>
                <Tag class="mx-2 text-xs">{{ count }}</Tag>
            </div>
            <p class="py-5">{{ desc }}</p>
            <Button @click="router.push('/dashboard/category/' + formLink(title))" severity="info" class="h-fit"> See
                more <i class="pi pi-arrow-up-right"></i></Button>
        </div>
    </main>
    <Dialog :visible="isSeeMore" header=" " class="w-1/3" modal :closable="false">
        <template #header>
            <div class="flex justify-end mr-5 w-full">
                <i class="pi pi-times bg-slate-200 p-1 rounded-full" size="large" @click="isSeeMore = false"></i>
            </div>
        </template>
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
                <p>Are you an employer? <router-link to="/">Get access</router-link></p>
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