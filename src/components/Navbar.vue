<template>
    <div class="bg-gray-800 h-[70px] flex items-center justify-between">
        <div class=" w-1/4 h-full flex shrink-0 items-center justify-center">
            <img src="/images/logo.jpg" class=" w-15 h-12 object-fill rounded" alt="">
            
        </div>
        <div class="card text-white w-full">
            <Menubar :model="items"  style="background: local;color: white;border: 0;">
                <template #item="{item}">
                    <p @click="router.push(`${item.link}`)" class="px-5 cursor-pointer hover:bg-gray-600 py-1 rounded-sm  font-bold text-xl text-white">{{ item.label }}</p>
                </template>
            </Menubar>
        </div>
        
    </div>
</template>

<script setup>
import { ref } from "vue";
import {Menubar} from 'primevue'
import router from "@/router";
const items = ref([
    {
        label: 'Home',
        icon: 'pi pi-home',
        link:'/'
    },
    {
        label: 'About Us',
        icon: 'pi pi-star',
        link:'/about-us'
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
        link:'/contacts'
    }
]);
</script>


<style>
.p-menubar{
    color: red;
}
</style>