<script setup>
import Heading from '@/components/Heading.vue';
import AdminStatCard from '@/components/AdminStatCard.vue';
import router from '@/router';
import { FilterMatchMode } from '@primevue/core/api';
import { Tabs, Tab, TabList, OverlayBadge, TabPanel, TabPanels, DataTable, Column,IconField,InputIcon,InputText } from 'primevue'
import { onMounted, ref } from 'vue';
import axiosClient from '@/axios/axios';
const loading = ref(false)
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    membershipID: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    course: { value: null, matchMode: FilterMatchMode.CONTAINS },
    category: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: { value: null, matchMode: FilterMatchMode.CONTAINS },
    date: { value: null, matchMode: FilterMatchMode.CONTAINS },
    // university: { value: null, matchMode: FilterMatchMode.CONTAINS },
    // year: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const history = ref([])
const requests = ref([])
onMounted(() => {
    loading.value = true
    axiosClient.get('/employer/dashboard')
        .then(res => {
            res.data.history.forEach(element => {
                history.value.push(element)
            });
            res.data.requests.forEach(element => {
                requests.value.push(element)
            })
            loading.value = false
        })
        .catch(err => {
            loading.value = false
        })
})
</script>
<template>
    <div>
        <heading heading="Dashboard"></heading>
        <div class="grid sm:grid-cols-2 gap-2 min:h-[15vh] mb-5 ">
            <admin-stat-card title="PROFESSIONS" @click="router.push('/dashboard/professions')" :stat="applicants_count"
                icon="pi pi-users"></admin-stat-card>
            <admin-stat-card title="PROFILE" :stat="employers_count" icon="pi pi-user"></admin-stat-card>
        </div>
        <div class="w-3/4 mx-auto">
            <Tabs value="0">
                <TabList>
                    <Tab value="0">H I S T O R Y</Tab>
                    <Tab value="1">
                        <OverlayBadge :value="requests.length" v-if="requests.length > 0" size="small" severity="warn">
                            R E Q U E S T S
                        </OverlayBadge>
                        <p v-else>R E Q U E S T S</p>
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel value="0">
                        <DataTable v-model:filters="filters" :value="history" paginator :rows="20" sortMode="multiple"
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
                            <Column field="membershipID" sortable>
                                <template #header>
                                    <p class="text-nowrap font-semibold text-slate-800">Membership ID</p>
                                </template>
                            </Column>
                            <Column field="name">
                                <template #header>
                                    <p class="text-nowrap font-semibold text-slate-800">Name</p>
                                </template>
                            </Column>
                            <Column field="category" sortable header="Category"></Column>
                            <Column field="course" header="Course"></Column>
                            <Column field="status" sortable header="status"></Column>
                            <Column field="date" header="Date"></Column>

                            <!-- <Column header="Action">
                                <template #body>
                                    <Button severity="info" @click="isViewApplicant = true"><i class="pi pi-eye"></i> </Button>
                                </template>
                            </Column> -->
                        </DataTable>
                    </TabPanel>
                    <TabPanel value="1">
                        <DataTable v-model:filters="filters" :value="requests" paginator :rows="20" sortMode="multiple"
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
                            <Column field="membershipID" sortable>
                                <template #header>
                                    <p class="text-nowrap font-semibold text-slate-800">Membership ID</p>
                                </template>
                            </Column>
                            <Column field="name">
                                <template #header>
                                    <p class="text-nowrap font-semibold text-slate-800">Name</p>
                                </template>
                            </Column>
                            <Column field="category" sortable header="Category"></Column>
                            <Column field="course" header="Course"></Column>
                            <!-- <Column field="status" sortable header="status"></Column> -->
                            <Column field="date" header="Date"></Column>

                            <!-- <Column header="Action">
                                <template #body>
                                    <Button severity="info" @click="isViewApplicant = true"><i class="pi pi-eye"></i> </Button>
                                </template>
                            </Column> -->
                        </DataTable>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    </div>
</template>