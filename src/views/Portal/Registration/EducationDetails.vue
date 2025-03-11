<script setup>
import Heading from '@/components/Heading.vue';
import { FloatLabel,InputText,Button } from 'primevue';
import { ref } from 'vue';
const user = ref({
    highestLevel:null,
    collage:null,
    course:null,
    grade:null,
    year:null,
    highSchool:null,
    highYear:null,
    highGrade:null,
    
})
</script>
<template>
    <div>
        <heading heading="EDUCATION DETAILS"></heading>
        <form class="w-3/4 mx-auto mb-[150px]">
            <h1 class="text-2xl font-bold font-serif mt-10 mb-5">Higher Education</h1>
            <div class="grid grid-cols-2 gap-y-10 my-10">
                <FloatLabel variant="on" >
                    <InputText id="highestLevel"  class="w-3/4" v-model="user.highestLevel" type="text" />
                    <label for="highestLevel">Highest Level of Education</label>
                </FloatLabel>
                <FloatLabel variant="on" >
                    <InputText id="collage"  class="w-3/4" v-model="user.collage" type="text" />
                    <label for="collage">Name of University/Collage</label>
                </FloatLabel>
                <FloatLabel variant="on" >
                    <InputText id="course"  class="w-3/4" v-model="user.course" type="text" />
                    <label for="course">Course</label>
                </FloatLabel>
                <FloatLabel variant="on" >
                    <InputText id="grade"  class="w-3/4" v-model="user.grade" type="text" />
                    <label for="grade">Grade Attained</label>
                </FloatLabel>
                <FloatLabel variant="on" >
                    <InputText id="year"  class="w-3/4" v-model="user.year" type="text" />
                    <label for="year">Year of Graduation</label>
                </FloatLabel>
            </div>

            <h1 class="text-2xl font-bold font-serif mt-10 mb-5">High School</h1>
            <div class="grid grid-cols-2 gap-y-10 mb-10">
                <FloatLabel variant="on" >
                    <InputText id="highSchool"  class="w-3/4" v-model="user.highSchool" type="text" />
                    <label for="highSchool">Name of School</label>
                </FloatLabel>
                <FloatLabel variant="on" >
                    <InputText id="highYear"  class="w-3/4" v-model="user.highYear" type="text" />
                    <label for="highYear">Year Completed</label>
                </FloatLabel>
                <FloatLabel variant="on" >
                    <InputText id="highGrade"  class="w-3/4" v-model="user.highGrade" type="text" />
                    <label for="highGrade">Grade</label>
                </FloatLabel>
            </div>

            <div class="flex w-full">
                <Button class="mx-auto w-1/2 font-bold" severity="info" >S U B M I T</Button>
            </div>
        </form>
    </div>
</template>