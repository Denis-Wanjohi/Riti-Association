<script  setup>
import { Timeline } from 'primevue';
import { ref } from "vue";

const events = ref([
    { status: 'Ordered', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0'},
    { status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
    { status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
    { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' }
]);

const projects = [
  {
    "projectName": "Gikomba Mtaani",
    "description": "Gikomba Mtaani operates as a community-focused apparel and household goods shop, offering affordable second-hand items. It serves as a crucial side-hustle opportunity, enabling members to generate income while actively pursuing long-term, stable employment.",
    "learnMoreLink": "/gikomba-mtaani",
    "image": "/images/RITI Association of Unemployed Professionals_files/riti-07-e1707898597284-1024x638.jpeg"
  },
  {
    "projectName": "Rehabilitation Center",
    "description": "The St. Nicholas Rehabilitation Center and Psychiatric Hospital is dedicated to providing comprehensive rehabilitation and counseling services. It addresses mental health and well-being, offering vital support to individuals and families within the broader community, promoting healing and recovery.",
    "learnMoreLink": "/rehabilitation-center",
    "image": "/images/RITI Association of Unemployed Professionals_files/rehab-st-e1707899186196-1024x445.jpg"
  },
  {
    "projectName": "RITI SACCO",
    "description": "RITI SACCO functions as a financial cooperative, empowering members through accessible savings and loan opportunities. This crucial project provides the necessary financial support to launch and expand business ventures, fostering entrepreneurial growth and economic stability within the community.",
    "learnMoreLink": "/riti-sacco",
    "image":"/images/RITI Association of Unemployed Professionals_files/riti-06-e1707898652523-1024x307.jpeg"
  }
]
</script>
<template>
    <div>
        <div class="text-center">
            <div class="text-center px-5 poiret-one-regular font-bold  py-2 rounded-xl bg-blue-300 my-10 w-fit mx-auto">Featured projects</div>
            <p class="text-5xl my-4 cinzel">Our Projects</p>
            <p class="my-2 font-thin">We're dedicated to developing initiatives that foster growth, opportunity, and well-being</p>
        </div>
        <div class="w-[95%] mx-auto">
            <Timeline :value="projects" align="alternate" class=" ">
                <template #opposite="slotProps">
                <img :src="slotProps.item.image" class=" w-full my-10" alt="">
                </template>
                <template #content="slotProps">
                    <div class="flex items-center text-end px-5  ">
                        <div>
                            <h1 class="font-bold text-4xl text-center my-5">{{ slotProps.item.projectName }}</h1>
                            <p class="leading-loose my-5 w-3/4 mx-auto">
                                {{ slotProps.item.description }}
                                <!-- Through Gikomba Mtaani, we provide access to second-hand clothing and household goods, simultaneously offering our members valuable side-income during their job search. -->
                            </p>
                        </div>
                    </div>
                </template>
            </Timeline>
        </div>
    </div>
</template>