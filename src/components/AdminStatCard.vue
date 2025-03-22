<script setup>
const {title,stat,icon} = defineProps({title:String,stat:String,icon:String})
</script>
<template>
    <div class="border rounded-xl shadow-lg flex items-center w-1/2 bg-slate-300 mx-auto py-7 border-slate-500 cursor-pointer hover:border-slate-800 hover:shadow-slate-400">
        <div class="w-3/4">
            <p class="cinzel text-center">{{title}} </p>
            <p class="text-center text-5xl font-bold" style="letter-spacing: 10px;">{{stat}}</p>
        </div>
        <p class="flex items-center w-1/4"><i :class="icon" style="font-size: 40px;"></i></p>
    </div>
</template>