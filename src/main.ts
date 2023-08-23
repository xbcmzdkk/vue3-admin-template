import { createApp } from 'vue'

import ElementPlus from 'element-plus'

import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import 'virtual:svg-icons-register'

import globalComponent from '@/components'

import '@/styles/index.scss'

import App from '@/App.vue'

import router from '@/router'

import pinia from '@/store'

import {hasbtn} from '@/directive/btn'

const app = createApp(App)

hasbtn(app)

app.use(globalComponent)
app.use(ElementPlus)
app.use(router)
app.use(pinia)

app.mount('#app')
