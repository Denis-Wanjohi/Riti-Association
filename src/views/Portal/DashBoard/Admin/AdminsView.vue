<script setup>
import { onMounted, ref } from 'vue';
import { DataTable, Toast, Column, IconField, InputIcon, InputText, Button, useToast, Dialog, FloatLabel, useConfirm, ConfirmPopup } from 'primevue';
import axiosClient from '@/axios/axios';
import { FilterMatchMode } from '@primevue/core/api';
import LoadingButton from '@/components/loadingButton.vue';
import Heading from '@/components/Heading.vue';
import router from '@/router';
import { useRouter } from 'vue-router';
const admins = ref([])
const toast = useToast()
const loading = ref(true)
const isSubmitting = ref(false)
const confirm = useConfirm();
const isEdit = ref(false)
const updatePassword = ref(false)
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    staffNo: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    email: { value: null, matchMode: FilterMatchMode.CONTAINS },
    phone: { value: null, matchMode: FilterMatchMode.CONTAINS },
    position: { value: null, matchMode: FilterMatchMode.CONTAINS },

});
const isNewAdmin = ref(false)
const userToEdit = ref()
const extend = ref(false)
const user = ref({
    name: null,
    email: null,
    phone: null,
    position: null,
    password: null,
    confirmPassword: null,
})
onMounted(() => {
    getAdmins()
})
function getAdmins() {
    loading.value = true
    axiosClient.get('/admins')
        .then(res => {
            admins.value = []
            res.data.admins.forEach(element => {
                admins.value.push(element)
            })
            loading.value = false

        })
        .catch(err => {
            toast.add({ severity: 'info', summary: 'DATA FETCH', detail: 'please reload the page', life: 3000 })
            loading.value = false
        })
}

function newAdmin() {
    isNewAdmin.value = true
}
function register() {
    isSubmitting.value = true
    if (Object.values(user.value).some(value => !value)) {
        toast.add({ severity: 'error', summary: 'FORM ERRORS', detail: 'Please make sure you fill the whole form ', life: 5000 })
        isSubmitting.value = false
        return;
    }

    if (user.value.password !== user.value.confirmPassword) {
        toast.add({ severity: 'error', summary: 'PASSWORDS DONT MATCH', detail: 'Please make sure the password and the confirm password matches', life: 6000 })
        isSubmitting.value = false
        return;
    }

    axiosClient.post('/new-admin', user.value)
        .then(res => {
            isSubmitting.value = false
            getAdmins()
            toast.add({ severity: 'success', summary: 'ADMIN ADDED SUCCESSFULLY', detail: res.data.admin + ' added', life: 5000 });
            isNewAdmin.value = 
            
            clearUser()

        })
        .catch(err => {
            isSubmitting.value = false
            console.error(err)
            toast.add({ severity: 'error', summary: 'FORM ERROR', detail: 'Please resubmit details', life: 5000 })
            isNewAdmin.value = false
        })
}
const edit = (event, data) => {
    confirm.require({
        target: event.currentTarget,
        message: 'You are about to edit admin details?',
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
            label: 'Cancel',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Proceed'
        },
        accept: () => {
            isEdit.value = true
            userToEdit.value = data
            // axiosClient.get('admin-details?staffNo=' + userToEdit.value.staffNo)
            //     .then(res => {
            //         // userToEdit.value = res.data.admin
            //     })
            //     .catch(err => {
            //         console.error(err)
            //     })
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
};
const deleteAction = (event, staffNo) => {
    confirm.require({
        severity: 'danger',
        target: event.currentTarget,
        message: 'Are you sure you want to proceed?',
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
            label: 'Cancel',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Delete',
            severity: 'danger'
        },
        accept: () => {
            axiosClient.post('/delete-admin', { admin: staffNo })
                .then(res => {
                    if (res.data.message == 'This is a super Administrator') {
                        toast.add({ severity: 'warn', summary: 'ACTION NOT COMPLETE', detail: 'You cannot remove the super Administrator', life: 5000 });
                        return;
                    }

                    if(res.data.message == 'Action not complete'){
                        toast.add({ severity: 'warn', summary: 'ACTION NOT COMPLETE', detail: 'You cannot perform such an update', life: 5000 });
                        return;
                    }
                    toast.add({ severity: 'success', summary: 'ACTION SUCESSFULL', detail: 'Administrator succeessfully deleted', life: 5000 });
                    getAdmins()
                })
                .catch(err => {
                    console.error(err)
                    toast.add({ severity: 'warn', summary: 'Action not complete', detail: 'please resubmit. Thank you', life: 5000 });
                })
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
};

function editAdmin() {
    
    if (!updatePassword.value) {
        userToEdit.value.password = 'same'
        userToEdit.value.confirmPassword = 'same'
    }
    
    isSubmitting.value = true
    axiosClient.post('/edit-admin', userToEdit.value)
        .then(res => {
            if(res.data.message == 'You are not Authorized to perform such updates'){
                toast.add({severity:'warn',summary:'Action not complete',detail:'You are not Authorized to perform such updates',life:5000})
                isSubmitting.value = false
                return;
            }
            toast.add({ severity: 'success', summary: 'ADMIN UPDATED SUCCESSFULLY', detail: res.data.admin + ' added', life: 5000 });
            getAdmins()
            isEdit.value = false
            isSubmitting.value = false
        })
        .catch(err => {
            isSubmitting.value = false
            console.error(err)
            toast.add({ severity: 'warn', summary: 'Action not complete', detail: 'please resubmit. Thank you', life: 5000 });
        })
}

function closeEdit() {
    clearUser()
    isEdit.value = false
}

function clearUser() {
    userToEdit.value = null
    user.value = null
}

</script>

<template>
    <ConfirmPopup></ConfirmPopup>
    <Toast></Toast>
    <p class="text-start px-5 cursor-pointer pt-10" @click="router.push('/')"> <i class="pi pi-angle-left mx-4">Home</i>
    </p>
    <heading heading="ADMINISTRATORS"></heading>
    <div class="sm:w-3/4 mx-auto sm:p-0 px-5">
        <DataTable v-model:filters="filters" :value="admins" paginator :rows="20" sortMode="multiple" removableSort
            size="small" stripedRows :loading="loading" tableStyle="min-width: 50rem"
            :globalFilterFields="['staffNo', 'name', 'email', 'position', 'phone',]">
            <template #header>
                <div class="flex justify-between">
                    
                    <Button severity="info" @click="newAdmin"><i class="pi pi-plus"></i> <span class="md:block hidden">Add New</span> </Button>
                    <IconField @click="extend = true">
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                        <InputText :class="[extend ? 'w-[200px]': '']"  class="w-[30px] md:w-[200px]" v-model="filters['global'].value" placeholder="Keyword Search" />
                        
                    </IconField>
                </div>
            </template>
            <template #empty> No administrator found. </template>
            <template #loading> Loading administrators data. Please wait. </template>
            <Column field="staffNo" sortable>
                <template #header>
                    <p class="text-nowrap font-semibold text-slate-800">Staff ID</p>
                </template>
            </Column>
            <Column field="name">
                <template #header>
                    <p class="text-nowrap font-semibold text-slate-800">Name</p>
                </template>
            </Column>
            <Column field="phone" sortable header="Phone"></Column>
            <Column field="email" header="Email"></Column>
            <!-- <Column field="company" sortable header="Company"></Column> -->
            <Column field="position" header="Position"></Column>

            <Column header="Action">
                <template #body="slotProps">
                    <div class="flex">
                        <Button severity="info" class="mx-1" @click="edit($event, slotProps.data)"><i
                                class="pi pi-pencil"></i>
                        </Button>
                        <Button severity="danger" class="mx-1" @click="deleteAction($event, slotProps.data.staffNo)"><i
                                class="pi pi-trash"></i>
                        </Button>
                    </div>
                </template>
            </Column>
        </DataTable>
    </div>

    <Dialog :visible="isNewAdmin" :closable="false" modal class="sm:w-1/2">
        <!-- <template #closebutton> -->
        <div class="flex   w-full justify-end ">
            <p @click="isNewAdmin = false, clearUser()"> <i
                    class="pi pi-times text-xl bg-slate-200 rounded-full p-2"></i>
            </p>
        </div>
        <!-- </template> -->
        <div class="md:w-3/4 mx-auto">
            <p class="text-center cinzel text-2xl my-5" style="font-weight: bold;">NEW ADMINISTRATORS</p>
            <form class="w-3/4 mx-auto" @submit.prevent="register">
                <div class="grid grid-cols-1 gap-5">
                    <FloatLabel variant="on">
                        <InputText id="name" required class="md:w-3/4 w-full mx-auto" v-model="user.name" type="text" />
                        <label for="name">Fullname</label>
                    </FloatLabel>
                    <FloatLabel variant="on">
                        <InputText id="email" required class="md:w-3/4 w-full" v-model="user.email" type="email" />
                        <label for="email">Email</label>
                    </FloatLabel>
                    <FloatLabel variant="on">
                        <InputText id="phone" required class="md:w-3/4 w-full" v-model="user.phone" type="text" />
                        <label for="phone">Phone</label>
                    </FloatLabel>
                    <FloatLabel variant="on">
                        <InputText id="position" required class="md:w-3/4 w-full" v-model="user.position" type="text" />
                        <label for="position">Position</label>
                    </FloatLabel>
                    <FloatLabel variant="on">
                        <InputText id="position" required class="md:w-3/4 w-full" v-model="user.password" type="text" />
                        <label for="position">Password</label>
                    </FloatLabel>
                    <FloatLabel variant="on">
                        <InputText id="position" required class="sm:w-3/4 w-full" v-model="user.confirmPassword"
                            type="text" />
                        <label for="position">Confirm Password</label>
                    </FloatLabel>
                </div>
                <div class="flex justify-center">
                    <Button v-if="!isSubmitting" type="submit" class="label_holder my-10 w-3/4" severity="info">S U B M
                        I
                        T</Button>
                    <loading-button v-else></loading-button>
                </div>
            </form>
        </div>
    </Dialog>

    <Dialog :visible="isEdit" :closable="false" modal class="sm:w-1/2 ">
        <!-- <template #closebutton> -->
      
        <div class="flex   w-full justify-end ">
            <p @click="closeEdit"> <i class="pi pi-times text-xl bg-slate-200 rounded-full p-2"></i> </p>
        </div>
        <!-- </template> -->
        <div class="sm:w-3/4 mx-auto">
            <p class="text-center cinzel text-2xl my-5" style="font-weight: bold;">EDIT ADMINISTRATOR</p>
            <form class="w-3/4 mx-auto " @submit.prevent="editAdmin">
                <div class="grid grid-cols-1 gap-5">
                    <FloatLabel variant="on">
                        <InputText id="name" required class="md:w-3/4 w-full mx-auto" v-model="userToEdit.name"
                            type="text" />
                        <label for="name">Fullname</label>
                    </FloatLabel>
                    <FloatLabel variant="on">
                        <InputText id="email" required class="md:w-3/4 w-full" v-model="userToEdit.email"
                            type="email" />
                        <label for="email">Email</label>
                    </FloatLabel>
                    <FloatLabel variant="on">
                        <InputText id="phone" required class="md:w-3/4 w-full" v-model="userToEdit.phone" type="text" />
                        <label for="phone">Phone</label>
                    </FloatLabel>
                    <FloatLabel variant="on">
                        <InputText id="position" required class="md:w-3/4 w-full" v-model="userToEdit.position"
                            type="text" />
                        <label for="position">Position</label>
                    </FloatLabel>
                    <div class="md:flex justify-between text-sm  mx-auto">
                        <p>Want to update password? </p>
                        <div class="flex px-2 justify-center">
                            <Button size="small"  @click="updatePassword = true" class="mx-2 h-fit" severity="success"> <i
                                    class="pi pi-check"></i></Button>
                            <Button size="small" @click="updatePassword = false" class="mx-2 h-fit" severity="danger"> <i
                                    class="pi pi-times"></i></Button>
                        </div>
                    </div>
                    <div v-if="updatePassword" class="grid grid-cols-1 gap-5">
                        <FloatLabel variant="on">
                            <InputText id="position" required class="md:w-3/4 w-full" v-model="userToEdit.password"
                                type="text" />
                            <label for="position">Password</label>
                        </FloatLabel>
                        <FloatLabel variant="on">
                            <InputText id="position" required class="md:w-3/4 w-full"
                                v-model="userToEdit.confirmPassword" type="text" />
                            <label for="position">Confirm Password</label>
                        </FloatLabel>
                    </div>

                </div>
                <div class="flex justify-center">
                    <Button v-if="!isSubmitting" type="submit" class="label_holder my-10 w-3/4" severity="info">S U B M
                        I
                        T</Button>
                    <loading-button v-else></loading-button>
                </div>
            </form>
        </div>
    </Dialog>
</template>