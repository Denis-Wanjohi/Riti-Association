<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import NavBar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import DefaultLayout from './layout/default.vue'
import Authenticated from './layout/authenticated.vue'
import { useUserStore } from './stores/user'
</script>

<template>
  <default-layout  v-if="!useUserStore().loggedIn"></default-layout>
  <authenticated  v-else></authenticated>
</template>
