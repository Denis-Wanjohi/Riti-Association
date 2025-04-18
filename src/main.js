
import './style.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import App from './App.vue'
import router from './router'
import 'primeicons/primeicons.css'
import Aura from '@primeuix/themes/aura';
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue,{
    theme: {
        preset: Aura,
        options:{
            darkModeSelector:''
        }
    }
})
app.use(ToastService)
app.use(ConfirmationService)
app.mount('#app')
