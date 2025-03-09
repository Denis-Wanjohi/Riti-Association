<template>
    <div>
        <div class=" m-10 rounded-xl flex bg-blue-500 h-[40vh]">
            <div class="flex items-center w-3/4 justify-center">
                <div>
                    <p class="text-5xl font-bold cinzel_cta">CONNECT, GROW AND SUCCCEED</p>
                    <p class="text-center font-thin my-5 text-xl">Join us today,become a member and enjoy the benefits of our services</p>
                </div>
            </div>
            <div class="flex justify-center items-center w-1/4">
                <Button severity="secondary" class="font-bold text=">R e g i s t e r</Button>
            </div>
        </div>
    </div>
</template>

<script setup>
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