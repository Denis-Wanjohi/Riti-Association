<script setup>
import NavBar from '@/components/Navbar.vue';
</script>
<template>
    <nav-bar></nav-bar>
    <main class="min-h-screen">
        <RouterView />
    </main>
</template>