<script setup>
import { IconField, DataTable, InputIcon, InputText, Column, Dialog, Button } from 'primevue';
import { FilterMatchMode } from '@primevue/core/api';
import { ref, watch } from 'vue';
import LoadingButton from '../loadingButton.vue';
import axiosClient from '@/axios/axios'
import { dmy } from '@/utilities/util';
const { applicants } = defineProps({ applicants: Array })
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
const isViewApplicant = ref(false)
const applicant = ref(null)
const applicantID = ref(null)
watch(isViewApplicant, () => {
    if (isViewApplicant.value == true) {
        getApplicant()
    } else {
        applicant.value = null
        applicantID.value = null
    }

})
const getApplicant = () => {
    axiosClient.get('/applicant?id=' + applicantID.value)
        .then(res => {
            applicant.value = res.data.applicant[0]
        })
        .catch(err => {
            console.error(err)
        })
}
</script>
<template>
    <DataTable v-model:filters="filters" :value="applicants" paginator :rows="20" sortMode="multiple" removableSort
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
        <Column field="membershipID" sortable>
            <template #header>
                <p class="text-nowrap font-semibold text-slate-800">Member ID</p>
            </template>
        </Column>
        <Column field="name">
            <template #header>
                <p class="text-nowrap font-semibold text-slate-800"> Name</p>
            </template>
        </Column>
        <Column field="category" header="Category"></Column>
        <Column field="course" sortable header="Course"></Column>
        <Column field="phone" sortable header="Phone"></Column>
        <Column field="year" sortable>
            <template #header>
                <p class="text-nowrap font-semibold text-slate-800">Graduation Year</p>
            </template>
        </Column>
        <Column header="Action">
            <template #body="slotProps">
                <Button severity="info" @click="isViewApplicant = true, applicantID = slotProps.data.membershipID"><i
                        class="pi pi-eye"></i> </Button>
            </template>
        </Column>
    </DataTable>
    <Dialog :visible=isViewApplicant modal header=" " :closable="false" class="w-fit">
        <template #header>
            <div class="flex justify-end w-full mr-5"><i @click="isViewApplicant = false"
                    class="pi pi-times rounded-full bg-slate-200 cursor-pointer p-2"></i></div>
        </template>
        <div class="pb-10">
            <div class="w-[200px]" v-if="applicant == null">
                <loading-button></loading-button>
            </div>
            <div v-else class="grid  grid-cols-1 gap-3 h-screen sm:p-10 cinzel_dashboard_h3">
                <p class="text-center cinzel_dashboard text-3xl pb-5">APPLICANT INFORMATION</p>
                <category-card h4="BASIC INFORMATION">

                    <div class="">
                        <img :src="applicant.personal_details.image"
                            class="w-[140px] mx-auto h-[140px] rounded-full  p-5" alt="">
                        <div class="p-5 w-fit mx-auto">
                            <p> <span class="font-bold pr-3">Name:</span> {{ applicant.fullname }}</p>
                            <!-- <p> <span class="font-bold pr-3">Email:</span>{{ applicant.email }}</p> -->
                            <p> <span class="font-bold pr-3">Phone No.:</span>{{ applicant.phone }}
                            </p>
                            <p> <span class="font-bold pr-3">D.O.B:</span>{{ dmy(applicant.dob) }}</p>
                            <p> <span class="font-bold pr-3">Membership ID:</span>{{ applicant.membershipID }}</p>
                        </div>
                    </div>
                </category-card>
                <category-card h4="PERSONAL DETAILS">

                    <div class="">
                        <div class="p-5 grid sm:grid-cols-2 gap-4">
                            <p> <span class="font-bold pr-3">Nationality:</span> {{
                                applicant.personal_details.nationality
                                }}</p>
                            <p> <span class="font-bold pr-3">Marital Status:</span>{{
                                applicant.personal_details.status }}
                            </p>
                            <p> <span class="font-bold pr-3">Dual Citizen:</span>{{
                                applicant.personal_details.citizen }}
                            </p>
                            <p> <span class="font-bold pr-3">Interview Mode:</span>{{
                                applicant.personal_details.interview
                                }}</p>
                        </div>
                        <p class="text-center  cinzel_dashboard_h3 underline">Residential Address</p>
                        <div class="p-5 grid sm:grid-cols-2 gap-4">
                            <p> <span class="font-bold pr-3">County:</span> {{ applicant.personal_details.county }}
                            </p>
                            <p> <span class="font-bold pr-3">Sub-county:</span>{{
                                applicant.personal_details.subCounty }}
                            </p>
                            <p> <span class="font-bold pr-3">Consistency:</span>{{
                                applicant.personal_details.constituency
                                }}</p>
                            <p> <span class="font-bold pr-3">Ward:</span>{{ applicant.personal_details.ward }}</p>
                        </div>
                        <p class="text-center cinzel_dashboard_h3 underline">Next of Kin</p>
                        <div class="p-5 grid sm:grid-cols-2 gap-4">
                            <p> <span class="font-bold pr-3">Name:</span> {{ applicant.personal_details.kinName }}
                            </p>
                            <p> <span class="font-bold pr-3">Email:</span>{{ applicant.personal_details.kinEmail }}
                            </p>
                            <p> <span class="font-bold pr-3">Phone No.:</span>{{ applicant.personal_details.kinPhone
                                }}</p>
                            <p> <span class="font-bold pr-3">Relationship:</span>{{
                                applicant.personal_details.kinRelationship }}</p>
                        </div>
                    </div>
                </category-card>
                <category-card h4="EDUCATION ">
                    <div class="">
                        <p class="text-center cinzel_dashboard_h3 mt-5 underline">HIGHER EDUCATION</p>
                        <div class="p-5 grid sm:grid-cols-2 gap-4">
                            <p> <span class="font-bold pr-3">Highest level:</span> {{
                                applicant.education_details.highestLevel }}</p>
                            <p> <span class="font-bold pr-3">University/Collage:</span>{{
                                applicant.education_details.collage }}</p>
                            <p> <span class="font-bold pr-3">Course:</span>{{ applicant.education_details.course }}
                            </p>
                            <p> <span class="font-bold pr-3">Grade:</span>{{ applicant.education_details.grade }}
                            </p>
                            <p> <span class="font-bold pr-3">Graduation Year:</span>{{
                                applicant.education_details.year }}
                            </p>
                        </div>
                        <p class="text-center cinzel_dashboard_h3 mt-5 underline">HIGH SCHOOL</p>
                        <div class="p-5 grid sm:grid-cols-2 gap-4">
                            <p> <span class="font-bold pr-3">Name:</span> {{ applicant.education_details.highSchool
                                }}</p>
                            <p> <span class="font-bold pr-3">Year Completed:</span>{{
                                applicant.education_details.highYear
                                }}</p>
                            <p> <span class="font-bold pr-3">Grade:</span>{{ applicant.education_details.highGrade
                                }}</p>
                        </div>
                    </div>
                </category-card>
                <category-card h4="WORK experience ">
                    <div class="">

                        <p class="text-center my-5"> <span class="font-bold pr-3">Years of Experience:</span> {{
                            applicant.work_details.yearsOfExperience }} years</p>
                        <p class="text-center cinzel_dashboard_h3 mt-5 underline">Institutions/Companies</p>
                        <div class="p-5 grid sm:grid-cols-2 gap-4">
                            <p> <span class="font-bold pr-3">Name:</span> {{ applicant.work_details.company }}</p>
                            <p> <span class="font-bold pr-3">Job Title:</span>{{ applicant.work_details.jobTitle }}
                            </p>
                            <p> <span class="font-bold pr-3">From:</span>{{dmy(applicant.work_details.start)}}</p>
                            <p> <span class="font-bold pr-3">From:</span>{{dmy(applicant.work_details.end)}}</p>
                            <p> <span class="font-bold pr-3">Name:</span> {{ applicant.work_details.company2 }}</p>
                            <p> <span class="font-bold pr-3">Job Title:</span>{{ applicant.work_details.jobTitle2 }}
                            </p>
                            <p> <span class="font-bold pr-3">From:</span>{{dmy(applicant.work_details.start2)}}</p>
                            <p> <span class="font-bold pr-3">From:</span>{{dmy(applicant.work_details.end2)}}</p>
                        </div>

                        <p class="text-center cinzel_dashboard_h3 mt-5 underline">Referees</p>
                        <div class="p-5 grid sm:grid-cols-2 gap-4">
                            <p> <span class="font-bold pr-3">First Name:</span> {{ applicant.work_details.fname }}
                            </p>
                            <p> <span class="font-bold pr-3">Last Name:</span>{{ applicant.work_details.lname }}</p>
                            <p> <span class="font-bold pr-3">Institution:</span>{{
                                applicant.work_details.institution }}</p>
                            <p> <span class="font-bold pr-3">Contacts:</span>{{
                                applicant.work_details.refereeContact }}</p>
                        </div>
                    </div>
                </category-card>
            </div>
        </div>
        <!-- <template #footer>
            <div class="w-full py-8 flex justify-center" v-if="applicant">
                <Button v-if="!isSubmitting" class="w-3/4 font-bold" @click="getApplicantDetails" severity="info">Get
                    contact details</Button>
                <loading-button v-else></loading-button>
            </div>
        </template> -->
    </Dialog>
</template>