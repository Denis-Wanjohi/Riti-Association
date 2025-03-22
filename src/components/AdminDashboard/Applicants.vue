<script setup>
import { IconField,DataTable,InputIcon,InputText,Column } from 'primevue';
import { FilterMatchMode } from '@primevue/core/api';
import { ref } from 'vue';
const {applicants} = defineProps({applicants:Array})
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
</script>
<template>
<DataTable v-model:filters="filters" :value="applicants"   paginator :rows="20" sortMode="multiple" removableSort  size="small" stripedRows :loading="loading"  tableStyle="min-width: 50rem"
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
    <Column field="membershipID" sortable >
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
    <Column field="course" sortable  header="Course"></Column>
    <Column field="phone" sortable  header="Phone"></Column>
    <Column field="year" sortable >
        <template #header>
            <p class="text-nowrap font-semibold text-slate-800">Graduation Year</p>
        </template>
    </Column>
    <Column header="Action">
        <template #body>
            <!-- <Button severity="info" @click="isViewApplicant = true"><i class="pi pi-eye"></i> </Button> -->
        </template>
    </Column>
</DataTable>
</template>