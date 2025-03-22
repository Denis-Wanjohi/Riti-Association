import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useApplicantStore } from '@/stores/applicant'


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
      name:'registration',
      component:  ()=> import('../views/Auth/RegisterView.vue')
    },
    {
      path:'/register/employer',
      name:'employer registration',
      component:  ()=> import('../views/Auth/EmployerRegistration.vue')
    },
    {
      path:'/auth/login',
      name:'login',
      component: ()=> import('../views/Auth/LoginView.vue')
    },
    {
      path:'/auth/change-password',
      name:'change-password',
      component: ()=> import('../views/Auth/ChangePassword.vue')
    },
    {
      path:'/employer/change-password',
      name:'employer-change-password',
      component: ()=> import('../views/Auth/ChangePasswordEmployer.vue')
    },
    {
      path:'/auth/verify',
      name:'verify',
      component: ()=> import('../views/Registration/VerifyEmail.vue')
    },
    {
      path:'/registration/confirmation',
      name:'confirmation',
      component: ()=> import('../views/Registration/ConfirmationEmail.vue')
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
    },
    {
      path:'/login/admin',
      name:'admin-login',
      component:()=>import('@/views/Auth/LoginAdminView.vue')
    },
    {
      path:'/portal/dashboard',
      name:'portal-dashboard',
      component: ()=> import ('../views/Portal/DashBoard/Dashboard.vue')
    },
    {
      path:'/portal/applicants',
      name:'employer:applicants',
      // component:()=> import('../views/Portal/Dashboard/Employer/ApplicantsView.vue')
    },
    {
      path:'/applicants',
      name:'applicants',
      component: ()=> import('@/views/ApplicantsView.vue')
    },
    {
      path:'/dashboard/admin',
      name:'dashboard-admin',
      component:()=> import('../views/Portal/DashBoard/Admin/DashboardView.vue')
    },
    {
      path:'/dashboard/employer',
      name:'dashboard-employer',
      component:()=> import('../views/Portal/DashBoard/Employer/ApplicantsView.vue')
    },
    // temporary
    {
      path:'/category',
      name:'category',
      component:()=>import('@/views/Portal/DashBoard/Employer/CategoryView.vue')
    },
    {
      path:'/dashboard/category/:category',
      name:'category-item',
      component:()=>import('@/views/Portal/DashBoard/Employer/CategoryView.vue')
    }
  ],
})

router.beforeEach(()=>{
  if(sessionStorage.getItem('applicant')){
    useApplicantStore().setUser(JSON.stringify(sessionStorage.getItem('applicant')))
  }
})

export default router
