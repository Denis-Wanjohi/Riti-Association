import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '@/views/Auth/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about-us',
      name: 'about-us',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path:'/auth/register',
      name:'/registration',
      component: RegisterView
    },
    {
      path:'/verify',
      name:'verify',
      component: ()=> import('../views/Registration/VerifyEmail.vue')
    },
    {
      path:'/registration/personal-details',
      name:'personal details',
      component: ()=> import('../views/Portal/Registration/PersonalDetails.vue')
    },
    {
      path:'/registration/education-details',
      name:'education details',
      component: ()=> import('../views/Portal/Registration/EducationDetails.vue')
    },
    {
      path:'/registration/work-experience-details',
      name:'work experience details',
      component: ()=> import('../views/Portal/Registration/WorkExperienceDetails.vue')
    }
  ],
})

export default router
