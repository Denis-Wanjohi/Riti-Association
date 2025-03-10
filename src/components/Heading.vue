<template>
    <div class="text-center">
        <div v-if="subHeading" class="text-center px-5 poiret-one-regular font-bold  py-2 rounded-xl bg-blue-300 my-10 w-fit mx-auto">{{ props.subHeading }}</div>
        <p class="text-5xl my-4 cinzel">{{props.heading}}</p>
        <p class="my-2 font-thin">{{ props.desc }}</p>
    </div>
</template>

<script setup>
const props = defineProps({subHeading:String,heading:String,desc:String})
</script>