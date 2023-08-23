import {defineStore} from 'pinia'
import {reactive} from 'vue'
import {constantRoutes} from '@/router/routes'
import {RouteRecordRaw} from 'vue-router'

export const useRouterMenuStore = defineStore('routerMenu',() => {
    const routetMenu:RouteRecordRaw[] = reactive(constantRoutes)

    return {
        routetMenu
    }
})