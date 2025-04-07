<script setup>
import Heading from '@/components/Heading.vue';
import LoadingButton from '@/components/loadingButton.vue';
import { ref } from 'vue';
import { FloatLabel, InputText, InputMask, Textarea, IftaLabel, Button, Toast, useToast } from 'primevue';
import axiosClient from '@/axios/axios';
const toast = useToast()
const isSubmitting = ref(false)
const contacts = [
    {
        label: 'PHONE',
        desc: '+254 740 544 047',
        icon: 'pi pi-phone'
    },
    {
        label: 'EMAIL',
        desc: '+254 740 544 047',
        icon: 'pi pi-envelope'
    },
    {
        label: 'ADDRESS',
        desc: 'Meru-Milimani, off Alba Street, Opposite Alba Hotel, Meru County',
        icon: 'pi pi-map-marker'
    },
]
const message = ref({
    name: '',
    email: '',
    phone: '',
    message: '',
})
function onSubmit() {
    isSubmitting.value = true
    axiosClient.post('/message', message.value)
        .then(res => {
            if (res.data.message == 'sent') {
                toast.add({ severity: 'success', summary: 'MESSAGE SUCCESSFULLY SENT', life: 5000 })
                message.value.name = ''
                message.value.email = ''
                message.value.phone = ''
                message.value.message = ''
            }
            isSubmitting.value = false
        })
        .catch(err => {
            console.error(err)
            toast.add({ severity: 'error', detail: 'Please re-submit the form', summary: 'FORM ERROR', life: 5000 })
            isSubmitting.value = false
        })
}
</script>
<template>

    <Toast></Toast>
    <div>
        <heading heading="OUR CONTACTS" desc="Here is how you can reach out to us"></heading>

        <div class="flex justify-around mt-10 px-10">
            <div v-for="contact in contacts" class="border rounded-xl w-full m-5 border-gray-400 text-center p-10">
                <p class="text-center"> <i :class="contact.icon" style="font-size: 60px;"></i></p>
                <p class="text-xl font-bold mt-5 cinzel" style="font-weight: bold;">{{ contact.label }}</p>
                <p class="text-xl font-bold mt-10">{{ contact.desc }}</p>
            </div>
        </div>
        <div class="mb-10">
            <heading heading="Have Any Question?"
                desc="Please fill with correct information, we will reach out as soon as possible"></heading>
            <form @submit.prevent="onSubmit" class="sm:w-4/12 mx-auto">

                <FloatLabel variant="on" style="margin: auto;">
                    <InputText id="fullNames" required class=" w-full my-5" v-model="message.name" type="text" />
                    <label for="fullNames">Full Names</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <InputText id="email" required class="w-full mb-5" v-model="message.email" type="email" />
                    <label for="email">Email</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <InputMask id="ssn" v-model="message.phone" mask="+2549-9999-9999" required class="w-full mb-5" />
                    <label for="phone">Phone Number</label>
                </FloatLabel>
                <IftaLabel>
                    <Textarea id="description" v-model="message.message" rows="5" class="w-full" cols="30"
                        style="resize: none" />
                    <label for="description">Description</label>
                </IftaLabel>
                <div class="flex justify-center">
                    <Button type='submit' v-if="!isSubmitting">S U B M I T</Button>
                    <loading-button v-else></loading-button>
                </div>

            </form>
        </div>
    </div>
</template>