<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import NavBar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <nav-bar></nav-bar>
  <main class="min-h-screen">
    <RouterView />
  </main>
  <Footer></Footer>
</template>
