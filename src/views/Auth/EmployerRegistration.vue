<script setup>
import { ref } from 'vue';
import { FloatLabel,InputText,Button,Toast } from 'primevue';
import { useToast } from 'primevue';
import LoadingButton from '@/components/loadingButton.vue';
import Heading from '@/components/Heading.vue';
import axiosClient from '@/axios/axios';
import router from '@/router';
const isSubmiting = ref(false)
const toast = useToast()
const user  = ref({
    'name' : null,
    'email' : null,
    'phone' : null,
    'company' : null,
    'position' : null,
    'companyEmail' : null,
})
const register = ()=>{
    isSubmiting.value =true
    if (Object.values(user.value).some(value => !value)) {
        toast.add({severity:'error',summary:'FORM ERRORS',detail:'Please make sure you fill the whole form ',life:5000})
        return;
    }
    axiosClient.post('/register/employer',user.value)
    .then(res=>{
        router.push('/registration/confirmation?n='+res.data.name)
        isSubmiting.value = false
    })
    .catch(err=>{
        isSubmiting.value = false
        console.log(err.response.data.message)
        if(err.response.data.message == 'The email has already been taken.'){
            toast.add({severity:'error',summary:'EMAIL ERROR',detail:'The email has already been taken!!',life:8000})
        }
    })
}
</script>

<template>
    <Toast></Toast>
    <div class="sm:w-3/4 mx-auto">
        <heading class="sm:p-0 px-3" heading="RITI ASSOCIATION OF UNEMPLOYED PROFESSIONALS" desc=" Employer Registration form"></heading>
        <form @submit.prevent="register" class=" mt-10 sm:w-1/3 sm:p-0 px-5 mx-auto">
              <div class="grid grid-cols-1 gap-y-10">
                  <FloatLabel variant="on"  >
                      <InputText id="name" required class="w-full" v-model="user.name" type="text" />
                      <label for="name">Full Names</label>
                  </FloatLabel>
                  <FloatLabel variant="on">
                      <InputText id="email" required class="w-full" v-model="user.email" type="email" />
                      <label for="email">Email</label>
                  </FloatLabel>
                  <FloatLabel variant="on">
                      <InputText id="phone"  required class="w-full" v-model="user.phone" />
                      <label for="phone">Phone Number</label>
                  </FloatLabel>
                  <FloatLabel variant="on">
                      <InputText id="idNo" required class="w-full" v-model="user.company" />
                      <label for="idNo">Company name</label>
                  </FloatLabel>
                  <FloatLabel variant="on">
                      <InputText required  v-model="user.position" optionLabel="label" class="w-full" />
                      <label for="on_label">Position</label>
                  </FloatLabel>
                  <FloatLabel variant="on">
                      <InputText class="w-full" required v-model="user.companyEmail" />
                      <label for="on_label">Company email</label>
                  </FloatLabel>
                  
              </div>
              <div class="w-3/4 mx-auto mt-10 mb-5 flex justify-center">
                  <Button v-if="!isSubmitting" severity="info" class="font-bold w-3/4" type="submit"> S U B M I T</Button>
                  <Button  v-else severity="secondary" class="font-bold w-3/4"> <i class="pi pi-spin pi-spinner-dotted"></i> </Button>
              </div>
              <!-- <p class="font-thin text-center">Already have an account? <span class="font-bold text-blue-500 cursor-pointer hover:underline" @click="router.push('/auth/login')">Login</span></p> -->
          </form>
    </div>
</template>

