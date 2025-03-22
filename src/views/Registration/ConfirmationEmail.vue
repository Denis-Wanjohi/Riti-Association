<script setup>
import Heading from '@/components/Heading.vue';
import router from '@/router';
import { scrollUp } from '@/utilities/util';
import { Button } from 'primevue';
import { onMounted,ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()
const name = ref()
onMounted(()=>{
    scrollUp()
    if(route.query.n == null){
        router.push('/')
        return;
    }
    name.value = route.query.n.charAt(0).toUpperCase()
    + route.query.n.slice(1)
})
</script>
<template>
    <div class="h-screen">
        <heading heading="RITI ASSOCIATION  OF UNEMPLOYED PROFESSIONALS" desc="REGISTRATION ACKNOWLEDGMENT"></heading>
        <div class="flex mt-10">
            <div class="flex w-1/2 justify-center px-10 items-center">
                <div class="mx-auto">
                    <div class="my-5 text-slate-800 text-center">Hello {{name }}</div>
                    <div class="text-slate-800 text-sm text-center mb-10  leading-loose">We appreciate you for joining us as an employer.<br> We have received your request and login credentials will be sent to you via email within  48hours of working days.</div>
                    <Button severity="info" class="w-full" @click="router.push('/')">Return to Home</Button>
                </div>
            </div>
            <div class="flex w-1/2 justify-center items-center">
                <img src="/images/hero.png" class="w-3/4 " alt="">
            </div>
        </div>
    </div>
</template>