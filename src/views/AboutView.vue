<script setup>
import Heading from '@/components/Heading.vue';
import Statistics from '@/components/Statistics.vue';
import CTASection from '@/components/CTASection.vue';
const coreValues = [
  {
    icon: 'pi pi-star',
    label: 'Empowerment',
    description: 'Guiding, training, and empowering individuals to take control of their lives and careers.'
  },
  {
    icon: 'pi pi-lightbulb',
    label: 'Entrepreneurship',
    description: 'Championing business ownership as a viable and rewarding career path, providing comprehensive support for business ventures.'
  },
  {
    icon: 'pi  pi-bullseye',
    label: 'Opportunity',
    description: 'Providing access to diverse employment options, side-hustle opportunities, and entrepreneurial ventures.'
  },
  {
    icon: 'pi pi-users',
    label: 'Support',
    description: 'Offering comprehensive training, financial assistance, and readily available business ventures to ensure member success.'
  },
  {
    icon: 'pi pi-chart-line',
    label: 'Transformation',
    description: 'Committing to transforming the lives of Kenyan youth and fostering sustainable community development.'
  }
]
</script>
<template>
  <div class="about">
    <heading class="my-10" heading="RITI Association of Unemployed Professionals" desc="WHO ARE WE"></heading>
    <div class="sm:flex sm:flex-row-reverse sm:h-[70vh]">
      <div class="sm:w-7/12 flex justify-center items-center">
        <img src="/images/garden.png" class="sm:w-3/4 w-10/12" alt="">
      </div>
      <div class="sm:w-5/12 flex items-center">
        <div>
          <p class="text-xl my-4  text-center sm:w-3/4 w-10/12 mx-auto">We are an organisation that unites unemployed professionals
            and guide them towards both employement opportunities and entrepreneurial ventures.</p>
          <p class="text-xl my-4 text-center w-3/4 mx-auto">We are focused on empowering youths by providong training
            and guidance,financial support and facilitate access to side hustles</p>
        </div>
      </div>

    </div>
  </div>
  <!-- MISSION -->
  <div>
    <heading class="my-16" sub-heading="OUR MISSION" heading="Transforming Lives Through Opportunity"></heading>
    <div class="flex">
      <div class="grid sm:grid-cols-3 md:grid-cols-2 grid-cols-1 sm:gap-x-20 gap-y-10 sm:mx-10 mx-4 mb-10">
        <div class="flex">
          <i class="pi pi-chart-line bg-stone-200 h-fit p-3 rounded-full" style="font-size: 2rem;"></i>
          <p class="px-2 text-stone-900"><span class="font-bold text-xl text-black">Transform lives:</span> Guide,
            train, and empower Kenyan youth to take charge of their lives and achieve financial success.</p>
        </div>
        <div class="flex">
          <i class="pi pi-lightbulb bg-stone-200 h-fit p-3 rounded-full" style="font-size: 2rem;"></i>
          <p class="px-2 text-stone-900"><span class="font-bold text-xl text-black">Introduce alternatives:</span> Show
            unemployed professionals that business ownership is a viable alternative to traditional employment.</p>
        </div>
        <div class="flex">
          <i class="pi pi-users bg-stone-200 h-fit p-3 rounded-full" style="font-size: 2rem;"></i>
          <p class="px-2 text-stone-900"><span class="font-bold text-xl text-black">Connect talent:</span> Link
            unemployed professionals with potential employers across various industries.</p>
        </div>
      </div>
    </div>
  </div>

  <!-- VISION -->
  <div class="h-fit">
    <heading sub-heading="OUR VISION" heading="A Thriving Nation Led by Empowered Youth"></heading>
    <div class="sm:flex">
      <div class="flex items-center">
        <p class="text-center  mx-auto sm:w-3/4 sm:p-0 px-5 ">We envision creating a thriving community of empowered and
          financially independent Kenyan professionals and entrepreneurs.
          Our goal is to foster a Kenya where youth are successfully employed or are flourishing business owners,
          contributing to economic growth and stability.</p>
      </div>
      <img src="/images/hero.png" class="sm:w-5/12" alt="">
    </div>
  </div>

  <!-- VALUES -->
  <div>
    <heading sub-heading="OUR CORE VALUES" heading="THE PRINCIPLES THAT GUIDE US"
      desc="These values form the foundation of our approach to empowering youths"></heading>
    <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-10 m-10 ">
      <div v-for="{ icon, label, description } in coreValues" class="border-slate-500 border rounded-xl p-10">
        {{ values }}
        <p>
          <i :class="`${icon}`" style="font-size: 25px;"></i>
        </p>
        <h2 class="font-bold text-2xl">{{ label }}</h2>
        <p class="text-slate-900 mt-3">{{ description }}</p>
      </div>
    </div>
  </div>

  <statistics></statistics>
  <c-t-a-section></c-t-a-section>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;

  }
}
</style>
