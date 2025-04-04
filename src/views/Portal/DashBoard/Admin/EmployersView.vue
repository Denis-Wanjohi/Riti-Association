<script setup>
import { onMounted, ref } from 'vue';
import { DataTable,Toast,Column,IconField,InputIcon,InputText,Button,useToast } from 'primevue';
import axiosClient from '@/axios/axios';
import { FilterMatchMode } from '@primevue/core/api';
import Heading from '@/components/Heading.vue';
import router from '@/router';
const employers = ref([])
const toast = useToast()
const loading = ref(true)
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    membershipID: { value: null, matchMode: FilterMatchMode.CONTAINS },
    fname: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    course: { value: null, matchMode: FilterMatchMode.CONTAINS },
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    profession: { value: null, matchMode: FilterMatchMode.CONTAINS },
    gender: { value: null, matchMode: FilterMatchMode.CONTAINS },
    university: { value: null, matchMode: FilterMatchMode.CONTAINS },
    year: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
onMounted(()=>{
    getEmployers()
})
function getEmployers(){
    loading.value = true
    axiosClient.get('/employers')
        .then(res => {
            employers.value = []
            res.data.employers.forEach(element => {
                employers.value.push(element)
            })
            loading.value = false

        })
        .catch(err => {
            toast.add({ severity: 'info', summary: 'DATA FETCH', detail: 'please reload the page', life: 3000 })
            loading.value = false
        })
}

</script>

<template>
    <p class="text-start px-5 cursor-pointer pt-10" @click="router.push('/')"> <i class="pi pi-angle-left mx-4">Home</i></p>

    <heading heading="EMPLOYERS"></heading>
    <div class="sm:w-3/4 mx-auto sm:p-0 px-5">
        <DataTable v-model:filters="filters" :value="employers" paginator :rows="20" sortMode="multiple" removableSort
            size="small" stripedRows :loading="loading" tableStyle="min-width: 50rem"
            :globalFilterFields="['membershipID', 'fname', 'profession', 'gender', 'course', 'university', 'grade', 'year']">
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
            <template #empty> No emloyer found. </template>
            <template #loading> Loading employer data. Please wait. </template>
            <Column field="employerID" sortable>
                <template #header>
                    <p class="text-nowrap font-semibold text-slate-800">Employer ID</p>
                </template>
            </Column>
            <Column field="name">
                <template #header>
                    <p class="text-nowrap font-semibold text-slate-800">Name</p>
                </template>
            </Column>
            <Column field="phone" sortable header="Phone"></Column>
            <Column field="email" header="Email"></Column>
            <Column field="company" sortable header="Company"></Column>
            <Column field="position" header="Position"></Column>

            <!-- <Column header="Action">
                                <template #body>
                                    <Button severity="info" @click="isViewApplicant = true"><i class="pi pi-eye"></i> </Button>
                                </template>
                            </Column> -->
        </DataTable>
    </div>
</template>