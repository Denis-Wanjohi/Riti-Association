<script setup>
import StatCard from './StatCard.vue';
</script>
<template>
    <div class="grid grid-cols-3 my-10 text-white py-10" style="background-image: url('/images/field.png');background-position: 100%;">
        <stat-card icon="pi pi-lightbulb" figure="300+" tag="Business started"></stat-card>
        <stat-card icon="pi pi-briefcase" figure="1000+" tag="Job Secured"></stat-card>
        <stat-card icon="pi pi-user-edit" figure="3500+" tag="Youth Enrolled"></stat-card>
    </div>
</template>