<template>
    <div class="bg-gray-800 h-[70px] px-10 flex items-center justify-between">
        <div class=" w-fit h-full flex shrink-0 items-center justify-center cursor-pointer" @click="router.push('/')">
            <img src="/images/logo.jpg"  class=" w-15 h-12 object-fill rounded" alt="">
            <p v-if="useUserStore().loggedIn" class="cinzel text-4xl text-white text-center mx-10">RITI ASSOCIATION</p>

        </div>
        <div class="card text-white w-1/2 flex mx-auto" v-if="!useUserStore().loggedIn">
            <!-- <Menubar :model="items" style="background: local;color: white;border: 0;"> -->
            <div v-for="item in items" class="mx-auto font-serif">
                <!-- <template #item="{ item }"> -->
                <p @click="router.push(`${item.link}`)"
                    class="px-5 cursor-pointer  hover:bg-gray-600 py-1 rounded-sm  font-bold text-xl text-white">{{
                        item.label }}</p>
                <!-- </template> -->
                <!-- </Menubar> -->
            </div>
        </div>

        <div class="flex font-bold  mx-10" v-else>
            <Button v-if="!isLoggingout" @click="logout">L o g o u t</Button>
            <loading-button v-else></loading-button>
        </div>


    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { Menubar, Button } from 'primevue'
import router from "@/router";
import LoadingButton from "./loadingButton.vue";
import axiosClient from "@/axios/axios";
import { useUserStore } from "@/stores/user";
const items = ref([
    {
        label: 'Home',
        icon: 'pi pi-home',
        link: '/'
    },
    {
        label: 'About Us',
        icon: 'pi pi-star',
        link: '/about-us'
    },
    {
        label: 'Projects',
        icon: 'pi pi-search',
        link: '/projects'
    },
    {
        label: 'Contacts',
        icon: 'pi pi-envelope',
        link: '/contacts'
    }
]);
const isLoggingout = ref(false)
const token = ref(false)
function logout() {
    isLoggingout.value = true
    let user;
    if (sessionStorage.getItem('admin')) {
        user = "admins"
    } else if (sessionStorage.getItem('employer')) {
        user = "employers"
    } else if (sessionStorage.getItem('applicant')) {
        user = "applicants"
    }
    isLoggingout.value = true

    axiosClient.post('/logout', { user: user })
        .then(res => {
            sessionStorage.clear()
            token.value = false;
            isLoggingout.value = false
            useUserStore().setLoggedIn(false)
            router.push('/')
        })
        .catch(err => {

        })
    isLoggingout.value = false
}
onMounted(() => {
    if (sessionStorage.getItem('token')) {
        token.value = true
    } else {
        token.value = false
    }

})
</script>


<style>
.p-menubar {
    color: red;
}
</style>