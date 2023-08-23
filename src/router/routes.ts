export const constantRoutes = [
    {
        path:'/',
        component:() => import('@/views/layout/index.vue'),
        name:'layout',
        redirect:'/home',
        meta:{
            title:'',
            icon:''
        },
        children:[
            {
                path:'/home',
                component:() => import('@/views/home/index.vue'),
                name:'home',
                meta:{
                    title:'首页',
                    icon:'HomeFilled'
                }
            }
        ]
    },
    {
        path:'/screen',
        component:() => import('@/views/screen/index.vue'),
        name:'screen',
        meta:{
            title:'数据大屏',
            icon:'Monitor'
        }
    },   
    {
        path:'/login',
        component:() => import('@/views/login/index.vue'),
        name:'login',
        meta:{
            hidden:true,
            title:'登录'
        }

    },
    {
        path:'/404',
        component:() => import('@/views/404/index.vue'),
        name:'404',
        meta:{
            hidden:true
        }
    }   
]
export const dynamicRoutes = [
    {
        path:'/acl',
        component:() => import('@/views/layout/index.vue'),
        name:'Acl',
        redirect:'/acl/user',
        meta:{
            title:'权限管理',
            icon:'Setting'
        },
        children:[
            {
                path:'/acl/user',
                component:() => import('@/views/acl/user/index.vue'),
                name:'User',
                meta:{
                    title:'用户管理',
                    icon:'User'
                }
            },
            {
                path:'/acl/role',
                component:() => import('@/views/acl/role/index.vue'),
                name:'Role',
                meta:{
                    title:'角色管理',
                    icon:'Avatar'
                }
            },
            {
                path:'/acl/permission',
                component:() => import('@/views/acl/permission/index.vue'),
                name:'Permission',
                meta:{
                    title:'菜单管理',
                    icon:'Grid'
                }
            },
             
        ]
    },
    {
        path:'/product',
        component:() => import('@/views/layout/index.vue'),
        name:'Product',
        redirect:'/product/spu',
        meta:{
            title:'商品管理',
            icon:'Goods'
        },
        children:[
            {
                path:'/product/spu',
                component:() => import('@/views/product/spu/index.vue'),
                name:'Spu',
                meta:{
                    title:'spu管理',
                    icon:'Notebook'
                }
            },
            {
                path:'/product/sku',
                component:() => import('@/views/product/sku/index.vue'),
                name:'Sku',
                meta:{
                    title:'sku管理',
                    icon:'Memo'
                }
            },
            {
                path:'/product/attr',
                component:() => import('@/views/product/attr/index.vue'),
                name:'Attr',
                meta:{
                    title:'属性管理',
                    icon:'DocumentCopy'
                }
            },
            {
                path:'/product/trademark',
                component:() => import('@/views/product/trademark/index.vue'),
                name:'Trademark',
                meta:{
                    title:'品牌管理',
                    icon:'Collection'
                }
            }
        ]
    },
]

export const anyRoutes = [
    {
        path:'/:pathMatch(.*)*',
        redirect:'/404',
        name:'any',
        meta:{
            hidden:true
        }
    }
]