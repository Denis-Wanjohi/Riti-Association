<script setup>
import router from '@/router';
import IconPortal from './icons/IconPortal.vue';
import { Divider } from 'primevue';
import {scrollUp} from '@/utilities/util.js'
</script>
<template>
    <div class="flex  w-11/12  mx-auto">
        <div class="w-4/12">
            <div class="flex items-center justify-center">
                <img src="/images/logo.png" class="rounded-full w-[100px] h-[100px]" alt="main logo">
                <div class="w-1/2">
                    <p class="cinzel_footer">RITI ASSOCIATION</p>
                    <p class="cinzel_footer">OF UNEMPLOYED PROFESSIONALS</p>
                </div>
            </div>
            <p class="mx-5 font-thin text-sm text-center">Transforming Kenyan youth's futures by introducing them to entrepreneurial ventures, creating opportunities beyond conventional careers and driving sustainable growth.</p>
            <div class="grid grid-cols-4 w-3/4 mx-auto my-5">
                <i class="pi pi-facebook cursor-pointer"></i>
                <i class="pi pi-twitter cursor-pointer"></i>
                <i class="pi pi-instagram cursor-pointer"></i>
                <i class="pi pi-youtube cursor-pointer"></i>
            </div>
        </div>
        <div class="flex w-8/12 justify-around">
            <div  class="w-1/2  text-start  gabriela-regular">
                <div class="mx-auto w-fit">
                    <p class="my-3 font-bold  cursor-pointer"><i class="pi pi-home mx-2"></i> Home</p>
                    <p class="my-3 font-bold cursor-pointer"> <i  class="pi pi-user mx-2"></i> About us</p>
                    <p class="my-3 font-bold cursor-pointer" @click="router.push('/applicants'),scrollUp()"> <i class="pi pi-users mx-2"></i>Applicants</p>
                    <p class="my-3 font-bold cursor-pointer flex items-center"  @click="router.push('/auth/login'),scrollUp()">
                        <IconPortal  class="mx-2"></IconPortal>
                        Portal</p>
                </div>
            </div>
            <div class="w-1/2 text-center">
                <h1 class="font-bold text-2xl mb-5"> Contacts</h1>
                <p class="gabriela-regular my-4"><i class="pi pi-phone"></i> +254 740 544 047</p>
                <p class="gabriela-regular  my-4"> <i class="pi pi-map-marker"></i>Meru-Milimani, off Alba Street, Opposite Alba Hotel,
                    Meru County</p>
            </div>
        </div>

    </div>
    <Divider></Divider>
    <p class="text-center my-4">&copy; {{new Date().getFullYear()}} RITI Association. All rights reserved.</p>
</template>

<style>
.cinzel_footer {
  font-family: "Cinzel", sans-serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
  font-size: large;
  text-align: center;
}
</style>