<script setup>
import Heading from '@/components/Heading.vue';
import AdminStatCard from '@/components/AdminStatCard.vue';
import NewEmployers from '@/components/AdminDashboard/NewEmployers.vue';
import Applicants from '@/components/AdminDashboard/Applicants.vue';
import Requests from '@/components/AdminDashboard/Requests.vue';
import { FilterMatchMode } from '@primevue/core/api';
import { Button, Toast, Tab, TabList, Tabs, TabPanel, TabPanels, DataTable, Column, IconField, InputIcon, InputText, OverlayBadge } from 'primevue';
import { onMounted, ref } from 'vue';
import { useToast } from 'primevue';
import axiosClient from '@/axios/axios';
import router from '@/router';
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

const employers_count = ref(0)
const applicants_count = ref(0)
const admin_count = ref(0)
const applicants = ref([])
const employers = ref([])
const newEmployers = ref([])
const requests = ref([])
const loading = ref(true);
const applicantPhone = (phoneNumber) => {
    if (typeof phoneNumber !== 'string' || phoneNumber.length !== 10) {
        return "-- -- -- --";
    }

    const start = phoneNumber.substring(0, 3);
    const end = phoneNumber.substring(8);
    const masked = start + "*****" + end;
    return masked;
}
const toast = useToast()
onMounted(() => {
    dashboardData()
})
const dashboardData = () => {

    axiosClient.get('/admin/dashboard')
        .then(res => {
            applicants.value = []
            res.data.applicants.forEach(element => {
                applicants.value.push(element)
            })
            newEmployers.value = []
            res.data.new_employers.forEach(element => {
                newEmployers.value.push(element)
            })
            employers.value = []
            res.data.employers.forEach(element => {
                employers.value.push(element)
            })
            requests.value = []
            res.data.requests.forEach(element => {
                requests.value.push(element)
            })
            applicants_count.value = res.data.applicant_count
            employers_count.value = res.data.employer_count
            admin_count.value = res.data.admin_count
            loading.value = false
        })
        .catch(err => {
            toast.add({ severity: 'info', summary: 'DATA FETCH', detail: 'please reload the page', life: 3000 })
            loading.value = false
        })
}
</script>

<template>
    <Toast></Toast>
    <div>
        <heading heading="DASHBOARD"></heading>
        <div  class=" flex items-center  mx-auto w-screen h-[20vh]" v-if="loading">
            <svg  class="mx-auto w-[90px]"  xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24">
                <rect width="24" height="24" fill="none" />
                <rect width="6" height="14" x="1" y="4" fill="#0103ef">
                    <animate id="svgSpinnersBarsScaleFade0" fill="freeze" attributeName="y"
                        begin="0;svgSpinnersBarsScaleFade1.end-0.225s" dur="0.675s" values="1;5" />
                    <animate fill="freeze" attributeName="height" begin="0;svgSpinnersBarsScaleFade1.end-0.225s"
                        dur="0.675s" values="22;14" />
                    <animate fill="freeze" attributeName="opacity" begin="0;svgSpinnersBarsScaleFade1.end-0.225s"
                        dur="0.675s" values="1;0.2" />
                </rect>
                <rect width="6" height="14" x="9" y="4" fill="#0103ef" opacity="0.4">
                    <animate fill="freeze" attributeName="y" begin="svgSpinnersBarsScaleFade0.begin+0.135s" dur="0.675s"
                        values="1;5" />
                    <animate fill="freeze" attributeName="height" begin="svgSpinnersBarsScaleFade0.begin+0.135s"
                        dur="0.675s" values="22;14" />
                    <animate fill="freeze" attributeName="opacity" begin="svgSpinnersBarsScaleFade0.begin+0.135s"
                        dur="0.675s" values="1;0.2" />
                </rect>
                <rect width="6" height="14" x="17" y="4" fill="#0103ef" opacity="0.3">
                    <animate id="svgSpinnersBarsScaleFade1" fill="freeze" attributeName="y"
                        begin="svgSpinnersBarsScaleFade0.begin+0.27s" dur="0.675s" values="1;5" />
                    <animate fill="freeze" attributeName="height" begin="svgSpinnersBarsScaleFade0.begin+0.27s"
                        dur="0.675s" values="22;14" />
                    <animate fill="freeze" attributeName="opacity" begin="svgSpinnersBarsScaleFade0.begin+0.27s"
                        dur="0.675s" values="1;0.2" />
                </rect>
            </svg>
        </div>
        <div class="grid sm:grid-cols-3 gap-1 min:h-[15vh] mb-5" v-if="!loading">
            <admin-stat-card title="applicants" :stat="applicants_count" @click="router.push('/dashboard/professions')"
                icon="pi pi-id-card"></admin-stat-card>
            <admin-stat-card title="employers" :stat="employers_count" @click="router.push('/dashboard/employers')"
                icon="pi pi-user"></admin-stat-card>
                <admin-stat-card title="admins" :stat="admin_count" @click="router.push('/dashboard/admins')"
                icon="pi pi-crown"></admin-stat-card>
        </div>
        <div class="sm:w-3/4  mx-auto" v-if="!loading">
            <Tabs value="0" scrollable="true">
                <TabList>
                    <Tab value="0">A P P L I C A N T S</Tab>
                    <Tab value="1">E M P L O Y E R S</Tab>
                    <Tab value="2">
                        <OverlayBadge :value="requests.length" v-if="requests.length > 0" size="small" severity="warn">
                            R E Q U E S T S
                        </OverlayBadge>
                        <p v-else>R E Q U E S T S</p>
                    </Tab>
                    <Tab value="3">
                        <OverlayBadge v-if="newEmployers.length > 0" :value="newEmployers.length" size="small"
                            severity="info">
                            NEW EMPLOYERS
                        </OverlayBadge>
                        <p v-else>NEW EMPLOYERS</p>
                    </Tab>
                    <Tab value="3"></Tab>
                </TabList>
                <TabPanels>
                    <TabPanel value="0">
                        <applicants :applicants="applicants"></applicants>
                    </TabPanel>
                    <TabPanel value="1">
                        <DataTable v-model:filters="filters" :value="employers" paginator :rows="20" sortMode="multiple"
                            removableSort size="small" stripedRows :loading="loading" tableStyle="min-width: 50rem"
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
                    </TabPanel>
                    <TabPanel value="2">
                        <requests :requests="requests" @refresh="dashboardData"></requests>
                    </TabPanel>
                    <TabPanel value="3">
                        <new-employers :newEmployers="newEmployers" @refresh="dashboardData"></new-employers>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    </div>
</template>