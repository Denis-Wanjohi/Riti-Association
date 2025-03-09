<script setup>
import IconBriefCase from './icons/IconBriefCase.vue';
import IconCheckmark from './icons/IconCheckmark.vue';
import IconRocket from './icons/IconRocket.vue';
const values = [
    {
        icon:IconBriefCase,
        title:'Job Opportunities',
        descriptions:'Trusted in bringing employers right to you'
    },
    {
        icon:IconRocket,
        title:'Build Your Business Future',
        descriptions:'We connect professionals with the resources and opportunities to succeed in the business world'
    },
    {
        icon:IconCheckmark,
        title:'Empower Your Job Search',
        descriptions:'Discover flexible side hustles to supplement your income and build your skills'
    }
]
</script>


<template>
    <div>
      <div class="flex  py-10">
        <div v-for="{title,descriptions,icon} in values" class="shadow shadow-lg rounded-md p-5 mx-3 w-full">
            <component :is="icon"  class="mx-auto w-3/4 h-20 my-5 "/>
          <p class="text-xl my-3 font-bold text-center">{{title}}</p>
          <p class="w-4/5 mx-auto text-center">{{ descriptions }}</p>
        </div>
      </div>
    </div>
</template>