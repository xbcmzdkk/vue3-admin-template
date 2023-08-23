import pinia from "@/store"
import {useUserStore} from '@/store/user'
const userStore = useUserStore(pinia)
export const hasbtn = (app:any) =>{
    app.directive('btn',{
        mounted(el:any,options:any){
            if(!userStore.userInfo.buttons.includes(options.value)){
                el.parentNode.removeChild(el)
            }
        }
    })
}