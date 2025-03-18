<script setup>
const {h4} = defineProps({h4:String})
</script>
<template>
    <div class="border rounded-xl  h-fit" >
        <p class="text-center cinzel_dashboard cinzel_dashboard_h3 text-2xl shadow bg-slate-100 rounded-t-xl  h-fill">{{ h4 }}</p>
        <div class="overflow-auto h-fit pb-10 bg-slate-300/10">
            <slot></slot>
        </div>
    </div>
</template>
<style>
.cinzel_dashboard {
  font-family: "Cinzel", serif;
  font-optical-sizing: auto;
  font-weight: 600;
  font-style: normal;
}
.cinzel_dashboard_h3 {
  font-family: "Cinzel", monospace;
  font-optical-sizing: auto;
  font-weight: 600;
  font-style: small;
  font-size: medium;
}

</style>