<template>
    <div class="layout">
        <div class="layout-left" >
            <Logo></Logo>
            <el-scrollbar >
                <el-menu background-color="#001529" text-color="#fff" unique-opened router :default-active="route.path"
                :collapse="settingStore.foldState">
                <Menu :menus="userStore.routes"></Menu>
            </el-menu>
            </el-scrollbar>
        </div>
        <div class="layout-top" :class="settingStore.foldState ? 'fold-top' : ''">
            <BreadCrumb />
            <Setting />
        </div>
        <div class="layout-content" :class="settingStore.foldState ? 'fold-content' : ''">
            <Content></Content>
        </div>

    </div>
</template>

<script setup lang='ts'>
import { useRoute } from 'vue-router'
import Logo from '@/views/layout/logo/index.vue'
import Menu from '@/views/layout/menu/index.vue'
import Content from '@/views/layout/content/index.vue'
import BreadCrumb from '@/views/layout/breadcrumb/index.vue'
import Setting from '@/views/layout/setting/index.vue'
import { useUserStore } from '@/store/user'
import { useSettingStore } from '@/store/setting'
const userStore = useUserStore()
const settingStore = useSettingStore()
const route = useRoute()
</script>

<style lang="scss" scoped>
.layout {
    width: 100%;
    height: 100vh;

    &-left {
        width: $layout-left-width;
        height: 100%;
        background-color: $layout-left-bgcolor;
        // transition: all 0.3s;
        .el-menu {
            border-right: none;
        }
        .el-scrollbar{
            width: 100%;
            height: calc(100% - $logo-height);
        }
    }

    &-top {
        position: absolute;
        top: 0;
        left: $layout-left-width;
        width: calc(100% - $layout-left-width);
        height: $layout-top-height;
        transition: all .3s;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #c2c1c1;
    }

    &-content {
        position: absolute;
        top: $layout-top-height;
        left: $layout-left-width;
        width: calc(100% - $layout-left-width);
        height: calc(100% - $layout-top-height);
        padding: 20px;
        overflow: auto;
        transition: all .3s;


    }
    & .fold-top,.fold-content{
        left: $layout-left-fold-width;
        width: calc(100% - $layout-left-fold-width);
    }
}
</style>