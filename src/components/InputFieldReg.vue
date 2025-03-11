<script setup>
import { FloatLabel,InputText } from 'primevue';
const {forValue,modelValue,labelValue,typeValue} = defineProps({forValue:String,modelValue:String,labelValue:String,typeValue:String})
</script>
<template>
    <FloatLabel variant="on">
        <InputText :id=forValue :type=typeValue :v-model=modelValue  />
        <label :for=forValue>{{ labelValue }}</label>
    </FloatLabel>
</template>