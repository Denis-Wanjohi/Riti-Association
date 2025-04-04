<script setup>
import { DataTable,Column,Button,InputIcon,IconField,InputText,Dialog,Toast, useToast,FloatLabel } from 'primevue';
import { FilterMatchMode } from '@primevue/core/api';
import { ref, watch } from 'vue';
import LoadingButton from '../loadingButton.vue';

import axiosClient from '@/axios/axios';
const {newEmployers} = defineProps({newEmployers:Array})
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    position: { value: null, matchMode: FilterMatchMode.CONTAINS },
    phone: { value: null, matchMode: FilterMatchMode.CONTAINS },
    email: { value: null, matchMode: FilterMatchMode.CONTAINS },
    company: { value: null, matchMode: FilterMatchMode.CONTAINS },
    companyEmail: { value: null, matchMode: FilterMatchMode.CONTAINS },

});
const toast = useToast()
const viewMore = ref(false)
const employer = ref(null)
const emit = defineEmits(['refresh']);
const isAuthorizing = ref(false)
const loading = ref(true)
watch(viewMore,()=>{
    if(viewMore.value == false){
        employer.value = null
    }
})
watch(()=>newEmployers,()=>{
    if(newEmployers.length != 0){
        loading.value = false
    }
    
},{deep:true})
const authorize = ()=>{
    isAuthorizing.value = true
    axiosClient.post('/validate-employer',{id:employer.value.id})
    .then(res=>{
        if(res.data.message == 'validated'){
            toast.add({severity:'success',summary:'Employer Authorized',detail:'Employer successfully authorized',life:4000})
            emit('refresh')
        }
        isAuthorizing.value = false
        viewMore.value = false
        employer.value = null
    })
    .catch(err=>{
        isAuthorizing.value = false
        toast.add({severity:'warn',summary:'Authorization Error !!!',detail:'Please repeat the authoriztion process. Thank you.',life:5000})
        console.error(err)
    })
}


</script>
<template>
    <Toast></Toast>
    <DataTable v-model:filters="filters" :value="newEmployers"   paginator :rows="20" sortMode="multiple" removableSort  size="small" stripedRows :loading="loading"  tableStyle="min-width: 50rem"
            :globalFilterFields="['name', 'position', 'phone', 'email','company','companyEmail',]"
    >
        <template #header>
            <div class="flex justify-end">
                <IconField>
                    <InputIcon>
                        <i class="pi pi-search" />
                    </InputIcon>
                    <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                </IconField>
            </div>
        </template>
        <template #empty> No applicant found. </template>
        <template #loading> Loading applicants data. Please wait. </template>
        
        <Column field="name">
            <template #header>
                <p class="text-nowrap font-semibold text-slate-800">Name</p>
            </template>
        </Column>
        <Column field="position" sortable  header="Position"></Column>
        <Column field="phone" sortable  header="Phone"></Column>
        <Column field="email" sortable  header="Email"></Column>
        <Column field="company" sortable  header="Company"></Column>
        <Column field="companyEmail" sortable  header="Company Email"></Column>
        <Column header="Action">
            <template #body="slotProps">
                
                <Button severity="info" @click="viewMore = true,employer = slotProps.data" ><i class="pi pi-eye"></i> </Button>
            </template>
        </Column>
    </DataTable>
    <Dialog modal :visible="viewMore" :closable="false" class="sm:w-1/2">
        <template #header>
            <div class="flex w-full">
                <div class="cinzel w-11/12 text-center text-xl" style="font-weight: bold;">NEW EMPLOYER DETAILS</div>
                <p @click="viewMore = false"> <i class="pi pi-times  p-1 rounded-full hover:cursor-pointer bg-slate-300"></i></p>
            </div>
        </template>
        <div class="grid grid-cols-2 gap-4 w-3/4 mx-auto">
            <p class="label_holder">FullName:</p>
            <p>{{employer.name}}</p>
            <p class="label_holder">Phone No.</p>
            <p>{{employer.phone}}</p>
            <p class="label_holder">Email</p>
            <p>{{employer.email}}</p>
            <p class="label_holder">Company</p>
            <p>{{employer.company}}</p>
            <p class="label_holder">Position</p>
            <p>{{employer.position}}</p>
            <p class="label_holder">Company Email</p>
            <p>{{employer.companyEmail}}</p>
        </div>
        <div class="flex justify-center">
            <Button v-if="!isAuthorizing"  @click="authorize" class="label_holder my-10 w-3/4" severity="info">A U T H O R I  Z E</Button>
            <loading-button v-else></loading-button>
        </div>
    </Dialog>
</template>
<style scoped>
.label_holder{
    font-weight: bold;

}
</style>