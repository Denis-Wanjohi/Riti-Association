<script setup>
import Heading from '@/components/Heading.vue';
import AdminStatCard from '@/components/AdminStatCard.vue';
import NewEmployers from '@/components/AdminDashboard/NewEmployers.vue';
import Applicants from '@/components/AdminDashboard/Applicants.vue';
import { FilterMatchMode } from '@primevue/core/api';
import { Button,Toast,Tab,TabList,Tabs,TabPanel,TabPanels,DataTable,Column,IconField,InputIcon,InputText,OverlayBadge } from 'primevue';
import { onMounted, ref } from 'vue';
import { useToast } from 'primevue';
import axiosClient from '@/axios/axios';
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
const applicants = ref([])
const employers = ref([])
const newEmployers = ref([])
const requests = ref([])
const applicantPhone = (phoneNumber)=>{
    if (typeof phoneNumber !== 'string' || phoneNumber.length !== 10) {
    return "-- -- -- --"; 
  }

  const start = phoneNumber.substring(0, 3); 
  const end = phoneNumber.substring(8); 
  const masked = start + "*****" + end; 
  return masked;
}
const toast = useToast()
onMounted(()=>{
    axiosClient.get('/admin/dashboard')
    .then(res=>{
        res.data.applicants.forEach(element=>{
            applicants.value.push(element)
        })
        res.data.new_employers.forEach(element=>{
            newEmployers.value.push(element)
        })
        res.data.employers.forEach(element=>{
            employers.value.push(element)
        })
        res.data.requests.forEach(element=>{
            requests.value.push(element)
        })
        applicants_count.value = res.data.applicant_count
        employers_count.value = res.data.employer_count
    })
    .catch(err=>{
        toast.add({severity:'info',summary:'DATA FETCH',detail:'please reload the page',life:3000})
    })
})
</script>

<template>
    <Toast></Toast>
    <div>
        <heading heading="DASHBOARD"></heading>
        <div class="grid grid-cols-2 min:h-[15vh] mb-5 ">
            <admin-stat-card title="applicants" :stat="applicants_count" icon="pi pi-id-card"></admin-stat-card>
            <admin-stat-card title="employers" :stat="employers_count" icon="pi pi-user"></admin-stat-card>
        </div>
        <div class="w-3/4 mx-auto">
            <Tabs value="0">
                <TabList>
                    <Tab value="0">A P  P L  I  C  A N T  S</Tab>
                    <Tab value="1">E M P L O Y E R S</Tab>
                    <Tab value="2">
                        <OverlayBadge value="20" size="small" severity="warn">
                            R E Q U E S T S
                        </OverlayBadge>
                    </Tab>
                    <Tab value="3">
                        <OverlayBadge v-if="newEmployers.length > 0" :value="newEmployers.length" size="small" severity="info">
                            NEW EMPLOYERS
                        </OverlayBadge>
                        <p v-else>NEW EMPLOYERS</p>
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel value="0">
                        <applicants :applicants="applicants"></applicants>
                    </TabPanel>
                    <TabPanel value="1">
                        <DataTable v-model:filters="filters" :value="employers"   paginator :rows="20" sortMode="multiple" removableSort  size="small" stripedRows :loading="loading"  tableStyle="min-width: 50rem"
                                :globalFilterFields="['membershipID', 'fname', 'profession', 'gender','course','university','grade','year']"
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
                            <Column field="employerID" sortable >
                                <template #header>
                                    <p class="text-nowrap font-semibold text-slate-800">Employer ID</p>
                                </template>
                            </Column>
                            <Column field="name">
                                <template #header>
                                    <p class="text-nowrap font-semibold text-slate-800">Name</p>
                                </template>
                            </Column>
                            <Column field="phone" sortable  header="Phone"></Column>
                            <Column field="email" header="Email"></Column>
                            <Column field="company" sortable  header="Company"></Column>
                            <Column field="position" header="Position"></Column>
                            
                            <!-- <Column header="Action">
                                <template #body>
                                    <Button severity="info" @click="isViewApplicant = true"><i class="pi pi-eye"></i> </Button>
                                </template>
                            </Column> -->
                        </DataTable>
                    </TabPanel>
                    <TabPanel value="2">
                        <DataTable v-model:filters="filters" :value="requests"   paginator :rows="20" sortMode="multiple" removableSort  size="small" stripedRows :loading="loading"  tableStyle="min-width: 50rem"
                                :globalFilterFields="['membershipID', 'fname', 'profession', 'gender','course','university','grade','year']"
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
                            <Column field="employerID" sortable >
                                <template #header>
                                    <p class="text-nowrap font-semibold text-slate-800">Employer ID</p>
                                </template>
                            </Column>
                            <Column field="employerName">
                                <template #header>
                                    <p class="text-nowrap font-semibold text-slate-800">Employer</p>
                                </template>
                            </Column>
                            <Column field="company" sortable  header="Company"></Column>
                            <Column field="membershipID" header="Applicant ID"></Column>
                            <Column field="applicantName" sortable  header="Aplicant"></Column>
                            <Column field="category" header="Category"></Column>
                            
                            <Column header="Action">
                                <template #body>
                                    <!-- <Button severity="info" @click="isViewApplicant = true"><i class="pi pi-eye"></i> </Button> -->
                                </template>
                            </Column>
                        </DataTable>
                    </TabPanel>
                    <TabPanel value="3">
                        <new-employers :newEmployers="newEmployers"></new-employers>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    </div>
</template>