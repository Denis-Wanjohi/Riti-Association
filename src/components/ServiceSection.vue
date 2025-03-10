<script setup>
const services = [
  {
    "service": "Side Hustle Opportunities",
    "description": "We provide access to diverse side-hustle opportunities, enabling members to generate income while pursuing long-term career goals."
  },
  {
    "service": "Internships and Attachments",
    "description": "Facilitating internship and attachment placements, offering practical experience and professional development for students and recent graduates."
  },
  {
    "service": "Business Venture Financing",
    "description": "Supporting entrepreneurial ventures by providing guidance and access to funding resources for viable business plans."
  },
  {
    "service": "Skill Development and Training",
    "description": "Delivering comprehensive training programs to equip members with the essential skills and knowledge required for career advancement and entrepreneurial success."
  },
  {
    "service": "Employment Placement",
    "description": "Connecting members with a network of employers across diverse industries, facilitating successful job placements through strategic partnerships."
  },
  {
    "service": "Rehabilitation and Counseling Services",
    "description": "We offer confidential rehabilitation and counseling services through the St. Nicholas Rehabilitation Center, supporting members' overall well-being."
  }
]
</script>
<template>
    <div class="my-20">
        <div class="text-center">
            <div class="text-center px-5 poiret-one-regular font-bold  py-2 rounded-xl bg-blue-300 my-10 w-fit mx-auto">OUR SERVICES</div>
            <p class="text-5xl my-4 cinzel">Enabling Your Career and Business Goals</p>
            <p class="my-2 font-thin">Explore our diverse offerings designed to empower you with the skills, opportunities, and support you need</p>
        </div>
  
        <!-- <div class="grid grid-cols-3 gap-10 mt-10">
            <div class="relative w-3/4 h-[43vh] cursor-pointer  bg-blue-200  shadow-md hover:shadow-orange-400 m-4 mx-auto" v-for="{service,description} in services">
            <div class="absolute -top-5 left-0 w-1/2 h-5 bg-blue-300 rounded-tr-[10px] shadow-inner"></div>   

            <div class="w-full h-full bg-blue-200 p-4">
                <div class="text-3xl hover:underline gabriela-regular-service  font-semibold mb-2">{{ service }}</div>
                <p class="text-lg  text-center text-gray-600">
                {{description}}
                </p>
            </div>
        </div>
        </div> -->

        <div class="grid grid-cols-3 gap-10 m-10 ">
          <div v-for="{service,description} in services" class="border-slate-500 cursor-pointer border rounded-xl p-10">
            <!-- {{ values }} -->
            <p>
              <!-- <i :class="`${icon}`" style="font-size: 25px;"></i> -->
            </p>
            <h2 class="font-bold text-2xl gabriela-regular-service">{{ service }}</h2>
            <p class="text-slate-900 mt-3">{{ description }}</p>
          </div>
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