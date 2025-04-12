<script setup>
import HeroSection from '@/components/HeroSection.vue';
import ValueSection from '@/components/ValueSection.vue';
import GuideSection from '@/components/GuideSection.vue';
import ServiceSection from '@/components/ServiceSection.vue';
import Statistics from '@/components/Statistics.vue';
import ProjectSection from '@/components/ProjectSection.vue';
import CTASection from '@/components/CTASection.vue';
</script>

<template>
  <main  class="cormorant">
    <hero-section></hero-section>
    <value-section></value-section>
    <guide-section></guide-section>
    <service-section></service-section>
    <statistics></statistics>
    <project-section></project-section>
    <c-t-a-section></c-t-a-section>
  </main>
</template>

<style>
.gabriela-regular {
  font-family: "Gabriela", serif;
  font-weight: 400;
  font-style: normal;
}
.cormorant> {
  font-family: "Cormorant", serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: italic;
}
</style>
