<template>
    <div class="setting">
        <el-button size="small" circle icon="Refresh" @click="refresh" />
        <el-button size="small" circle icon="FullScreen" @click="fullScreen" />
        <el-button size="small" circle icon="Setting" @click="setting" />
        <img :src="userStore.userInfo.avatar" alt="" class="avatar">
        <el-dropdown>
            <span class="el-dropdown-link">
                {{ userStore.userInfo.name }}
                <el-icon class="el-icon--right">
                    <arrow-down />
                </el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <el-drawer v-model="drawerState">
            <template #header>
                <h4>主题设置</h4>
            </template>
            <template #default>
                <el-form>
                    <el-form-item label="主题颜色">
                        <el-color-picker v-model="color" show-alpha @change="setTheme" />
                    </el-form-item>
                    <el-form-item label="暗黑模式">
                        <el-switch @change="setDark" v-model="dark" style="--el-switch-on-color: #000;"/>
                    </el-form-item>
                </el-form>
                
            </template>
        </el-drawer>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSettingStore } from '@/store/setting'
import { useUserStore } from '@/store/user'
const settingStore = useSettingStore()
const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
let drawerState = ref(false)
let dark = ref(false)
const color = ref('#409EFF')
// 刷新
const refresh = () => {
    settingStore.setRefreshState()
}
// 全屏
const fullScreen = () => {
    if (document.fullscreenElement) {
        document.exitFullscreen()
    } else {
        document.documentElement.requestFullscreen()
    }
}
// 退出登录
const logout = () => {
    userStore.removeUserInfo().then(() => {
        router.push({
            path: '/login',
            query: {
                redirect: route.path
            }
        })
    })

}

const setting = () => {
    drawerState.value = true
}

const setDark = () => {
    const el = document.documentElement
    dark.value?el.className='dark':el.className=''
}

const setTheme = () => {
    const el = document.documentElement
    el.style.setProperty('--el-color-primary', color.value)
}
</script>

<style lang="scss" scoped>
.setting {
    display: flex;
    align-items: center;

    .avatar {
        border-radius: 50%;
        width: 24px;
        height: 24px;
        margin-left: 10px;
    }

    .el-dropdown {
        margin: 0 10px;
        cursor: pointer;

        .el-icon {
            vertical-align: top;
        }
    }
}
</style>