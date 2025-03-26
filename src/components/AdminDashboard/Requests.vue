<script setup>
import { ref, watch } from 'vue'
import { DataTable, Column, Dialog, IconField, InputIcon, InputText, Button, useToast, Toast } from 'primevue'
import LoadingButton from '../loadingButton.vue';
import dash_card from '../dash_card.vue';
import { FilterMatchMode } from '@primevue/core/api';
import axiosClient from '@/axios/axios';

const toast = useToast()
const { requests } = defineProps({ requests: Array })
const emit = defineEmits(['refresh']);
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
const isViewRequest = ref(false)
const isGettingRequest = ref(false)
const isConnecting = ref(false)
const employer = ref({
    employerID: null,
    name: null,
    phone: null,
    email: null,
    company: null,
    position: null,
    companyEmail: null,
})
const applicant = ref({
    name: null,
    email: null,
    phone: null,
    membershipID: null,
    county: null,
    experience: null,
    category: null,
    course: null,
})
watch(isViewRequest, () => {
    if (isViewRequest.value == false) {
        applicant.value = null
        employer.value = null
    }
})
function connect() {
    isConnecting.value = true
    axiosClient.post('/connect', { applicant: applicant.value.membershipID, employer: employer.value.employerID })
        .then(res => {
            isConnecting.value = false

            if (res.data.message == 'updated') {
                toast.add({ severity: 'success', summary: 'SUCCESSFULLY UPDATED', detail: 'Email has been successfully sent with applicant data', life: 8000 })
                emit('refresh')
                isViewRequest.value = false
            }
        })
        .catch(err => {
            isConnecting.value = false
            console.error(err)
            toast.add({ severity: 'warn', summary: 'SYSTEM ERROR', detail: 'Please  repeat the operation! Thank you.', life: 8000 })
            isViewRequest.value = false

        })
}
function decline() {
    isConnecting.value = true
    axiosClient.post('/decline', { applicant: applicant.value.membershipID, employer: employer.value.employerID })
        .then(res => {
            isConnecting.value = false
            if (res.data.message == 'updated') {
                toast.add({ severity: 'success', summary: 'SUCCESSFULLY DECLINED', detail: 'Applicant details wont be shared. Thank you.',life: 8000})
                emit('refresh')
            }
        })
        .catch(err => {
            isConnecting.value = false
            console.error(err)
            toast.add({ severity: 'warn', summary: 'SYSTEM ERROR', detail: 'Please  repeat the operation! Thank you.' })

        })

}
function getRequestData(value) {
    isGettingRequest.value = true
    axiosClient.get('/request-data?applicant=' + value.membershipID + '&employer=' + value.employerID)
        .then(res => {
            employer.value.name = res.data.employer.name
            employer.value.email = res.data.employer.email
            employer.value.employerID = res.data.employer.employerID
            employer.value.phone = res.data.employer.phone
            employer.value.position = res.data.employer.position
            employer.value.companyEmail = res.data.employer.companyEmail

            applicant.value.name = res.data.applicant.name
            applicant.value.email = res.data.applicant.email
            applicant.value.phone = res.data.applicant.phone
            applicant.value.membershipID = res.data.applicant.membershipID
            applicant.value.county = res.data.applicant.county
            applicant.value.experience = res.data.applicant.experience
            applicant.value.category = res.data.applicant.category
            applicant.value.course = res.data.applicant.course
            console.log(res.data)
            isGettingRequest.value = false
        })
        .catch(err => {
            console.error(err)
            isGettingRequest.value = false
        })
}



</script>

<template>
    <div>
        <DataTable v-model:filters="filters" :value="requests" paginator :rows="20" sortMode="multiple" removableSort
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
            <template #empty> No applicant found. </template>
            <template #loading> Loading applicants data. Please wait. </template>
            <Column field="employerID" sortable>
                <template #header>
                    <p class="text-nowrap font-semibold text-slate-800">Employer ID</p>
                </template>
            </Column>
            <Column field="employerName">
                <template #header>
                    <p class="text-nowrap font-semibold text-slate-800">Employer</p>
                </template>
            </Column>
            <Column field="company" sortable header="Company"></Column>
            <Column field="membershipID" header="Applicant ID"></Column>
            <Column field="applicantName" sortable header="Aplicant"></Column>
            <Column field="category" header="Category"></Column>

            <Column header="Action">
                <template #body="slotProps">
                    <Button severity="info" @click="isViewRequest = true, getRequestData(slotProps.data)"><i
                            class="pi pi-eye"></i> </Button>
                </template>
            </Column>
        </DataTable>
        <Dialog modal :visible="isViewRequest" class="sm:w-1/2" :closable="false">
            <template #header>
                <div class="flex w-full">
                    <div class="cinzel w-11/12 text-center text-xl" style="font-weight: bold;">REQUEST DETAILS</div>
                    <p @click="isViewRequest = false"> <i
                            class="pi pi-times  p-1 rounded-full hover:cursor-pointer bg-slate-300"></i></p>
                </div>
            </template>
            <div v-if="!isGettingRequest">
                <dash_card h4="EMPLOYER DETAILS">
                    <div class="grid grid-cols-2 gap-4 w-3/4 mx-auto">
                        <p class="label_holder">Employer ID:</p>
                        <p>{{ employer.employerID }}</p>
                        <p class="label_holder">FullName:</p>
                        <p>{{ employer.name }}</p>
                        <p class="label_holder">Phone No.</p>
                        <p>{{ employer.phone }}</p>
                        <p class="label_holder">Email</p>
                        <p>{{ employer.email }}</p>
                        <p class="label_holder">Company</p>
                        <p>{{ employer.company }}</p>
                        <p class="label_holder">Position</p>
                        <p>{{ employer.position }}</p>
                        <p class="label_holder">Company Email</p>
                        <p>{{ employer.companyEmail }}</p>
                    </div>
                </dash_card>

                <dash_card h4="APPLICANT DETAILS" class="mt-10">
                    <div class="grid grid-cols-2 gap-4 w-3/4 mx-auto">
                        <p class="label_holder">Membership ID:</p>
                        <p>{{ applicant.membershipID }}</p>
                        <p class="label_holder">FullName:</p>
                        <p>{{ applicant.name }}</p>
                        <p class="label_holder">Phone No.</p>
                        <p>{{ applicant.phone }}</p>
                        <p class="label_holder">Email</p>
                        <p>{{ applicant.email }}</p>
                        <p class="label_holder">County</p>
                        <p>{{ applicant.county }}</p>
                        <p class="label_holder">Experience</p>
                        <p>{{ applicant.experience }}</p>
                        <p class="label_holder">Category</p>
                        <p>{{ applicant.category }}</p>
                        <p class="label_holder">Course</p>
                        <p>{{ applicant.course }}</p>
                    </div>
                </dash_card>

                <div class="flex justify-center">
                    <div v-if="!isConnecting"
                        class="grid grid-cols-2 gap-x-3 justify-evenly sm:px-5 w-full mx-auto  font-bold">
                        <Button @click="connect" class="label_holder my-10 w-full" severity="info">C O N N E C
                            T</Button>
                        <Button @click="decline" class="label_holder my-10 w-full" severity="danger">D E C L I N
                            E</Button>
                    </div>
                    <loading-button v-else></loading-button>
                </div>
            </div>
            <loading-button v-else></loading-button>

        </Dialog>
    </div>
</template>