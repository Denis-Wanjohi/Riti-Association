<script setup>
import Heading from '@/components/Heading.vue';
import { Button } from 'primevue';
</script>
<template>
    <div class="h-screen">
        <heading heading="RITI ASSOCIATION  OF UNEMPLOYED PROFESSIONALS" desc="EMAIL VERIFICATION"></heading>
        <div class="flex">
            <div class="flex justify-center px-10 items-center">
                <div class="mx-auto">
                    <div class="my-5 text-slate-800">We have sent  an email to:</div>
                    <div class="font-bold text-xl my-5 px-10">gightkingss@gmail.com</div>
                    <div class="text-slate-800  leading-loose">Please click on the verification link in the email to complete your registration. If you didn’t receive the email, we can resend it.</div>
                    <Button severity="info" class="w-full">Resend verification email.</Button>
                </div>
            </div>
            <div class="flex justify-center items-center">
                <img src="/images/hero.png" class="w-3/4 " alt="">
            </div>
        </div>
    </div>
</template>