<script setup>
import router from '@/router';
import IconEmployerSearch from './icons/IconEmployerSearch.vue';
import IconHandShake from './icons/IconHandShake.vue';
import IconProfile from './icons/IconProfile.vue';
import { Step, Stepper, StepList, StepPanel, StepPanels, StepItem } from 'primevue';
// import Button from 'primevue/button'
import Button from "primevue/button"
const steps = [
  {
    icon: IconProfile,
    title: "Register Your Profile",
    description:
      "Build a comprehensive profile showcasing your skills and experience, making you visible to a wide network of employers."
  },
  {
    icon: IconEmployerSearch,
    title: "Employers Discover You",
    description:
      "Our intelligent matching system connects your profile with relevant job openings, ensuring employers find the right talent, effortlessly."
  },
  {
    icon: IconHandShake,
    title: "We Connect You",
    description:
      "We streamline the process, providing direct introductions and communication tools to help you land your dream opportunity."
  }
];
</script>
<template>

  <div class="my-5">
    <div class="text-center">
      <div class="text-center px-5 poiret-one-regular font-bold  py-2 rounded-xl bg-blue-300 my-10 w-fit mx-auto">HOW IT
        WORKS</div>
      <p class="sm:text-5xl text-3xl my-4 cinzel">It's Easy to Get it Done</p>
      <p class="my-2 font-thin">Discover how we connect you with your next career move</p>
    </div>

    <div class="sm:block hidden">
      <div class="flex relative mt-16 ">
        <div v-for="{ title, description, icon }, index in steps" :key="index"
          class="border w-3/4 justify-center mx-4  text-center pb-10 rounded-2xl bg-white ">
          <div class="bg-gray-300 flex items-center justify-center w-20 h-20 rounded-full mx-auto relative -top-10">
            <component :is="icon" class="w-1/2 h-1/2"></component>
          </div>
          <h1 class="text-3xl font-bold mb-5">{{ title }}</h1>
          <p class="my-5 px-4">{{ description }}</p>
          <Button severity="info" v-if="index == 0" class="px-3  font-bold" @click="router.push('/auth/register')">Get
            Started <i class="pi pi-arrow-up-right"></i> </Button>
        </div>
      </div>
    </div>
    <div class="card sm:hidden block">
      <Stepper value="1">
        <StepItem value="1">
          <Step>Step I</Step>
          <StepPanel v-slot="{ activateCallback }">
            <div class="flex flex-col h-48">
              <!-- <div class="border w-3/4 justify-center mx-4   text-center pb-10 rounded-2xl bg-white "> -->
              <div class="bg-gray-300 flex items-center justify-center  p-2 rounded-full mx-auto">
                <component :is="steps[0].icon" class=""></component>
              </div>
              <h1 class="text-xl font-bold mb-5">{{ steps[0].title }}</h1>
              <p class="my-5 px-4">{{ steps[0].description }}</p>
              <Button severity="info" v-if="index == 0" class="px-3  font-bold"
                @click="router.push('/auth/register')">Get Started <i class="pi pi-arrow-up-right"></i> </Button>
              <!-- </div> -->
            </div>
            <div class="py-6">
              <Button label="Next" @click="activateCallback('2')" />
            </div>
          </StepPanel>
        </StepItem>
        <StepItem value="2">
          <Step>Step II</Step>
          <StepPanel v-slot="{ activateCallback }">
            <div class="flex flex-col h-48">
              <div class="bg-gray-300 flex items-center justify-center  p-2 rounded-full mx-auto">
                <component :is="steps[1].icon" class=""></component>
              </div>
              <h1 class="text-xl font-bold mb-5">{{ steps[1].title }}</h1>
              <p class="my-5 px-4">{{ steps[1].description }}</p>
              <Button severity="info" v-if="index == 0" class="px-3  font-bold"
                @click="router.push('/auth/register')">Get Started <i class="pi pi-arrow-up-right"></i> </Button>
            </div>
            <div class="flex py-6 gap-2">
              <Button label="Back" severity="secondary" @click="activateCallback('1')" />
              <Button label="Next" @click="activateCallback('3')" />
            </div>
          </StepPanel>
        </StepItem>
        <StepItem value="3">
          <Step>Step III</Step>
          <StepPanel v-slot="{ activateCallback }">
            <div class="flex flex-col h-48">
              <div class="bg-gray-300 flex items-center justify-center  p-2 rounded-full mx-auto">
                <component :is="steps[2].icon" class=""></component>
              </div>
              <h1 class="text-xl font-bold mb-5">{{ steps[2].title }}</h1>
              <p class="my-5 px-4">{{ steps[2].description }}</p>
              <Button severity="info" v-if="index == 0" class="px-3  font-bold"
                @click="router.push('/auth/register')">Get Started <i class="pi pi-arrow-up-right"></i> </Button>
            </div>
            <div class="py-6">
              <Button label="Back" severity="secondary" @click="activateCallback('2')" />
            </div>
          </StepPanel>
        </StepItem>
      </Stepper>
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