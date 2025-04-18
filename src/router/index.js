import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useApplicantStore } from '@/stores/applicant'
import { useUserStore } from '@/stores/user'
import { scrollUp } from '@/utilities/util'


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
      path:'/projects',
      name:'projects',
      component: ()=> import('../views/ProjectsView.vue')
    },
    {
      path:'/contacts',
      name:'contacts',
      component:()=>import('../views/ContactView.vue')
    },
    {
      path:'/auth/register',
      name:'applicant-registration',
      component:  ()=> import('../views/Auth/RegisterView.vue')
    },
    {
      path:'/register/employer',
      name:'employer-registration',
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
      path:'/professions',
      name:'professions',
      component: ()=> import('@/views/ApplicantsView.vue')
    },
    {
      path:'/dashboard/admin',
      name:'dashboard-admin',
      component:()=> import('../views/Portal/DashBoard/Admin/DashboardView.vue')
    },
    {
      path:'/dashboard/professions',
      name:'admin-professions',
      component:()=>import('@/views/Portal/DashBoard/Admin/ApplicantsView.vue')
    },
    {
      path:'/dashboard/employers',
      name:'admin-employers',
      component:()=>import('@/views/Portal/DashBoard/Admin/EmployersView.vue')
    },
    {
      path:'/dashboard/profession/:category',
      name:'admin-category',
      component:()=>import('@/views/Portal/DashBoard/Admin/CategoryView.vue')
    },
    {
      path:'/dashboard/admins',
      name:'admin-admins',
      component:()=>import('@/views/Portal/DashBoard/Admin/AdminsView.vue')
    },
    {
      path:'/dashboard/employer',
      name:'dashboard-employer',
      component:()=> import('../views/Portal/DashBoard/Employer/DashboardView.vue')
    },
    {
      path:'/dashboard/professions',
      name:'employer-professions',
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


const applicantPaths= [
  'portal-dashboard',
  'change-password',
  'work experience details',
  'education details',
  'personal details',
]
const adminPaths = [
  'dashboard-admin',
  'dashboard-categories',
  'admin-employers',
  'admin-professions',
  'admin-category',
  'admin-admins'
]
const employerPath = [
  'dashboard-employer',
  'employer-professions',
  'category-item',
]
const publicPaths = [
  'category-item',
  'home',
  'about-us',
  'applicant-registration',
  'employer-registration',
  'login',
  'aplicants',
  'confirmation',
  'verify',
  'admin-login',
  'professions',
  'projects',
  'contacts',
  //check well
  'employer-change-password',
  

]

router.beforeEach((to,from,next)=>{
  scrollUp()
  let user;
  if(sessionStorage.getItem('admin')){
    useUserStore().setLoggedIn(true)
    user = "admin"
  }else if(sessionStorage.getItem('employer')){
    useUserStore().setLoggedIn(true)
    user = "employer"
  }else if(sessionStorage.getItem('applicant')){
    useUserStore().setLoggedIn(true)
    user = "applicant"
  }

  const authRequired = !publicPaths.includes(to.name);
  let isAuthenticated = false
  const token = sessionStorage.getItem('token')
  if(token != null){
    isAuthenticated = true
  }

  if(isAuthenticated){
    if(user == 'admin'){
      if(!adminPaths.includes(to.name)){
        return next('/dashboard/admin')
      }else{
        return next()
      }
    }else if(user == 'applicant'){
      if(!applicantPaths.includes(to.name)){
        return next('/portal/dashboard')
      }else{
        return next()
      }
    }else if(user == 'employer'){
      if(!employerPath.includes(to.name)){
        return next('/dashboard/employer')
      }else{
        return next()
      }
    }
  }else{
    if(authRequired){
      next('/auth/login')
    }
    next()
    
  
  }
  if(sessionStorage.getItem('applicant')){
    useApplicantStore().setUser(JSON.stringify(sessionStorage.getItem('applicant')))
  }
})



export default router
