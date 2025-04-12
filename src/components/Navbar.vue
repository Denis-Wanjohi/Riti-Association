<template>
    <ConfirmPopup></ConfirmPopup>
    <div class="bg-gray-800 h-[70px] sm:px-10 flex  items-center justify-between">
        <div class=" w-fit h-full flex shrink-0 px-3 items-center  justify-center cursor-pointer"
            @click="router.push('/')">
            <img src="/images/logo.jpg" class="sm:w-15 sm:h-12 w-12 h-10 object-fill rounded" alt="">

            <p v-if="useUserStore().loggedIn" class="cinzel sm:text-4xl text-xl text-white text-center sm:mx-10">RITI
                ASSOCIATION</p>
        </div>
        <div v-if="!useUserStore().loggedIn" class="sm:w-1/2  sm:mx-auto ">
            <div class="sm:block hidden w-full mx-auto">
                <div class="card  text-white  flex ">
                    <div v-for="item in items" class="mx-auto font-serif">
                        <p @click="router.push(`${item.link}`)"
                            class="px-5 cursor-pointer text-nowrap  hover:bg-gray-600 py-1 rounded-sm  font-bold text-xl text-white">
                            {{ item.label }}</p>
                    </div>
                </div>
            </div>
            <div class="sm:hidden pr-2">
                <Button severity="info" @click="viewMenu = true"><i class="pi pi-bars"></i></Button>

            </div>

        </div>

        <div class="flex font-bold  sm:mx-10 sm:p-0 pr-2" v-else>
            <loading-button v-if="isLoggingout" class="text-white" style="color:white"></loading-button>

            <div v-if="!isLoggingout" class="sm:block hidden">
                <Button @click="confirm1($event)">L o g o u t </Button>
            </div>
            <div v-if="!isLoggingout" class="sm:hidden block">
                <Button @click="confirm1($event)"><i class="pi pi-sign-out"></i></Button>
            </div>

        </div>


    </div>
    <Drawer v-model:visible="viewMenu">
        <template #closeicon>
            <i class="pi pi-times"></i>
        </template>
        <template #container>
            <div class="flex items-baseline justify-between w-11/12 mx-auto">
                <p class="cinzel w-full  text-2xl text-center mt-5" style="font-weight: bold;">RITI ASSOCIATION</p>
                <i @click="viewMenu = false" class="pi w-1/12 pi-times"></i>
            </div>
            <Divider></Divider>
            <div v-for="item in items" class="mx-auto font-serif">
                <p @click="router.push(`${item.link}`), viewMenu = false"
                    class="px-5 cursor-pointer  hover:bg-gray-600 py-3 rounded-sm  font-bold text-xl">
                    <i :class="item.icon"></i>
                    {{ item.label }}
                </p>
            </div>
            <p @click="router.push('/applicants'), viewMenu = false"
                class="px-5 cursor-pointer mx-auto hover:bg-gray-600 py-3 rounded-sm  font-bold text-xl">
                <i class="pi pi-users"></i>
                Applicants
            </p>
            <p @click="router.push('/auth/login'), viewMenu = false"
                class="px-5 cursor-pointer flex mx-auto  hover:bg-gray-600 py-3 rounded-sm  font-bold text-xl">
                <component :is="IconPortal"></component>
                Portal
            </p>

        </template>
    </Drawer>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { Button, Drawer, Divider, ConfirmPopup } from 'primevue'
import router from "@/router";
import LoadingButton from "./loadingButton.vue";
import axiosClient from "@/axios/axios";
import { useUserStore } from "@/stores/user";
import IconPortal from "./icons/IconPortal.vue";
import { useConfirm } from "primevue/useconfirm";
const confirm = useConfirm();
const viewMenu = ref(false)
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
        label: 'Professions',
        link: '/professions'
    },
    {
        label: 'Projects',
        icon: 'pi pi-briefcase',
        link: '/projects'
    },
    {
        label: 'Contacts',
        icon: 'pi pi-phone',
        link: '/contacts'
    }
]);
const isExit = ref(false)
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

    axiosClient.post('/logout', { user: user })
        .then(res => {
            sessionStorage.clear()
            token.value = false;
            isLoggingout.value = false
            useUserStore().setLoggedIn(false)
            router.push('/')
            isLoggingout.value = false
        })
        .catch(err => {
            console.error(err)
            isLoggingout.value = false
        })

}
onMounted(() => {
    if (sessionStorage.getItem('token')) {
        token.value = true
    } else {
        token.value = false
    }

})
const confirm1 = (event) => {
    confirm.require({
        target: event.currentTarget,
        message: 'Are you sure you want to logout?',
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
            label: 'No',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Yes'
        },
        accept: () => {
            
            isLoggingout.value = true
            logout()
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
};

</script>



<style>
.p-toast {
    width: 90% !important;
    /* Default width for small screens */
    max-width: 400px;
    /* Ensures it doesn't get too large */
}

/* Medium screens (tablets) */
@media (min-width: 768px) {
    .p-toast {
        width: 50% !important;
        max-width: 500px;
    }
}

/* Large screens (desktops) */
@media (min-width: 1024px) {
    .p-toast {
        width: 30% !important;
        max-width: 600px;
    }
}
</style>