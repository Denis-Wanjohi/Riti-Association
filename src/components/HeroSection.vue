<script setup>
import router from '@/router';

</script>

<template>
  
    <div class="w-full h-[90vh]" style="background-image: url('/images/hero.png'); background-size: cover; background-repeat: no-repeat; background-position: center;">
      <div class="w-full bg-gradient-to-tr from-gray-600    h-full bg-opacity-10 flex items-center  text-white">
        <div>
            <p class="sm:text-6xl text-5xl font-bold cinzel text-center mx-auto">Unlock Your Potential...</p>
            <p class="sm:text-6xl text-4xl font-bold cinzel  text-center mx-auto">Find Your Path...</p>
            <p class="sm:text-4xl  text-2xl font-bold cinzel  text-center mx-auto">Build Your Future.</p>
            <p class="text-center sm:text-xl text-md py-5">Here to Connect You with Opportunities and a ready Supportive Community. </p>
            <div class="flex justify-around p-5 sm:w-3/4 mx-auto font-sans">
              <div @click="router.push('/auth/register')" class="bg-blue-400 cursor-pointer px-4 py-3 rounded-[30px] font-bold hover:bg-white hover:text-blue-400 ">Get started</div>
              <div @click="router.push('/about-us')" class="border cursor-pointer   hover:bg-blue-500 hover:text-white px-4 py-3 rounded-[50px] font-bold ">About us</div>
            </div>
        </div>
      </div>
    </div>
  
</template>

<style>
.gabriela-regular {
  font-family: "Gabriela", serif;
  font-weight: 400;
  font-style: normal;
}
.cinzel {
  font-family: "Cinzel", serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}

</style>
