<template>
    <div class="bg-gray-800 h-[70px] flex items-center justify-between">
        <div class=" w-1/4 h-full flex shrink-0 items-center justify-center">
            <img src="/images/logo.jpg" class=" w-15 h-12 object-fill rounded" alt="">

        </div>
        <div class="card text-white w-full">
            <Menubar :model="items" style="background: local;color: white;border: 0;">
                <template #item="{ item }">
                    <p @click="router.push(`${item.link}`)"
                        class="px-5 cursor-pointer hover:bg-gray-600 py-1 rounded-sm  font-bold text-xl text-white">{{
                        item.label }}</p>
                </template>
            </Menubar>
        </div>
        <div class="flex" v-if="token">
            <Button v-if="!isLoggingout" @click="logout">Logout</Button>
            <loading-button v-else></loading-button>
        </div>
        <div v-else>
            <Button severity="info" @click="router.push('/auth/login')">login</Button>
        </div>

    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { Menubar, Button } from 'primevue'
import router from "@/router";
import LoadingButton from "./loadingButton.vue";
import axiosClient from "@/axios/axios";
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
        items: [
            {
                label: 'Components',
                icon: 'pi pi-bolt'
            },
            {
                label: 'Blocks',
                icon: 'pi pi-server'
            },
            {
                label: 'UI Kit',
                icon: 'pi pi-pencil'
            },
            {
                label: 'Templates',
                icon: 'pi pi-palette',
                items: [
                    {
                        label: 'Apollo',
                        icon: 'pi pi-palette'
                    },
                    {
                        label: 'Ultima',
                        icon: 'pi pi-palette'
                    }
                ]
            }
        ]
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
    
    axiosClient.post('/logout',{user:user})
        .then(res => {
            sessionStorage.clear()
            token.value = false;
            isLoggingout.value = false
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