<template>
    <div class="text-center">
      <p><i :class="`${icon}`" style="font-size: 2rem;"></i></p>
      <h2 class="font-extrabold text-3xl">{{ figure }}</h2>
      <p class="text-xl">{{ tag }}</p>
    </div>
</template>
<script setup>
const {icon,figure,tag} = defineProps({icon:String,figure:String,tag:String})
</script>