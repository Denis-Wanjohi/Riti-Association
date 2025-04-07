<script setup>
import { Accordion, AccordionPanel, AccordionHeader, AccordionContent } from 'primevue';
const services = [
  {
    "service": "Side Hustle Opportunities",
    "description": "We provide access to diverse side-hustle opportunities, enabling members to generate income while pursuing long-term career goals.",
    "value": 0,
  },
  {
    "service": "Internships and Attachments",
    "description": "Facilitating internship and attachment placements, offering practical experience and professional development for students and recent graduates.",
    "value": 1,
  },
  {
    "service": "Business Venture Financing",
    "description": "Supporting entrepreneurial ventures by providing guidance and access to funding resources for viable business plans.",
    "value": 2,
  },
  {
    "service": "Skill Development and Training",
    "description": "Delivering comprehensive training programs to equip members with the essential skills and knowledge required for career advancement and entrepreneurial success.",
    "value": 3,
  },
  {
    "service": "Employment Placement",
    "description": "Connecting members with a network of employers across diverse industries, facilitating successful job placements through strategic partnerships.",
    "value": 4,
  },
  {
    "service": "Rehabilitation and Counseling Services",
    "description": "We offer confidential rehabilitation and counseling services through the St. Nicholas Rehabilitation Center, supporting members' overall well-being.",
    "value": 5,
  }
]
</script>
<template>
  <div class="my-20">
    <div class="text-center">
      <div class="text-center px-5 poiret-one-regular font-bold  py-2 rounded-xl bg-blue-300 my-10 w-fit mx-auto">OUR
        SERVICES</div>
      <p class="sm:text-5xl text-3xl my-4 cinzel">Enabling Your Career and Business Goals</p>
      <p class="my-2 font-thin">Explore our diverse offerings designed to empower you with the skills, opportunities,
        and support you need</p>
    </div>
    <div class="sm:block hidden">
      <div class="grid sm:grid-cols-3  md:grid-cols-2 grid-cols-1 gap-10 m-10  ">
        <div v-for="{ service, description } in services" class="border-slate-500 cursor-pointer border rounded-xl p-10">
          <!-- {{ values }} -->
          <p>
            <!-- <i :class="`${icon}`" style="font-size: 25px;"></i> -->
          </p>
          <h2 class="font-bold text-2xl gabriela-regular-service">{{ service }}</h2>
          <p class="text-slate-900 mt-3">{{ description }}</p>
        </div>
      </div>
    </div>

    <div class="card  sm:hidden block">
      <Accordion value="0">
        <AccordionPanel v-for="service in services" :key="service.service" :value="service.value">
          <AccordionHeader>{{ service.service }}</AccordionHeader>
          <AccordionContent>
            <p class="m-0">{{ service.description }}</p>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </div>


  </div>
</template>

<style>
.gabriela-regular-service {
  font-family: "Gabriela", serif;
  font-weight: 400;
  font-style: normal;
}
</style>