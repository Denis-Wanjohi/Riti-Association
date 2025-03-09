<script setup>
import IconEmployerSearch from './icons/IconEmployerSearch.vue';
import IconHandShake from './icons/IconHandShake.vue';
import IconProfile from './icons/IconProfile.vue';
// import Button from 'primevue/button'
import Button from "primevue/button"
const steps = [
  {
    icon:IconProfile,
    title: "Register Your Profile",
    description:
      "Build a comprehensive profile showcasing your skills and experience, making you visible to a wide network of employers."
  },
  {
    icon:IconEmployerSearch,
    title: "Employers Discover You",
    description:
      "Our intelligent matching system connects your profile with relevant job openings, ensuring employers find the right talent, effortlessly."
  },
  {
    icon:IconHandShake,
    title: "We Connect You",
    description:
      "We streamline the process, providing direct introductions and communication tools to help you land your dream opportunity."
  }
];
</script>
<template>
    
    <div class="my-5">
        <div class="text-center">
            <div class="text-center px-5 poiret-one-regular font-bold  py-2 rounded-xl bg-blue-300 my-10 w-fit mx-auto">HOW IT WORKS</div>
            <p class="text-5xl my-4 cinzel">It's Easy to Get it Done</p>
            <p class="my-2 font-thin">Discover how we connect you with your next career move</p>
        </div>

        <div class="flex relative mt-16">
            <div v-for="{title,description,icon},index in steps" :key="index"  class="border w-3/4 justify-center mx-4  text-center pb-10 rounded-2xl bg-white "> 
                <div class="bg-gray-300 flex items-center justify-center w-20 h-20 rounded-full mx-auto relative -top-10">
                    <component :is="icon" class="w-1/2 h-1/2"></component>
                </div>
                <h1 class="text-3xl font-bold mb-5">{{title}}</h1>
                <p class="my-5 px-4">{{ description }}</p>
                <!-- <p>explore</p> -->
                <Button severity="info" v-if="index == 0" class="px-3  font-bold ">Get Started <i class="pi pi-arrow-up-right"></i> </Button>
            </div>
        </div>
    </div>
</template>

<style>
.poiret-one-regular {
  font-family: "Poiret One", sans-serif;
  font-weight: 700;
  font-style: normal;
}
</style>