import { Toast } from "primevue";
import { useToast } from "primevue";
// const toast = useToast()
export const scrollUp = () => {
    window.scrollTo(0, 0);
};

export const formLink = (value)=>{
    return value.replace(' ','-').toLowerCase()
}

export const fromLink = (value)=>{
    return value.replace('-',' ')
}

export const dmy = (value)=>{
    let day = new Date(value).getDate().toString().length == 1 ? "0"+new Date(value).getDate() : new Date(value).getDate()
    let month = (new Date(value).getMonth() + 1).toString().length == 1 ? "0"+(new Date(value).getMonth() + 1):new Date(value).getMonth() + 1
    let year = new Date(value).getFullYear()

    return day+"-"+month+"-"+year;
}
// export const authError = (value)=>{
//     if(value.status == 401){
//         useToast().add({severity:'error',summary:'Authentication error',detail:'Credetials provided dont match our records.',life:5000})
//     }
// }