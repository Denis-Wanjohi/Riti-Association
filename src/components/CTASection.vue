<template>
    <div>
        <div class=" sn:m-10 m-5 rounded-xl text-center p-1 sm:flex bg-blue-500 h-[40vh]">
            <div class="flex items-center sm:w-3/4 justify-center">
                <div>
                    <p class="sm:text-5xl text-3xl font-bold cinzel_cta">CONNECT, GROW AND SUCCCEED</p>
                    <p class="text-center font-thin my-5 sm:text-xl">Join us today,become a member and enjoy the benefits of our services</p>
                </div>
            </div>
            <div class="flex justify-center items-center sm:w-1/4">
                <Button severity="secondary" @click="router.push('/auth/register')" class="font-bold text=">R e g i s t e r</Button>
            </div>
        </div>
    </div>
</template>

<script setup>
import router from '@/router';
import {Button} from 'primevue'
</script>

<style>
.cinzel_cta {
  font-family: "Cinzel", sans-serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
  text-align: center;
}
</style>