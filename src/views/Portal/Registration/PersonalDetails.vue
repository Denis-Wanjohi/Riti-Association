<script setup>
import Heading from '@/components/Heading.vue';
import { FloatLabel, Select, InputText, Button,FileUpload,Toast } from 'primevue';
import { useToast } from 'primevue';
import { ref, onMounted } from "vue";
import LoadingButton from '@/components/loadingButton.vue';
import axiosClient from '@/axios/axios';
import router from '@/router';
import { scrollUp } from '@/utilities/util';

const toast = useToast()
const isSubmitting = ref(false)
const src = ref(null);
const status = [
    { label: "Single" },
    { label: "Married" },
    { label: "Divorced" }
]
const interview = [
    { label: 'Remote' },
    { label: 'Physical' },
]
const citizen = [
    { label: 'Yes' },
    { label: 'No' },
]
const user = ref({
    image: null,
    status: null,
    citizen: null,
    interview: null,
    nationality: null,
    county: null,
    subCounty: null,
    constituency: null,
    ward: null,
    kinName: null,
    kinPhone: null,
    kinEmail: null,
    kinRelationship: null,

})
onMounted(()=>{
    scrollUp()
})
function onFileSelect(event) {
    const file = event.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
        src.value = e.target.result;
        user.value.image = e.target.result;
    };

    reader.readAsDataURL(file);
}

const onSubmit = ()=>{
    if (Object.values(user.value).some(value => value === null || value === "")) {
        toast.add({severity:"error",summary:"FORM DATA",detail:"Please make sure all fields in the form are not empty",life:5000})
        return;
    }
    isSubmitting.value = true;
    let data = {
        'image':user.value.image,
        'status':user.value.status.label,
        'citizen':user.value.citizen.label,
        'interview':user.value.interview.label,
        'nationality':user.value.nationality,
        'county':user.value.county,
        'subCounty':user.value.subCounty,
        'constituency':user.value.constituency,
        'ward':user.value.ward,
        'kinName':user.value.kinName,
        'kinPhone':user.value.kinPhone,
        'kinEmail':user.value.kinEmail,
        'kinRelationship':user.value.kinRelationship,
    }

    axiosClient.post('/personal-details',data)
    .then(res=>{
        isSubmitting.value = false
        if(res.data.message == 'updated'){
            router.push('/registration/education-details')
        }else{
            toast.add({severity:'info',summary:'INFO ERRO',detail:'Information not saved'})
        }
    })
    .catch(err=>{
        isSubmitting.value = false
        console.error(err)
    })
}

</script>
<template>
    <Toast></Toast>
    <div class="min:h-screen">
        <heading heading="PERSONAL DETAILS"></heading>
        
        <form @submit.prevent="onSubmit" class="w-3/4 mx-auto mb-[150px]">
            <div class="font-bold font-serif text-xl my-5">Personal Information</div>
            <div class="card flex flex-col items-center gap-6 border my-10 py-5 rounded-xl">
                <p class="text-slate-600">Below upload a passport sized image of yourself.*</p>
                <FileUpload mode="basic" @select="onFileSelect" customUpload auto severity="warn"
                    class="p-button-outlined" />
                <img v-if="src" :src="src" alt="Image" class="shadow-md rounded-xl w-full h-1/2 sm:w-64"
                    style="filter: grayscale(10%)" />
                <Button v-if="src" severity="danger" @click="src = null" class="font-bold" outlined="">Remove</Button>
            </div>
            <div class="grid grid-cols-2 gap-10">
                <FloatLabel variant="on">
                    <InputText id="country" required class="w-3/4" v-model="user.nationality" type="text" />
                    <label for="country">Nationality</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <Select :options="status" v-model="user.status" optionLabel="label" class="w-3/4" />
                    <label for="status">Marital status</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <Select :options="citizen" v-model="user.citizen" optionLabel="label" class="w-3/4" />
                    <label for="citizen">Dual Citizen</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <Select :options="interview" v-model="user.interview" optionLabel="label" class="w-3/4" />
                    <label for="interview">Mode of Interview</label>
                </FloatLabel>
            </div>

            <div class="font-bold font-serif text-xl my-5">Residential Address</div>
            <div class="grid grid-cols-2 gap-10 mb-10">
                <FloatLabel variant="on">
                    <InputText id="county"  required class="w-3/4" v-model="user.county" type="text" />
                    <label for="county">County</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <InputText id="subCounty" required class="w-3/4" v-model="user.subCounty" type="text" />
                    <label for="subCounty">Sub-County</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <InputText id="constituency" required class="w-3/4" v-model="user.constituency" type="text" />
                    <label for="constituency">Constituency</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <InputText id="ward" required class="w-3/4" v-model="user.ward" type="text" />
                    <label for="ward">Ward</label>
                </FloatLabel>
            </div>

            <div class="font-bold font-serif text-xl my-5">Next of Kin</div>
            <div class="grid grid-cols-2 gap-10 mb-10">
                <FloatLabel variant="on">
                    <InputText id="kinName" required class="w-3/4" v-model="user.kinName" type="text" />
                    <label for="kinName">Fullname</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <InputText id="kinPhone" required class="w-3/4" v-model="user.kinPhone" type="text" />
                    <label for="kinPhone">Contact Number</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <InputText id="kinEmail"required  class="w-3/4" v-model="user.kinEmail" type="email" />
                    <label for="kinEmail">Email</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <InputText id="kinRelationship" required class="w-3/4" v-model="user.kinRelationship" type="text" />
                    <label for="kinRelationship">Relationship</label>
                </FloatLabel>
            </div>

            <div class="flex w-full">
                <Button v-if="!isSubmitting" type="submit" severity="info" class="w-1/2 mx-auto font-bold">S U B M I T</Button>
                <loading-button v-else ></loading-button>
            </div>

        </form>
    </div>
</template>