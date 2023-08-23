import {ref} from 'vue'
import {defineStore} from 'pinia'
//@ts-ignore
import cloneDeep from 'lodash/cloneDeep'
import router from '@/router'
import {loginApi,getUserInfoApi,logoutApi} from '@/api/user'
import type {loginApiParams,getUserInfoRes,loginApiRes} from '@/api/user/type'
import {getToken,setToken,removeToken} from '@/utils/token'
import {constantRoutes,dynamicRoutes,anyRoutes} from '@/router/routes'
const filterRoute = (routes:any,comRoutes:any) => {
    return routes.filter((item:any) => {
        if(comRoutes.includes(item.name)){
            if(item.children && item.children.length > 0){
                item.children =  filterRoute(item.children,comRoutes)
            }
            return true
        }
       
    })
}

export const useUserStore = defineStore('user',() => {
    let token = ref(getToken())
    let userInfo:any = ref({})
    let routes:any = ref(constantRoutes)
    
    const removeUserInfo = async() =>{
        let result:any = await logoutApi()
        if(result.code == 200){
            token.value = ''
            userInfo.value = {}
            removeToken()
            return 'ok'
        }else{
            return Promise.reject(new Error(result.message))
        }
        
        
    }
    const login = async(data:loginApiParams) => {
       let result:loginApiRes = await loginApi(data)
        if(result.code === 200){
            token.value = result.data as string
            setToken(token.value)
            return 'ok'
        }else{
            return Promise.reject(Error(result.data))
        }
    }
    const getUserInfo = async() => {
        let result:getUserInfoRes = await getUserInfoApi()
        if(result.code == 200){
            userInfo.value = result.data
            const filterRoutes:any = filterRoute(cloneDeep(dynamicRoutes),result.data.routes)
            routes.value = [...constantRoutes,...filterRoutes,...anyRoutes]
            // [...anyRoutes,...filterRoutes].forEach((item:any) => {
            //     router.addRoute(item)
            // });
            let arr = [...constantRoutes,...filterRoutes,...anyRoutes]
            arr.forEach((item:any) => {
                router.addRoute(item)
            })
            return 'ok'
        }else{
            return Promise.reject(new Error(result.message))
        }
    }
    return {
        token,
        userInfo,
        routes,
        login,
        removeUserInfo,
        getUserInfo
    }
})