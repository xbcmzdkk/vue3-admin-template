import {createRouter,createWebHashHistory} from 'vue-router'
import {constantRoutes} from './routes'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {getToken} from '@/utils/token'
import {useUserStore} from '@/store/user'
import pinia from '@/store'
import setting from '@/setting'

const userStore = useUserStore(pinia)

const router = createRouter({
    history:createWebHashHistory(),
    routes:constantRoutes,
    scrollBehavior(){
        return {top:0}
    }
})
NProgress.configure({ showSpinner: false });
router.beforeEach(async(to,from ,next) => {
    document.title = `${setting.name} - ${to.meta.title}`
    NProgress.start()
    const token = getToken()
    const username = userStore.userInfo.name
    if(token){
        if(to.path == '/login'){
            next({path:'/'})
        }else if(username){
            next()
        }else{
            try {
                await userStore.getUserInfo()
                    next({...to,replace:true})
            } catch (error) {
                userStore.removeUserInfo().then(() => {
                    next({path:'/login',query:{redirect:to.path}})
                })
            }
            // userStore.getUserInfo().then(() => {
            //     next({...to})
            // }).catch(() => {
            //     userStore.removeUserInfo().then(() => {
            //         next({path:'/login',query:{redirect:to.path}})
            //     }).catch(() => {

            //     })
                
            // })
        }
    }else{
        if(to.path == '/login'){
            next()
        }else{
            next({path:'login'})
        }
    }
    
})
router.afterEach(() =>{
    NProgress.done()
})
export default router