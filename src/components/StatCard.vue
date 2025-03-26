<template>
    <div class="text-center  m-3  sm:m-0">
      <p><i :class="`${icon}`" style="font-size: 2rem;"></i></p>
      <h2 class="font-extrabold sm:text-3xl text-xl">{{ figure }}</h2>
      <p class="sm:text-xl text-md">{{ tag }}</p>
    </div>
</template>
<script setup>
const {icon,figure,tag} = defineProps({icon:String,figure:String,tag:String})
</script>