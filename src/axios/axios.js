import EmployerRegistration from "@/views/Auth/EmployerRegistration.vue";
import PersonalDetails from "@/views/Portal/Registration/PersonalDetails.vue";
import axios from "axios";
import { list } from "postcss";

const axiosClient = axios.create({
    baseURL:' https://d729-102-215-12-244.ngrok-free.app/api'
    // baseURL:'http://localhost:8000/api/'
})
axiosClient.interceptors.request.use(config =>{
    // config.headers.Authorization = `Bearer ${sessionStorage.getItem('token')}`
    config.headers.Authorization = `Bearer ${ sessionStorage.getItem('token')}`
    config.headers['Content-Type'] = 'application/json'
    config.headers['ngrok-skip-browser-warning'] = '69420'
    return config;
})

export default axiosClient;

   