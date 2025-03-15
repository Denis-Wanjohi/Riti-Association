<script setup>
import Heading from '@/components/Heading.vue';
import { Button } from 'primevue';
import { onMounted,ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()
const email = ref()
onMounted(()=>{
    email.value = route.query.e 
})
</script>
<template>
    <div class="h-screen">
        <heading heading="RITI ASSOCIATION  OF UNEMPLOYED PROFESSIONALS" desc="EMAIL VERIFICATION"></heading>
        <div class="flex mt-10">
            <div class="flex w-1/2 justify-center px-10 items-center">
                <div class="mx-auto">
                    <div class="my-5 text-slate-800 text-center">We have sent  an email to:</div>
                    <div class="font-bold text-xl my-5 px-10 text-center ">{{email}}</div>
                    <div class="text-slate-800 text-sm text-center mb-10  leading-loose">Please follow the instructions in the email to complete your registration. <br> If you didn’t receive the email, click the button below.</div>
                    <Button severity="info" class="w-full">Resend verification email.</Button>
                </div>
            </div>
            <div class="flex w-1/2 justify-center items-center">
                <img src="/images/hero.png" class="w-3/4 " alt="">
            </div>
        </div>
    </div>
</template>