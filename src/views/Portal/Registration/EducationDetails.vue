<script setup>
import axiosClient from '@/axios/axios';
import Heading from '@/components/Heading.vue';
import { FloatLabel,InputText,Button,Toast,Select } from 'primevue';
import { onMounted, ref } from 'vue';
import LoadingButton from '@/components/loadingButton.vue';
import { useToast } from 'primevue';
import router from '@/router';
import { scrollUp } from '@/utilities/util';

const toast = useToast()
const isSubmiting = ref(false)
const user = ref({
    highestLevel:null,
    collage:null,
    course:null,
    category:null,
    grade:null,
    year:null,
    highSchool:null,
    highYear:null,
    highGrade:null,
    
})
const categories = [
    { label: 'Media & Advertising' },
    { label: 'Healthcare' },
    { label: 'IT' },
    { label: 'Sales & Marketing' },
    { label: 'Hospitality & Tourism' },
    { label: 'Transport & Logistics' },
    { label: 'Accounting & Auditing' },
    { label: 'Human Resources' },
    { label: 'Legal Services' },
    { label: 'Manufacturing & Production' },
    { label: 'Engineering & Construction' },
    { label: 'Agriculture and Agribusiness' },
    { label: 'Banking & Finance' },
    { label: 'Education & Training' },
    { label: 'Energy & Utilities' },
]
onMounted(()=>{
    scrollUp()
})

const onSubmit = ()=>{
    // alert()
    if (Object.values(user.value).some(value => !value)) {
        toast.add({severity:'error',summary:'FORM ERRORS',detail:'Please make sure you fill the whole form ',life:5000})
        return;
    }
    if(user.value.year.length > 4){
        toast.add({severity:'warn',summary:'YEAR GRADUATED',detail:'Graduation year should be an year'})
        return;
    }
    if(user.value.highYear.length > 4){
        toast.add({severity:'warn',summary:'YEAR COMPLETED',detail:'Graduation year should be an year'})
        return;
    }
    isSubmiting.value = true

  
    let data = {
        highestLevel:user.value.highestLevel,
        collage:user.value.collage,
        course:user.value.course,
        category:user.value.category.label,
        grade:user.value.grade,
        year:user.value.year,
        highSchool:user.value.highSchool,
        highYear:user.value.highYear,
        highGrade:user.value.highGrade,
    }
    axiosClient.post('/education-details',data)
    .then(res=>{
        isSubmiting.value = false
        if(res.data.message == 'updated'){
            router.push('/registration/work-experience-details')
        }
        
    })
    .catch(err=>{
        toast.add({severity:'error',summary:'SUBMITTING ERROR',detail:"Please re-submit the form",life:5000})
        isSubmiting.value = false
    })
}
</script>
<template>
    <Toast></Toast>
    <div class="sm:p-0 px-2">
        <heading   heading="EDUCATION DETAILS"></heading>
        <form class="sm:w-3/4 sm:p-0 px-5 mx-auto mb-[150px]" @submit.prevent="onSubmit">
            <h1 class="text-2xl font-bold font-serif mt-10 mb-5">Higher Education</h1>
            <div class="grid sm:grid-cols-2 gap-y-10 my-10">
                <FloatLabel variant="on" >
                    <InputText id="highestLevel" required  class="sm:w-3/4 w-full" v-model="user.highestLevel" type="text" />
                    <label for="highestLevel">Highest Level of Education</label>
                </FloatLabel>
                <FloatLabel variant="on" >
                    <InputText id="collage" required  class="sm:w-3/4 w-full" v-model="user.collage" type="text" />
                    <label for="collage">Name of University/Collage</label>
                </FloatLabel>
                <FloatLabel variant="on" >
                    <InputText id="course" required  class="sm:w-3/4 w-full" v-model="user.course" type="text" />
                    <label for="course">Course</label>
                </FloatLabel>
                <FloatLabel variant="on" >
                    <Select :options="categories" v-model="user.category" optionLabel="label" class="sm:w-3/4 w-full" />
                    <!-- <InputText id="course" required  class="sm:w-3/4 w-full" v-model="user.course" type="text" /> -->
                    <label for="course">Category</label>
                </FloatLabel>
                <FloatLabel variant="on" >
                    <InputText id="grade" required  class="sm:w-3/4 w-full" v-model="user.grade" type="text" />
                    <label for="grade">Grade Attained</label>
                </FloatLabel>
                <FloatLabel variant="on" >
                    <InputText id="year" required  class="sm:w-3/4 w-full" v-model="user.year" type='number' :invalid="user.year && user.year.length != 4" />
                    <label for="year">Year of Graduation</label>
                    <p class="text-sm text-orange-600">{{ user.year && user.year.length != 4 ? 'must be an year' :'' }}</p>
                </FloatLabel>
            </div>

            <h1 class="text-2xl font-bold font-serif mt-10 mb-5">High School</h1>
            <div class="grid sm:grid-cols-2 gap-y-10 mb-10">
                <FloatLabel variant="on" >
                    <InputText id="highSchool"  required  class="sm:w-3/4 w-full" v-model="user.highSchool" type="text" />
                    <label for="highSchool">Name of School</label>
                </FloatLabel>
                <FloatLabel variant="on" >
                    <InputText id="highYear" required  class="sm:w-3/4 w-full" v-model="user.highYear" type='number'  :invalid="user.highYear && user.highYear.length != 4"/>
                    <label for="highYear">Year Completed</label>
                    <p class="text-sm text-orange-600">{{ user.highYear && user.highYear.length != 4 ? 'must be an year' :'' }}</p>
                </FloatLabel>
                
                <FloatLabel variant="on" >
                    <InputText id="highGrade"  required class="sm:w-3/4 w-full" v-model="user.highGrade" type="text" />
                    <label for="highGrade">Grade</label>
                </FloatLabel>
            </div>

            <div class="flex w-full">
                <Button v-if="!isSubmiting" type="submit" class="mx-auto w-1/2 font-bold" severity="info" >S U B M I T</Button>
                <loading-button v-else></loading-button>
            </div>
        </form>
    </div>
</template>