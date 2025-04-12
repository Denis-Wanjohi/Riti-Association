<script setup>
import { RouterLink, RouterView } from 'vue-router'
import DefaultLayout from './layout/default.vue'
import Authenticated from './layout/authenticated.vue'
import { useUserStore } from './stores/user'
</script>

<template>
  <main class="dark:text-black dark:bg-slate-100">
    <default-layout v-if="!useUserStore().loggedIn"></default-layout>
    <authenticated v-else></authenticated>
  </main>

</template>
