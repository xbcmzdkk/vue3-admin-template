import SvgIcon from './SvgIcon/index.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
                                                                    
import type { App, Component } from 'vue';

const globalComponent:{[name:string]:Component} = {SvgIcon}

export default {
    install(app:App){
        Object.keys(globalComponent).forEach((key:string) => {
            app.component(key,globalComponent[key])
        })
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
          }
    }
}